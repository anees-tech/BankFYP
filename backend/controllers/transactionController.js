import User from "../models/User.js"
import Transaction from "../models/Transaction.js"

// Make a transaction (deposit, withdraw, or transfer)
export const makeTransaction = async (req, res, next) => {
  try {
    const { userId, type, amount, recipientAccountNumber, description } = req.body

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" })
    }

    // Find user
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Process transaction based on type
    let newBalance
    let recipientId = null
    let recipientNewBalance = null

    if (type === "deposit") {
      newBalance = user.balance + amount
    } else if (type === "withdraw") {
      // Check if user has sufficient balance
      if (user.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" })
      }
      newBalance = user.balance - amount
    } else if (type === "transfer") {
      // Check if recipient account number is provided
      if (!recipientAccountNumber) {
        return res.status(400).json({ message: "Recipient account number is required" })
      }

      // Check if user has sufficient balance
      if (user.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" })
      }

      // Find recipient by account number
      const recipient = await User.findOne({ accountNumber: recipientAccountNumber })

      if (!recipient) {
        return res.status(404).json({ message: "Recipient account not found" })
      }

      // Prevent transfer to self
      if (recipient._id.toString() === userId) {
        return res.status(400).json({ message: "Cannot transfer to your own account" })
      }

      // Update balances
      newBalance = user.balance - amount
      recipientNewBalance = recipient.balance + amount
      recipientId = recipient._id

      // Update recipient balance
      recipient.balance = recipientNewBalance
      await recipient.save()

      // Create recipient's transaction record (as deposit)
      const recipientTransaction = new Transaction({
        userId: recipientId,
        type: "deposit",
        amount,
        balanceAfter: recipientNewBalance,
        description: `Transfer from ${user.name} (${user.accountNumber})`,
      })

      await recipientTransaction.save()
    } else {
      return res.status(400).json({ message: "Invalid transaction type" })
    }

    // Update user balance
    user.balance = newBalance
    await user.save()

    // Create transaction record
    const transaction = new Transaction({
      userId,
      type,
      amount,
      balanceAfter: newBalance,
      recipientId,
      recipientAccountNumber,
      description: description || "",
    })

    await transaction.save()

    res.status(201).json({
      message: "Transaction successful",
      transaction: {
        type,
        amount,
        balanceAfter: newBalance,
        date: transaction.date,
        recipientAccountNumber: recipientAccountNumber || null,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Get transactions by user ID
export const getTransactionsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId

    // Find transactions for the user
    const transactions = await Transaction.find({ userId })
      .sort({ date: -1 }) // Sort by date descending (newest first)
      .limit(50) // Limit to last 50 transactions

    res.status(200).json(transactions)
  } catch (error) {
    next(error)
  }
}

// Get all transactions (for admin)
export const getAllTransactions = async (req, res, next) => {
  try {
    // Optional query parameters for filtering
    const { userId, type, startDate, endDate, limit = 100 } = req.query

    // Build query object
    const query = {}

    if (userId) query.userId = userId
    if (type) query.type = type

    // Date range filter
    if (startDate || endDate) {
      query.date = {}
      if (startDate) query.date.$gte = new Date(startDate)
      if (endDate) query.date.$lte = new Date(endDate)
    }

    // Find transactions with populated user data
    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .limit(Number(limit))
      .populate("userId", "name username accountNumber")
      .populate("recipientId", "name username accountNumber")

    res.status(200).json(transactions)
  } catch (error) {
    next(error)
  }
}

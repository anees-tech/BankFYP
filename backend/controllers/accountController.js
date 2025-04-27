import User from "../models/User.js"

// Get account details by user ID
export const getAccountDetails = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId).select("accountNumber balance")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
      accountNumber: user.accountNumber,
      balance: user.balance,
    })
  } catch (error) {
    next(error)
  }
}

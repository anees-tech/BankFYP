import User from "../models/User.js"

// Generate a random account number
const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString()
}

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password")
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

// Create a new user
export const createUser = async (req, res, next) => {
  try {
    const {
      // Core
      name, username, email, password, role, initialBalance,
      // Step 1
      fatherName, dob, gender, maritalStatus, currentAddress, city, state, pinCode, mobileNumber,
      // Step 2
      cnic, religion, category, educationalQualification, sourceOfIncome, 
      companyName, monthlySalary, businessName, ntn,
      nomineeName, nomineeRelation, nomineeCNIC, bloodGroup, medicalConditions,
      // Step 3
      accountType, servicesRequired
    } = req.body

    // Check if username, email, or CNIC already exists
    const orConditions = [{ username }, { email }];
    if (cnic) {
      orConditions.push({ cnic });
    }
    const existingUser = await User.findOne({ $or: orConditions });

    if (existingUser) {
      let message = "User already exists.";
      if (existingUser.username === username) message = "Username already exists.";
      if (existingUser.email === email) message = "Email already exists.";
      if (cnic && existingUser.cnic === cnic) message = "CNIC already registered.";
      return res.status(400).json({ message });
    }

    // Generate a unique account number
    let accountNumber
    let isUnique = false

    while (!isUnique) {
      accountNumber = generateAccountNumber()
      const existingAccount = await User.findOne({ accountNumber })
      if (!existingAccount) {
        isUnique = true
      }
    }

    // Create new user
    const newUser = new User({
      // Core
      name, username, email, password, role, accountNumber,
      balance: initialBalance || 0,
      // Step 1
      fatherName, dob, gender, maritalStatus, currentAddress, city, state, pinCode, mobileNumber,
      // Step 2
      cnic, religion, category, educationalQualification, sourceOfIncome,
      companyName, monthlySalary, businessName, ntn,
      nomineeName, nomineeRelation, nomineeCNIC, bloodGroup, medicalConditions,
      // Step 3
      accountType, servicesRequired
    })

    const savedUser = await newUser.save()

    // Return user data without password
    const userData = {
      _id: savedUser._id,
      name: savedUser.name,
      username: savedUser.username,
      email: savedUser.email,
      role: savedUser.role,
      accountNumber: savedUser.accountNumber,
      balance: savedUser.balance,
    }

    res.status(201).json(userData)
  } catch (error) {
    next(error)
  }
}

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const {
      // Core
      name, username, email, password, role, initialBalance,
      // Step 1
      fatherName, dob, gender, maritalStatus, currentAddress, city, state, pinCode, mobileNumber,
      // Step 2
      cnic, religion, category, educationalQualification, sourceOfIncome,
      companyName, monthlySalary, businessName, ntn,
      nomineeName, nomineeRelation, nomineeCNIC, bloodGroup, medicalConditions,
      // Step 3
      accountType, servicesRequired
    } = req.body
    const userId = req.params.id

    // Check if username or email already exists for another user
    if (username || email) {
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
        _id: { $ne: userId },
      })

      if (existingUser) {
        return res.status(400).json({
          message: "Username or email already exists",
        })
      }
    }

    // Find user to update
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update user fields
    if (name) user.name = name
    if (username) user.username = username
    if (email) user.email = email
    if (password) user.password = password // In a real app, this would be hashed
    if (role) user.role = role
    if (initialBalance !== undefined) user.balance = initialBalance

    // Update new fields
    Object.assign(user, {
      fatherName, dob, gender, maritalStatus, currentAddress, city, state, pinCode, mobileNumber,
      cnic, religion, category, educationalQualification, sourceOfIncome,
      companyName, monthlySalary, businessName, ntn,
      nomineeName, nomineeRelation, nomineeCNIC, bloodGroup, medicalConditions,
      accountType, servicesRequired
    });


    const updatedUser = await user.save()

    // Return user data without password
    const userData = {
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      accountNumber: updatedUser.accountNumber,
      balance: updatedUser.balance,
    }

    res.status(200).json(userData)
  } catch (error) {
    next(error)
  }
}

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    next(error)
  }
}

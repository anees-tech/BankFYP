import User from "../models/User.js"

// Login user
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    // Find user by username
    const user = await User.findOne({ username })

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" })
    }

    // Return user data (excluding password)
    const userData = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    }

    res.status(200).json(userData)
  } catch (error) {
    next(error)
  }
}

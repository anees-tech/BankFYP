import express from "express"
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController.js"

const router = express.Router()

// Get all users
router.get("/", getAllUsers)

// Get user by ID
router.get("/:id", getUserById)

// Create a new user
router.post("/", createUser)

// Update user
router.put("/:id", updateUser)

// Delete user
router.delete("/:id", deleteUser)

export default router

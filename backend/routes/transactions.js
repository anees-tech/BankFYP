import express from "express"
import { makeTransaction, getTransactionsByUserId, getAllTransactions } from "../controllers/transactionController.js"

const router = express.Router()

// Make a transaction
router.post("/", makeTransaction)

// Get transactions by user ID
router.get("/user/:userId", getTransactionsByUserId)

// Get all transactions (admin only)
router.get("/", getAllTransactions)

export default router

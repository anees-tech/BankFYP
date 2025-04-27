import express from "express"
import { getAccountDetails } from "../controllers/accountController.js"

const router = express.Router()

// Get account details by user ID
router.get("/:userId", getAccountDetails)

export default router

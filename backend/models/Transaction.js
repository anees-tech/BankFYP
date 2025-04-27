import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "withdraw", "transfer"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    balanceAfter: {
      type: Number,
      required: true,
    },
    // Add recipient information for transfers
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recipientAccountNumber: {
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction

"use client"

import { useState } from "react"
import { makeTransaction } from "../services/accountService"
import "../styles/DepositWithdrawForm.css" // We'll create this CSS file

function DepositWithdrawForm({ userId, onTransactionSuccess }) {
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("deposit") // 'deposit' or 'withdraw'
  const [description, setDescription] = useState("")
  const [message, setMessage] = useState({ text: "", type: "" }) // type: 'success' or 'error'
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ text: "", type: "" })
    setLoading(true)

    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ text: "Please enter a valid amount.", type: "error" })
      setLoading(false)
      return
    }

    try {
      const transactionData = {
        userId,
        type,
        amount: parseFloat(amount),
        description,
      }
      const result = await makeTransaction(transactionData)
      setMessage({ text: result.message || "Transaction successful!", type: "success" })
      setAmount("")
      setDescription("")
      if (onTransactionSuccess) {
        onTransactionSuccess() // Callback to refresh dashboard data
      }
    } catch (error) {
      setMessage({ text: error.message || "Transaction failed.", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="deposit-withdraw-form">
      <h3>{type === "deposit" ? "Deposit Funds" : "Withdraw Funds"}</h3>
      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="transactionType">Transaction Type</label>
          <select id="transactionType" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            required
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="E.g., Savings, Groceries"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : type === "deposit" ? "Deposit" : "Withdraw"}
        </button>
      </form>
    </div>
  )
}

export default DepositWithdrawForm
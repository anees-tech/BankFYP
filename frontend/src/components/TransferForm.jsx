"use client"

import { useState } from "react"
import "../styles/TransferForm.css"
import { makeTransaction } from "../services/accountService" // Import makeTransaction

function TransferForm({ userId, onTransactionSuccess }) { // Add props
  const [formData, setFormData] = useState({
    recipientAccountNumber: "",
    amount: "",
    description: "",
  })
  const [message, setMessage] = useState({ text: "", type: "" }) // Clear initial message
  const [loading, setLoading] = useState(false) // Add loading state

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ text: "", type: "" })
    setLoading(true)

    if (!formData.recipientAccountNumber || !formData.amount || parseFloat(formData.amount) <= 0) {
      setMessage({ text: "Please fill in all required fields with valid values.", type: "error" })
      setLoading(false)
      return
    }

    try {
      const transactionData = {
        userId, // Pass the logged-in user's ID
        type: "transfer",
        amount: parseFloat(formData.amount),
        recipientAccountNumber: formData.recipientAccountNumber,
        description: formData.description,
      }
      const result = await makeTransaction(transactionData)
      setMessage({ text: result.message || "Transfer successful!", type: "success" })
      setFormData({ recipientAccountNumber: "", amount: "", description: "" }) // Reset form
      if (onTransactionSuccess) {
        onTransactionSuccess() // Callback to refresh dashboard data
      }
    } catch (error) {
      setMessage({ text: error.message || "Transfer failed.", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="transfer-form"> {/* Remove disabled-section if not needed globally */}
      <h3>Transfer Money</h3>

      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipientAccountNumber">Recipient Account Number</label>
          <input
            type="text"
            id="recipientAccountNumber"
            name="recipientAccountNumber"
            value={formData.recipientAccountNumber}
            onChange={handleChange}
            required
            placeholder="Enter recipient's account number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
            placeholder="Enter amount to transfer"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What's this transfer for?"
          />
        </div>

        <button type="submit" disabled={loading}> {/* Enable button, manage with loading state */}
          {loading ? "Processing..." : "Transfer Funds"}
        </button>
      </form>
    </div>
  )
}

export default TransferForm

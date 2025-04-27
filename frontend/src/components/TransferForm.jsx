"use client"

import { useState } from "react"
import "../styles/TransferForm.css"

function TransferForm({ userId, onTransferComplete }) {
  const [formData, setFormData] = useState({
    recipientAccountNumber: "",
    amount: "",
    description: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })

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

    try {
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          type: "transfer",
          amount: Number(formData.amount),
          recipientAccountNumber: formData.recipientAccountNumber,
          description: formData.description,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Transfer failed")
      }

      setMessage({
        text: "Transfer successful!",
        type: "success",
      })
      setFormData({
        recipientAccountNumber: "",
        amount: "",
        description: "",
      })

      if (onTransferComplete) {
        onTransferComplete()
      }
    } catch (error) {
      setMessage({
        text: error.message || "Transfer failed. Please try again.",
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="transfer-form">
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

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Transfer Funds"}
        </button>
      </form>
    </div>
  )
}

export default TransferForm

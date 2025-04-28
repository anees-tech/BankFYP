"use client"

import { useState } from "react"
import "../styles/TransferForm.css"

function TransferForm() {
  const [formData, setFormData] = useState({
    recipientAccountNumber: "",
    amount: "",
    description: "",
  })
  const [message, setMessage] = useState({ text: "Transfers are disabled in this demo.", type: "info" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Transfers are disabled in this demo.")
  }

  return (
    <div className="transfer-form disabled-section">
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
            disabled
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
            disabled
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
            disabled
          />
        </div>

        <button type="submit" disabled>
          Transfer Funds
        </button>
      </form>
    </div>
  )
}

export default TransferForm

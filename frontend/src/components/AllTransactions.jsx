"use client"

import { useState, useEffect } from "react"
import "../styles/AllTransactions.css"

function AllTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filters, setFilters] = useState({
    type: "",
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams()
      if (filters.type) queryParams.append("type", filters.type)
      if (filters.startDate) queryParams.append("startDate", filters.startDate)
      if (filters.endDate) queryParams.append("endDate", filters.endDate)

      const response = await fetch(`http://localhost:5000/api/transactions?${queryParams.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch transactions")
      }

      const data = await response.json()
      setTransactions(data)
    } catch (err) {
      setError(err.message || "Failed to load transactions")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFilterSubmit = (e) => {
    e.preventDefault()
    fetchTransactions()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const getTransactionDescription = (transaction) => {
    const { type, userId, recipientId, description } = transaction

    if (description) return description

    if (type === "deposit") return "Deposit"
    if (type === "withdraw") return "Withdrawal"

    if (type === "transfer") {
      const senderName = userId?.name || "Unknown"
      const recipientName = recipientId?.name || "Unknown"
      return `Transfer from ${senderName} to ${recipientName}`
    }

    return type
  }

  if (loading && transactions.length === 0) {
    return <div className="loading">Loading transactions...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  return (
    <div className="all-transactions">
      <h3>All Transactions</h3>

      <div className="transaction-filters">
        <form onSubmit={handleFilterSubmit}>
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="type">Type</label>
              <select id="type" name="type" value={filters.type} onChange={handleFilterChange}>
                <option value="">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="startDate">From Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="endDate">To Date</label>
              <input type="date" id="endDate" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
            </div>

            <button type="submit" className="filter-button">
              Apply Filters
            </button>
          </div>
        </form>
      </div>

      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions found.</p>
      ) : (
        <div className="transaction-list">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Account</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Balance After</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} className={transaction.type}>
                  <td>{formatDate(transaction.date)}</td>
                  <td>
                    {transaction.userId?.name || "Unknown"}
                    <span className="account-number">({transaction.userId?.accountNumber || "N/A"})</span>
                  </td>
                  <td className="transaction-type">{transaction.type}</td>
                  <td>{getTransactionDescription(transaction)}</td>
                  <td className="transaction-amount">
                    {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </td>
                  <td>${transaction.balanceAfter.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AllTransactions

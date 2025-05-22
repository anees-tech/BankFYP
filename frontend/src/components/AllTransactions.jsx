"use client"

import { useState, useEffect } from "react"
import "../styles/AllTransactions.css"
import { getAllTransactions } from "../services/transactionService"

function AllTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filters, setFilters] = useState({
    userId: "",
    type: "",
    startDate: "",
    endDate: "",
  })

  const [originalTransactions, setOriginalTransactions] = useState([])

  const fetchAllTransactions = async (currentFilters) => {
    setLoading(true)
    setError("")
    try {
      const data = await getAllTransactions(currentFilters)
      setOriginalTransactions(data)
      applyFilters(data, currentFilters)
    } catch (err) {
      setError(err.message || "Failed to fetch transactions.")
      setTransactions([])
      setOriginalTransactions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllTransactions(filters)
  }, [])

  const applyFilters = (dataToFilter, currentFilters) => {
    let filteredData = [...dataToFilter]

    if (currentFilters.type) {
      filteredData = filteredData.filter((txn) => txn.type === currentFilters.type)
    }
    if (currentFilters.startDate) {
      filteredData = filteredData.filter((txn) => new Date(txn.date) >= new Date(currentFilters.startDate))
    }
    if (currentFilters.endDate) {
      const endDate = new Date(currentFilters.endDate)
      endDate.setDate(endDate.getDate() + 1)
      filteredData = filteredData.filter((txn) => new Date(txn.date) < endDate)
    }

    setTransactions(filteredData.sort((a, b) => new Date(b.date) - new Date(a.date)))
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
    fetchAllTransactions(filters)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const getTransactionDescription = (transaction) => {
    const { type, description, recipientId, userId } = transaction
    if (description) return description
    if (type === "transfer") {
      if (transaction.userId && transaction.recipientId) {
        return `Transfer from ${transaction.userId.name || transaction.userId.username} to ${transaction.recipientId.name || transaction.recipientId.username}`
      }
      return "Transfer"
    }
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  if (loading) {
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
        <p className="no-transactions">No transactions found for the selected filters.</p>
      ) : (
        <div className="transaction-list">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Account Holder</th>
                <th>Account Number</th>
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
                  <td>{transaction.userId?.name || transaction.userId?.username || "N/A"}</td>
                  <td>{transaction.userId?.accountNumber || "N/A"}</td>
                  <td className="transaction-type">{transaction.type}</td>
                  <td>{getTransactionDescription(transaction)}</td>
                  <td className="transaction-amount">
                    ${transaction.amount.toFixed(2)}
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

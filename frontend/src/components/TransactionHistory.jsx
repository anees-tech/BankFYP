"use client"

import { useState, useEffect } from "react"
import "../styles/TransactionHistory.css"
import { getTransactions } from "../services/transactionService"

function TransactionHistory({ userId }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchTransactions()
  }, [userId])

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const transactionsData = await getTransactions(userId)
      setTransactions(transactionsData)
    } catch (err) {
      setError("Failed to load transaction history")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  if (loading && transactions.length === 0) {
    return <div className="loading">Loading transaction history...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  if (transactions.length === 0) {
    return (
      <div className="transaction-history">
        <h3>Transaction History</h3>
        <p className="no-transactions">No transactions found.</p>
      </div>
    )
  }

  return (
    <div className="transaction-history">
      <h3>Transaction History</h3>
      <div className="transaction-list">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id} className={transaction.type}>
                <td>{formatDate(transaction.date)}</td>
                <td className="transaction-type">{transaction.type}</td>
                <td className="transaction-amount">
                  {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </td>
                <td>${transaction.balanceAfter.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionHistory

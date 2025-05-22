"use client"

import { useState, useEffect } from "react" // Import useEffect
import "../styles/TransactionHistory.css"
import { getTransactionsByUserId } from "../services/accountService" // Import service

function TransactionHistory({ userId, refreshTrigger }) { // Add userId prop and refreshTrigger
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const fetchTransactions = async () => {
      setLoading(true)
      setError("")
      try {
        const data = await getTransactionsByUserId(userId)
        setTransactions(data.sort((a, b) => new Date(b.date) - new Date(a.date))) // Sort by date descending
      } catch (err) {
        setError(err.message || "Failed to fetch transactions.")
        setTransactions([]) // Clear transactions on error
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [userId, refreshTrigger]) // Add refreshTrigger to dependency array

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const getTransactionDescription = (transaction) => {
    const { type, description, recipientAccountNumber, recipientId } = transaction;
    if (description) return description;
    if (type === "transfer") {
      // Assuming recipient details might be populated or just account number is available
      if (recipientAccountNumber) {
        return `Transfer to Acc: ${recipientAccountNumber}`;
      }
      return "Transfer";
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (loading) {
    return (
      <div className="transaction-history">
        <h3>Transaction History</h3>
        <p>Loading transactions...</p>
      </div>
    )
  }

  if (error) {
    return <div className="transaction-history"><div className="error-message">{error}</div></div>
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
              <th>Balance After</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id} className={transaction.type}>
                <td>{formatDate(transaction.date)}</td>
                <td className="transaction-type">{transaction.type}</td>
                <td className="transaction-amount">
                  {transaction.type === "deposit" || (transaction.type === "transfer" && transaction.recipientId !== userId && transaction.userId !== userId) // Crude check for incoming transfer
                    ? "+"
                    : "-" }
                  ${transaction.amount.toFixed(2)}
                </td>
                <td>${transaction.balanceAfter ? transaction.balanceAfter.toFixed(2) : 'N/A'}</td>
                <td>{getTransactionDescription(transaction)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionHistory

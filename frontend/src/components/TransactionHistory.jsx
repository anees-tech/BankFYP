"use client"

import { useState } from "react"
import "../styles/TransactionHistory.css"
import { staticTransactions } from "../data/dummyData" // Import static data

function TransactionHistory() {
  const [transactions, setTransactions] = useState(staticTransactions)
  const [error, setError] = useState("")

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
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
              <th>Description</th>
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
                <td>{transaction.description || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionHistory

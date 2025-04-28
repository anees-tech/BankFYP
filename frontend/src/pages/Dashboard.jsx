"use client"

import { useState } from "react"
import "../styles/Dashboard.css"
import TransactionHistory from "../components/TransactionHistory"
import { staticAccountDetails } from "../data/dummyData"

function Dashboard({ user }) {
  const [account] = useState(staticAccountDetails)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("transactions")

  const handleTransaction = (e) => {
    e.preventDefault()
    alert("Transactions are disabled in this demo.")
  }

  const handleTransfer = (e) => {
    e.preventDefault()
    alert("Transfers are disabled in this demo.")
  }

  if (error) return <div className="error-message">{error}</div>

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h2>Welcome, {user.name}!</h2>
        <div className="account-info">
          <div className="account-detail">
            <span className="label">Account Number:</span>
            <span className="value">{account?.accountNumber}</span>
          </div>
        </div>
      </div>

      <div className="balance-card">
        <h3>Current Balance</h3>
        <div className="balance-amount">${account?.balance.toFixed(2)}</div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "transactions" ? "active" : ""}`}
          onClick={() => setActiveTab("transactions")}
        >
          Deposit/Withdraw (Demo)
        </button>
        <button className={`tab ${activeTab === "transfer" ? "active" : ""}`} onClick={() => setActiveTab("transfer")}>
          Transfer Money (Demo)
        </button>
      </div>

      {activeTab === "transactions" ? (
        <div className="transaction-section disabled-section">
          <h3>Make a Transaction</h3>
          <p>This feature is disabled in the demo.</p>
          <form onSubmit={handleTransaction}>
            <button type="submit" disabled>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="transfer-form disabled-section">
          <h3>Transfer Money</h3>
          <p>This feature is disabled in the demo.</p>
          <form onSubmit={handleTransfer}>
            <button type="submit" disabled>
              Transfer Funds
            </button>
          </form>
        </div>
      )}

      <TransactionHistory />
    </div>
  )
}

export default Dashboard

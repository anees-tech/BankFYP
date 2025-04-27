"use client"

import { useState, useEffect } from "react"
import "../styles/Dashboard.css"
import { getAccountDetails, makeTransaction } from "../services/accountService"
import TransactionHistory from "../components/TransactionHistory"
import TransferForm from "../components/TransferForm"

function Dashboard({ user }) {
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [transactionType, setTransactionType] = useState("deposit")
  const [amount, setAmount] = useState("")
  const [transactionMessage, setTransactionMessage] = useState("")
  const [activeTab, setActiveTab] = useState("transactions") // "transactions" or "transfer"

  useEffect(() => {
    fetchAccountDetails()
  }, [])

  const fetchAccountDetails = async () => {
    setLoading(true)
    try {
      const accountData = await getAccountDetails(user._id)
      setAccount(accountData)
    } catch (err) {
      setError("Failed to load account details")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleTransaction = async (e) => {
    e.preventDefault()
    setTransactionMessage("")

    if (!amount || isNaN(amount) || Number.parseFloat(amount) <= 0) {
      setTransactionMessage("Please enter a valid amount")
      return
    }

    try {
      const result = await makeTransaction({
        userId: user._id,
        type: transactionType,
        amount: Number.parseFloat(amount),
      })

      setTransactionMessage(`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} successful!`)
      setAmount("")
      fetchAccountDetails() // Refresh account details
    } catch (err) {
      setTransactionMessage(err.message || "Transaction failed")
    }
  }

  if (loading) return <div className="loading">Loading account details...</div>
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
          Deposit/Withdraw
        </button>
        <button className={`tab ${activeTab === "transfer" ? "active" : ""}`} onClick={() => setActiveTab("transfer")}>
          Transfer Money
        </button>
      </div>

      {activeTab === "transactions" ? (
        <div className="transaction-section">
          <h3>Make a Transaction</h3>
          {transactionMessage && (
            <div className={transactionMessage.includes("successful") ? "success" : "error"}>{transactionMessage}</div>
          )}

          <form onSubmit={handleTransaction}>
            <div className="transaction-type">
              <label>
                <input
                  type="radio"
                  name="transactionType"
                  value="deposit"
                  checked={transactionType === "deposit"}
                  onChange={() => setTransactionType("deposit")}
                />
                Deposit
              </label>
              <label>
                <input
                  type="radio"
                  name="transactionType"
                  value="withdraw"
                  checked={transactionType === "withdraw"}
                  onChange={() => setTransactionType("withdraw")}
                />
                Withdraw
              </label>
            </div>

            <div className="amount-input">
              <label htmlFor="amount">Amount ($)</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.01"
                step="0.01"
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <TransferForm userId={user._id} onTransferComplete={fetchAccountDetails} />
      )}

      <TransactionHistory userId={user._id} />
    </div>
  )
}

export default Dashboard

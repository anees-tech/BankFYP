"use client"

import { useState, useEffect } from "react"
import "../styles/Dashboard.css"
import TransactionHistory from "../components/TransactionHistory"
import { getAccountDetails } from "../services/accountService"
import DepositWithdrawForm from "../components/DepositWithdrawForm"
import TransferForm from "../components/TransferForm"

const SecurityTipsSection = () => (
  <div className="info-card security-tips-section">
    <h3>🔒 Security Tips</h3>
    <ul>
      <li>Use strong, unique passwords for your account.</li>
      <li>Enable two-factor authentication if available.</li>
      <li>Beware of phishing emails and suspicious links.</li>
      <li>Regularly review your account activity.</li>
      <li>Never share your login credentials with anyone.</li>
    </ul>
  </div>
)

const AboutUsSection = () => (
  <div className="info-card about-us-section">
    <h3>🏦 About Us</h3>
    <p>
      BankFYP is committed to providing secure and convenient banking solutions.
      Our mission is to empower our customers with financial tools and knowledge
      to achieve their goals. We believe in transparency, innovation, and
      customer-centric services.
    </p>
    <p>
      Founded in 2025, we aim to redefine the banking experience with cutting-edge
      technology and personalized support.
    </p>
  </div>
)

const TestimonialsSection = () => (
  <div className="info-card testimonials-section">
    <h3>💬 What Our Users Say</h3>
    <div className="testimonial-grid">
      <div className="testimonial-item">
        <p>"BankFYP made managing my finances so much easier! The interface is intuitive and the support is top-notch."</p>
        <h4>- Alex P.</h4>
      </div>
      <div className="testimonial-item">
        <p>"Secure, reliable, and always innovating. I trust BankFYP with my savings."</p>
        <h4>- Maria S.</h4>
      </div>
      <div className="testimonial-item">
        <p>"The mobile app is fantastic for banking on the go. Highly recommended!"</p>
        <h4>- David K.</h4>
      </div>
    </div>
  </div>
)

const FAQsSection = () => {
  const faqs = [
    { q: "How do I reset my password?", a: "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions." },
    { q: "What are the transaction fees?", a: "Most standard transactions are free. For specific services like international transfers, please refer to our fee schedule page." },
    { q: "How can I contact customer support?", a: "You can contact customer support via phone at 1-800-BANKFYP, email at support@bankfyp.com, or through the live chat feature on our website." },
    { q: "Is my money safe with BankFYP?", a: "Yes, your deposits are insured by the NDIC (National Deposit Insurance Corporation) up to the standard limit. We also employ advanced security measures to protect your account." }
  ];
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="info-card faqs-section">
      <h3>❓ FAQs</h3>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button className="faq-question" onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
              {faq.q}
              <span>{openFAQ === index ? "-" : "+"}</span>
            </button>
            {openFAQ === index && <div className="faq-answer"><p>{faq.a}</p></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

function Dashboard({ user }) {
  const [account, setAccount] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("depositWithdraw")
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const fetchDashboardData = async () => {
    if (!user?._id) {
      setError("User information is not available.")
      setLoading(false)
      return
    }
    setLoading(true)
    setError("")
    try {
      const accountDetails = await getAccountDetails(user._id)
      setAccount(accountDetails)
    } catch (err) {
      setError(err.message || "Failed to load account details.")
      setAccount(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [user?._id, refreshTrigger])

  const handleTransactionSuccess = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  if (loading) return <div className="loading">Loading dashboard...</div>
  if (error && !account) return <div className="error-message">{error}</div>

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h2>Welcome, {user.name}!</h2>
        {account ? (
          <div className="account-info">
            <div className="account-detail">
              <span className="label">Account Number:</span>
              <span className="value">{account.accountNumber}</span>
            </div>
          </div>
        ) : (
          <p>Loading account information...</p>
        )}
      </div>

      {account && (
        <div className="balance-card">
          <h3>Current Balance</h3>
          <div className="balance-amount">${account.balance?.toFixed(2)}</div>
        </div>
      )}

      <div className="tabs">
        <button
          className={`tab ${activeTab === "depositWithdraw" ? "active" : ""}`}
          onClick={() => setActiveTab("depositWithdraw")}
        >
          Deposit / Withdraw
        </button>
        <button className={`tab ${activeTab === "transfer" ? "active" : ""}`} onClick={() => setActiveTab("transfer")}>
          Transfer Money
        </button>
      </div>

      {activeTab === "depositWithdraw" && user?._id && (
        <DepositWithdrawForm userId={user._id} onTransactionSuccess={handleTransactionSuccess} />
      )}
      {activeTab === "transfer" && user?._id && (
        <TransferForm userId={user._id} onTransactionSuccess={handleTransactionSuccess} />
      )}
      
      {user?._id && <TransactionHistory userId={user._id} refreshTrigger={refreshTrigger} />}

      <AboutUsSection />
      <TestimonialsSection />
      <SecurityTipsSection />
      <FAQsSection />
    </div>
  )
}

export default Dashboard

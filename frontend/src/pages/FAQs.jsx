"use client"

import React, { useState } from 'react';
import '../styles/FAQs.css';

const faqCategories = {
  general: [
    { q: "How do I open an account with BankFYP?", a: "You can open an account by clicking the 'Open an Account' button on our homepage and completing the multi-step registration form. You'll need a valid CNIC, proof of address, and initial deposit." },
    { q: "What documents are required for account opening?", a: "You'll need: 1) Valid CNIC or passport, 2) Proof of address (utility bill/bank statement), 3) Recent photographs, 4) Income proof (salary slip/business documents), and 5) Initial deposit as per account type." },
    { q: "What are the different types of accounts available?", a: "We offer: 1) Savings Account - for personal savings with competitive interest, 2) Current Account - for businesses with unlimited transactions, 3) Fixed Deposit Account - for guaranteed returns with fixed tenure." },
    { q: "Is there a minimum balance requirement?", a: "Savings Account: PKR 1,000 minimum balance. Current Account: PKR 25,000 minimum balance. Fixed Deposit: PKR 50,000 minimum deposit. Islamic accounts have similar requirements." }
  ],
  digital: [
    { q: "How do I access internet banking?", a: "Visit our website and click on 'Internet Banking'. Use your customer ID and password to login. For first-time users, you can register online or visit any branch for activation." },
    { q: "Is the mobile app free to download?", a: "Yes, our BankFYP mobile app is completely free to download from Google Play Store and Apple App Store. There are no charges for using the app." },
    { q: "What can I do through mobile banking?", a: "You can: check account balance, view transaction history, transfer funds, pay bills, recharge mobile, apply for loans, locate ATMs/branches, and contact customer support." },
    { q: "How secure is online banking?", a: "We use 256-bit SSL encryption, two-factor authentication, and real-time fraud monitoring. Your login sessions timeout automatically, and we send SMS alerts for all transactions." }
  ],
  transactions: [
    { q: "What are the transaction limits?", a: "ATM withdrawal: PKR 50,000/day. Online transfer: PKR 500,000/day. Mobile banking: PKR 100,000/day. Limits can be customized based on your account type and history." },
    { q: "Are there any charges for transactions?", a: "First 4 ATM transactions per month are free. Online transfers within BankFYP are free. IBFT charges: PKR 5-25 depending on amount. Bill payments are free through our digital channels." },
    { q: "How long do transfers take?", a: "Internal transfers (within BankFYP): Instant. IBFT to other banks: 1-2 hours during banking hours. International transfers: 1-3 business days depending on destination country." },
    { q: "Can I cancel a transaction?", a: "Pending transactions can be cancelled through internet/mobile banking. Completed transactions cannot be cancelled but can be disputed if unauthorized. Contact customer support immediately for assistance." }
  ],
  security: [
    { q: "What should I do if my card is lost or stolen?", a: "Immediately call our 24/7 helpline at +92-300-BANKFYP or use mobile app to block your card. Visit nearest branch with FIR copy to get replacement card within 3-5 working days." },
    { q: "How do I report suspicious activity?", a: "Report immediately through: 1) Mobile app 'Report Issue' feature, 2) Customer helpline, 3) Email to security@bankfyp.com, 4) Visit nearest branch. We investigate all reports within 24 hours." },
    { q: "What is two-factor authentication?", a: "2FA adds extra security by requiring two forms of verification: your password + SMS OTP/biometric. This prevents unauthorized access even if someone knows your password." },
    { q: "How often should I change my banking passwords?", a: "We recommend changing passwords every 3-6 months. Use strong passwords with mix of letters, numbers, and symbols. Avoid using same password for multiple accounts." }
  ],
  loans: [
    { q: "What types of loans do you offer?", a: "We offer: Personal loans (up to PKR 2M), Car loans (up to 85% financing), Home loans (up to PKR 10M), Business loans, and Education loans with competitive rates." },
    { q: "What are the eligibility criteria for personal loans?", a: "Age: 21-60 years, Minimum salary: PKR 30,000/month, Employment: 6 months current job, CIBIL score: 650+, and existing relationship with bank preferred." },
    { q: "How quickly can I get loan approval?", a: "Personal loans: 24-48 hours, Car loans: 3-5 days, Home loans: 7-10 days. Pre-approved customers get instant approval. Complete documentation speeds up the process." },
    { q: "Can I prepay my loan?", a: "Yes, you can prepay partially or fully after 6 EMIs. Prepayment charges: 2-4% of outstanding amount depending on loan type and tenure remaining." }
  ]
};

function FAQs() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const filteredFAQs = faqCategories[activeCategory].filter(faq =>
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faqs-page">
      <div className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our banking services.</p>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="faq-search"
        />
      </div>

      <div className="faq-categories">
        <button 
          className={`category-btn ${activeCategory === 'general' ? 'active' : ''}`}
          onClick={() => setActiveCategory('general')}
        >
          General Banking
        </button>
        <button 
          className={`category-btn ${activeCategory === 'digital' ? 'active' : ''}`}
          onClick={() => setActiveCategory('digital')}
        >
          Digital Banking
        </button>
        <button 
          className={`category-btn ${activeCategory === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveCategory('transactions')}
        >
          Transactions
        </button>
        <button 
          className={`category-btn ${activeCategory === 'security' ? 'active' : ''}`}
          onClick={() => setActiveCategory('security')}
        >
          Security
        </button>
        <button 
          className={`category-btn ${activeCategory === 'loans' ? 'active' : ''}`}
          onClick={() => setActiveCategory('loans')}
        >
          Loans
        </button>
      </div>

      <div className="faqs-content">
        <div className="faq-list">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className="faq-question" 
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQ === index}
                >
                  {faq.q}
                  <span className="faq-icon">{openFAQ === index ? "−" : "+"}</span>
                </button>
                {openFAQ === index && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No FAQs found matching your search. Try different keywords or browse categories.</p>
            </div>
          )}
        </div>
      </div>

      <section className="help-section">
        <h3>Still Need Help?</h3>
        <div className="help-options">
          <div className="help-option">
            <h4>📞 Call Us</h4>
            <p>Customer Support: +92-21-123-4567<br />Available 24/7 for urgent matters</p>
          </div>
          <div className="help-option">
            <h4>💬 Live Chat</h4>
            <p>Chat with our support team<br />Monday-Friday: 9AM-6PM</p>
          </div>
          <div className="help-option">
            <h4>✉️ Email</h4>
            <p>support@bankfyp.com<br />We respond within 24 hours</p>
          </div>
          <div className="help-option">
            <h4>🏢 Visit Branch</h4>
            <p>Find nearest branch<br />Personal assistance available</p>
          </div>
        </div>
      </section>

      <section className="popular-topics">
        <h3>Popular Help Topics</h3>
        <div className="topics-grid">
          <div className="topic-item">Account Opening</div>
          <div className="topic-item">Card Services</div>
          <div className="topic-item">Loan Applications</div>
          <div className="topic-item">Mobile Banking</div>
          <div className="topic-item">International Transfers</div>
          <div className="topic-item">Investment Options</div>
        </div>
      </section>
    </div>
  );
}

export default FAQs;
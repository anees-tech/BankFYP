"use client"

import React from "react"
import "../styles/Footer.css" // We'll create this CSS file next

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>&copy; {currentYear} BankFYP. All rights reserved.</p>
        {/* You can add more links or info here if needed */}
        {/* <nav>
          <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
        </nav> */}
      </div>
    </footer>
  )
}

export default Footer
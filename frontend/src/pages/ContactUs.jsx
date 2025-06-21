"use client"

import React, { useState } from 'react';
import '../styles/ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to a server
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="contact-us-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We're here to help. Reach out to us anytime.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <div className="contact-methods">
            <div className="contact-method">
              <h4>🏢 Head Office</h4>
              <p>123 Bank Street, Finance City<br />Karachi, Pakistan 75000</p>
            </div>
            <div className="contact-method">
              <h4>📞 Phone</h4>
              <p>Customer Service: +92-21-123-4567<br />Business Banking: +92-21-123-4568</p>
            </div>
            <div className="contact-method">
              <h4>✉️ Email</h4>
              <p>General: info@bankfyp.com<br />Support: support@bankfyp.com</p>
            </div>
            <div className="contact-method">
              <h4>🕒 Business Hours</h4>
              <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 2:00 PM<br />Sunday: Closed</p>
            </div>
          </div>

          <div className="emergency-contact">
            <h4>🚨 24/7 Emergency Support</h4>
            <p>For urgent banking matters:</p>
            <p><strong>Hotline: +92-300-BANKFYP</strong></p>
            <p><strong>Email: emergency@bankfyp.com</strong></p>
          </div>
        </div>

        <div className="contact-form-container">
          <h3>Send Us a Message</h3>
          {submitted ? (
            <div className="success-message">
              <h4>Thank You!</h4>
              <p>Your message has been received. Our team will get back to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your email address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="account">Account Related</option>
                  <option value="loans">Loans & Credits</option>
                  <option value="cards">Debit/Credit Cards</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="complaint">Complaint</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required
                  placeholder="Please describe your inquiry in detail..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          )}
        </div>
      </div>

      <section className="branch-locations">
        <h3>Our Branch Locations</h3>
        <div className="branches-grid">
          <div className="branch-item">
            <h4>Karachi Main Branch</h4>
            <p>📍 123 Bank Street, Karachi<br />
            📞 +92-21-123-4567<br />
            🕒 Mon-Fri: 9AM-6PM, Sat: 9AM-2PM</p>
          </div>
          <div className="branch-item">
            <h4>Lahore Branch</h4>
            <p>📍 456 Mall Road, Lahore<br />
            📞 +92-42-123-4567<br />
            🕒 Mon-Fri: 9AM-6PM, Sat: 9AM-2PM</p>
          </div>
          <div className="branch-item">
            <h4>Islamabad Branch</h4>
            <p>📍 789 Blue Area, Islamabad<br />
            📞 +92-51-123-4567<br />
            🕒 Mon-Fri: 9AM-6PM, Sat: 9AM-2PM</p>
          </div>
          <div className="branch-item">
            <h4>Rawalpindi Branch</h4>
            <p>📍 321 Committee Chowk, Rawalpindi<br />
            📞 +92-51-987-6543<br />
            🕒 Mon-Fri: 9AM-6PM, Sat: 9AM-2PM</p>
          </div>
        </div>
      </section>

      <section className="quick-help">
        <h3>Quick Help</h3>
        <div className="help-categories">
          <div className="help-category">
            <h4>💳 Account Issues</h4>
            <ul>
              <li>Forgot password/PIN</li>
              <li>Card blocked/lost</li>
              <li>Account balance inquiry</li>
              <li>Transaction disputes</li>
            </ul>
          </div>
          <div className="help-category">
            <h4>💰 Loan Services</h4>
            <ul>
              <li>Loan application status</li>
              <li>EMI calculations</li>
              <li>Prepayment options</li>
              <li>Loan documentation</li>
            </ul>
          </div>
          <div className="help-category">
            <h4>🌐 Digital Banking</h4>
            <ul>
              <li>Mobile app support</li>
              <li>Internet banking help</li>
              <li>Digital payment issues</li>
              <li>Security concerns</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
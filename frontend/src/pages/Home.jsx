"use client"

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Secure, Simple, and Smart Banking</h1>
          <p>Your financial future starts here. Join BankFYP today and experience banking designed for you.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">Open an Account</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose BankFYP?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🔒 Top-Tier Security</h3>
            <p>Your security is our priority. We use advanced encryption and security protocols to protect your data.</p>
          </div>
          <div className="feature-card">
            <h3>💸 No Hidden Fees</h3>
            <p>Enjoy transparent banking with no hidden charges. What you see is what you get.</p>
          </div>
          <div className="feature-card">
            <h3>📱 24/7 Mobile Access</h3>
            <p>Manage your finances anytime, anywhere with our user-friendly mobile and web applications.</p>
          </div>
        </div>
      </section>

      <section className="services-section">
        <h2>Our Banking Services</h2>
        <div className="services-grid">
          <div className="service-item">
            <h4>💳 Savings Account</h4>
            <p>Earn competitive interest rates on your savings with our flexible savings account options.</p>
            <ul>
              <li>High interest rates</li>
              <li>No minimum balance</li>
              <li>Free ATM card</li>
              <li>Mobile banking</li>
            </ul>
          </div>
          <div className="service-item">
            <h4>🏢 Current Account</h4>
            <p>Perfect for businesses and frequent transactions with unlimited transaction limits.</p>
            <ul>
              <li>Unlimited transactions</li>
              <li>Checkbook facility</li>
              <li>Business banking tools</li>
              <li>Overdraft facility</li>
            </ul>
          </div>
          <div className="service-item">
            <h4>📈 Fixed Deposits</h4>
            <p>Secure your future with our fixed deposit schemes offering guaranteed returns.</p>
            <ul>
              <li>Guaranteed returns</li>
              <li>Flexible tenure</li>
              <li>Loan against FD</li>
              <li>Auto-renewal option</li>
            </ul>
          </div>
          <div className="service-item">
            <h4>💰 Personal Loans</h4>
            <p>Quick and hassle-free personal loans with competitive interest rates.</p>
            <ul>
              <li>Quick approval</li>
              <li>Minimal documentation</li>
              <li>Competitive rates</li>
              <li>Flexible repayment</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="digital-banking-section">
        <h2>Digital Banking Solutions</h2>
        <div className="digital-features">
          <div className="digital-card">
            <h4>🌐 Internet Banking</h4>
            <p>Access your account 24/7 from anywhere in the world with our secure online banking platform.</p>
          </div>
          <div className="digital-card">
            <h4>📱 Mobile App</h4>
            <p>Bank on the go with our user-friendly mobile application available for iOS and Android.</p>
          </div>
          <div className="digital-card">
            <h4>💳 Digital Payments</h4>
            <p>Make instant payments and transfers with our secure digital payment solutions.</p>
          </div>
          <div className="digital-card">
            <h4>📊 Financial Analytics</h4>
            <p>Track your spending patterns and financial goals with our advanced analytics tools.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>"BankFYP has revolutionized my banking experience. The mobile app is incredibly user-friendly and the customer service is outstanding."</p>
            <div className="testimonial-author">
              <strong>Sarah Ahmed</strong>
              <span>Business Owner</span>
            </div>
          </div>
          <div className="testimonial">
            <p>"I've been banking with BankFYP for 3 years now. Their security measures and transparent fee structure give me complete peace of mind."</p>
            <div className="testimonial-author">
              <strong>Muhammad Hassan</strong>
              <span>Software Engineer</span>
            </div>
          </div>
          <div className="testimonial">
            <p>"The loan approval process was so quick and hassle-free. BankFYP truly understands customer needs."</p>
            <div className="testimonial-author">
              <strong>Fatima Khan</strong>
              <span>Teacher</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2>BankFYP by Numbers</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>50,000+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-item">
            <h3>₹10B+</h3>
            <p>Total Deposits</p>
          </div>
          <div className="stat-item">
            <h3>100+</h3>
            <p>ATM Locations</p>
          </div>
          <div className="stat-item">
            <h3>99.9%</h3>
            <p>Uptime Guarantee</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Banking Journey?</h2>
          <p>Join thousands of satisfied customers who trust BankFYP with their financial future.</p>
          <Link to="/register" className="btn btn-primary btn-large">Open Your Account Today</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
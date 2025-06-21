"use client"

import React from 'react';
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-page">
      <div className="page-header">
        <h1>About BankFYP</h1>
        <p>Your trusted partner in financial growth and security.</p>
      </div>

      <div className="about-content">
        <section className="info-section">
          <h3>Our Mission</h3>
          <p>
            To provide secure, innovative, and convenient banking solutions that empower our customers to achieve their financial goals. We believe in transparency, integrity, and a customer-centric approach in everything we do.
          </p>
        </section>

        <section className="info-section">
          <h3>Our Vision</h3>
          <p>
            To be the leading digital bank, recognized for our cutting-edge technology, personalized services, and unwavering commitment to our customers' success. We aim to redefine the banking experience for the modern era.
          </p>
        </section>

        <section className="info-section">
          <h3>Our History</h3>
          <p>
            Founded in 2025, BankFYP was born from a desire to bridge the gap between traditional banking and the fast-paced digital world. Our founders, a team of finance and technology experts, envisioned a bank that was not only secure and reliable but also intuitive and accessible to everyone.
          </p>
          <p>
            Starting with a small team of passionate professionals, we have grown to serve over 50,000 customers across Pakistan. Our journey has been marked by continuous innovation, customer satisfaction, and a commitment to excellence.
          </p>
        </section>

        <section className="values-section">
          <h3>Our Core Values</h3>
          <div className="values-grid">
            <div className="value-item">
              <h4>🔒 Security First</h4>
              <p>We prioritize the security of your financial data with state-of-the-art encryption and fraud protection systems.</p>
            </div>
            <div className="value-item">
              <h4>💡 Innovation</h4>
              <p>We continuously evolve our services to meet the changing needs of our customers in the digital age.</p>
            </div>
            <div className="value-item">
              <h4>🤝 Trust & Transparency</h4>
              <p>We build lasting relationships through honest communication and transparent business practices.</p>
            </div>
            <div className="value-item">
              <h4>🎯 Customer-Centric</h4>
              <p>Every decision we make is guided by our commitment to serving our customers' best interests.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h3>Leadership Team</h3>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h4>Ahmed Ali</h4>
              <p>Chief Executive Officer</p>
              <span>20+ years in banking and finance</span>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h4>Sarah Khan</h4>
              <p>Chief Technology Officer</p>
              <span>Expert in digital banking solutions</span>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h4>Muhammad Hassan</h4>
              <p>Chief Risk Officer</p>
              <span>Specialist in cybersecurity and risk management</span>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h4>Fatima Ahmed</h4>
              <p>Head of Customer Experience</p>
              <span>Passionate about customer satisfaction</span>
            </div>
          </div>
        </section>

        <section className="awards-section">
          <h3>Awards & Recognition</h3>
          <div className="awards-grid">
            <div className="award-item">
              <h4>🏆 Best Digital Bank 2024</h4>
              <p>Pakistan Banking Awards</p>
            </div>
            <div className="award-item">
              <h4>🌟 Customer Choice Award</h4>
              <p>Financial Services Excellence</p>
            </div>
            <div className="award-item">
              <h4>🔒 Security Excellence Award</h4>
              <p>Cybersecurity Summit Pakistan</p>
            </div>
            <div className="award-item">
              <h4>💡 Innovation in Banking</h4>
              <p>FinTech Pakistan Awards</p>
            </div>
          </div>
        </section>

        <section className="commitment-section">
          <h3>Our Commitment to Society</h3>
          <p>
            At BankFYP, we believe in giving back to the community. We are committed to financial inclusion and literacy, supporting educational initiatives, and promoting sustainable banking practices.
          </p>
          <div className="commitment-items">
            <div className="commitment-item">
              <h4>📚 Financial Literacy Programs</h4>
              <p>Free workshops and seminars to help people understand banking and personal finance.</p>
            </div>
            <div className="commitment-item">
              <h4>🌱 Environmental Responsibility</h4>
              <p>Paperless banking initiatives and support for green energy projects.</p>
            </div>
            <div className="commitment-item">
              <h4>🎓 Education Support</h4>
              <p>Scholarships and educational loans for deserving students.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
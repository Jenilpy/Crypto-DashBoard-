import React from 'react';
import './Privacy.css';

const Privacy = () => (
  <div className="privacy-simple-page">
    <div className="privacy-simple-container">
      <h1>Privacy Policy</h1>
      <p className="privacy-updated">Last updated: May 2025</p>
      <section>
        <h2>Overview</h2>
        <p>
          Your privacy is important to us. This policy explains how CryptoDash collects, uses, and protects your information when you use our services.
        </p>
      </section>
      <section>
        <h2>What We Collect</h2>
        <ul>
          <li>Basic account information (name, email, username)</li>
          <li>Usage data (device, browser, pages visited)</li>
          <li>Contact details for support</li>
        </ul>
      </section>
      <section>
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide and improve our services</li>
          <li>To communicate with you about your account or updates</li>
          <li>To ensure security and prevent fraud</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>
      <section>
        <h2>Your Rights</h2>
        <ul>
          <li>Access, correct, or delete your personal data</li>
          <li>Request a copy or transfer of your data</li>
          <li>Contact us to exercise your rights</li>
        </ul>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          If you have questions about this policy, email us at <b>privacy@cryptodash.com</b>.
        </p>
      </section>
    </div>
  </div>
);

export default Privacy; 
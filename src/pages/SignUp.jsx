import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [activeTab, setActiveTab] = useState('login');

  const showForm = (formType) => {
    setActiveTab(formType);
  };

  return (
    <div className="signup-main">
      <div className="popup-container">
        <div className="popup-box">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'login' ? 'active' : ''}`} 
              onClick={() => showForm('login')}
            >
              Log In
            </button>
            <button 
              className={`tab ${activeTab === 'signup' ? 'active' : ''}`} 
              onClick={() => showForm('signup')}
            >
              Sign Up
            </button>
          </div>

          <div className={`form-container ${activeTab === 'login' ? '' : 'hidden'}`}>
            <input type="text" placeholder="Email or Username" />
            <input type="password" placeholder="Password" />
            <button className="btn">Login</button>
            <a href="#" className="link">Forgotten account?</a>
            <div className="google-btn">
              <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google"/>
              Continue with Google
            </div>
            <div className="demo-note">
              <small>
                <strong>Note:</strong> This is a demo form for interface completeness. 
                No actual authentication or user registration is implemented.
              </small>
            </div>
          </div>

          <div className={`form-container ${activeTab === 'signup' ? '' : 'hidden'}`}>
            <input type="email" placeholder="Enter your email" />
            <input type="text" placeholder="Choose username" />
            <input type="password" placeholder="Create password" />
            <button className="btn">Create Account</button>
            <p className="terms">By signing up, you agree to our <a href="#">Terms</a>.</p>
            <div className="google-btn">
              <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google"/>
              Continue with Google
            </div>
            <div className="demo-note">
              <small>
                <strong>Note:</strong> This is a demo form for interface completeness. 
                No actual authentication or user registration is implemented.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 
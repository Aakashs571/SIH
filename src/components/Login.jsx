import React from 'react';

export default function Login() {
  return (
    <div id="loginPage" className="page">
      <div className="page-header">
        <h1>Login</h1>
        <p>Access your profile and share your reviews</p>
      </div>
      <section className="section" style={{background: 'var(--dark)', maxWidth: 700, margin: '0 auto'}}>
        <form id="loginForm" className="booking-summary">
          <h3 style={{marginBottom: 15}}>Sign in</h3>
          <div className="form-group">
            <label>Email</label>
            <input id="loginEmail" type="email" required placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input id="loginPassword" type="password" required placeholder="••••••••" />
          </div>
          <div className="form-row">
            <button id="loginBtn" type="submit" className="submit-btn">Login</button>
            <button id="signupBtn" type="button" className="submit-btn">Create Account</button>
          </div>
          <div className="muted" style={{marginTop:10}}>Tip: If you don't have an account, click Create Account.</div>
        </form>
      </section>
    </div>
  );
}

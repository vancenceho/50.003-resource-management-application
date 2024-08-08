import React from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import dellLogo from './dell-logo.png';

function SignIn() {
  return (
    <div className="signin-container">
      <img src={dellLogo} alt="Dell Technologies" className="logo" />
      <h1>SIGN IN</h1>
      <div className="button-container">
        <Link to="/admin-login" className="signin-button">Admin</Link>
        <Link to="/trainer-login" className="signin-button">Trainer</Link>
        <Link to="/client-login" className="signin-button">Client</Link>
      </div>
      <Link to="/create-client" className="create-account-button">Create New Account</Link>
    </div>
  );
}

export default SignIn;


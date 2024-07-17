import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ClientLogin.css';
import dellLogo from './dell-logo.png';

const ClientLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="body">
      <div className="login-container">
      <img src={dellLogo} alt="Dell Technologies" className="logo" />
        <h2 className="h2">Sign In To Client Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientLoginPage;

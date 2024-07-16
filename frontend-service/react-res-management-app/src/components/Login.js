import React, { useState } from 'react';
import './Login.css';

const LoginPage = () => {
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
        <img
          src="https://www.delltechnologies.com/assets/images/merch/salesforce-oss/assets/images/dell-logo-blue-1024.png"
          alt="Dell Technologies"
          className="img"
        />
        <h2 className="h2">Sign in to my Account</h2>
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

export default LoginPage;

import React, { useState } from 'react';
import './CreateClient.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import dellLogo from './dell-logo.png'; // Ensure you have the Dell logo image in the correct path


const CreateClientAccount = () => {
  return (
      <>

        <main className="main-content">
        <img src={dellLogo} alt="Dell Technologies" className="client-logo" />
          <h2 className="main-title">New Admin Account</h2>
          <div className="form-container">
            <form className="admin-form">
              <label>
                Username:
                <input type="text" name="username" required />
              </label>
              <label>
                First Name:
                <input type="text" name="firstName" required />
              </label>
              <label>
                Last Name:
                <input type="text" name="lastName" required />
              </label>
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <label>
                Password:
                <input type="password" name="password" required />
              </label>
              <button type="submit" className="confirm-button">Confirm</button>
            </form>
          </div>
        </main>

      </>
  );
};




export default CreateClientAccount;

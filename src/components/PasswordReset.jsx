// src/components/PasswordReset.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/password-reset', { email });
      setMessage(response.data.message); // Success message
    } catch (error) {
      setMessage(error.response.data.message); // Error message
    }
  };

  return (
    <div>
      <h2>Request Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={handleChange} required />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordReset;

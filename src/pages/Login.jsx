// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', credentials);
      localStorage.setItem('token', response.data.token); // Store JWT
      setMessage('Login successful!');
    } catch (error) {
      setMessage(error.response.data.message); // Error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;

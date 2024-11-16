// src/components/EmailVerification.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmailVerification = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('/api/verify-email', { token });
        setMessage(response.data.message); // Success message
      } catch (error) {
        setMessage(error.response.data.message); // Error message
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default EmailVerification;

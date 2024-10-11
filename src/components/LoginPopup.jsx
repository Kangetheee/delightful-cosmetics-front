import React, { useContext, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(ShopContext); // Use setToken from context
  const [isSignUp, setIsSignUp] = useState(false); // Manage login vs signup state
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let endpoint = isSignUp ? "/api/user/register" : "/api/user/login"; // Determine login or signup endpoint
    const response = await axios.post(`${url}${endpoint}`, data);

    if (response.data.success) {
      setToken(response.data.token);  // Set token in context
      localStorage.setItem("token", response.data.token);  // Persist token in localStorage
      setShowLogin(false); // Close the login popup
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flexCenter bg-black/50 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-md max-w-md w-full'>

        {/* Close Button */}
        <FaXmark 
          className='text-xl cursor-pointer float-right' 
          onClick={() => setShowLogin(false)} 
        />

        <h4 className='text-center text-2xl mb-4'>
          {isSignUp ? "Sign Up" : "Login"}
        </h4>

        <form onSubmit={onLogin}>
          {/* Input Fields */}
          <div className='space-y-4 mb-4'>
            {isSignUp && (
              <input
                type='text'
                name='name'
                value={data.name}
                onChange={onChangeHandler}
                placeholder='Your Name'
                required={isSignUp}
                className='border border-slate-900/20 w-full p-2 pl-4 rounded-md outline-none'
              />
            )}
            <input
              type='email'
              name='email'
              value={data.email}
              onChange={onChangeHandler}
              placeholder='Your Email'
              required
              className='border border-slate-900/20 w-full p-2 pl-4 rounded-md outline-none'
            />
            <input
              type='password'
              name='password'
              value={data.password}
              onChange={onChangeHandler}
              placeholder='Your Password'
              required
              className='border border-slate-900/20 w-full p-2 pl-4 rounded-md outline-none'
            />
          </div>

          <button type='submit' className='w-full bg-secondary text-white p-2 rounded-md'>
            {isSignUp ? "Create Account" : "Login"}
          </button>
        </form>

        <p className='text-center mt-4'>
          {isSignUp ? "Already have an account?" : "Don't have an account?"} 
          <span className='text-secondary cursor-pointer ml-1' onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;

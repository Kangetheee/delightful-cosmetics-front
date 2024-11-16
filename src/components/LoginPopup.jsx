import React, { useContext, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import axios from 'axios';
import { auth, googleProvider } from '../firebase'; // Modular SDK imports
import { signInWithPopup } from 'firebase/auth';  // Correct import
import { ShopContext } from '../context/ShopContext';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(ShopContext); // Use setToken from context
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      console.log(user);

      // Optionally send user data to your backend
      await axios.post(`${url}/api/user/google-login`, {
        email: user.email,
        name: user.displayName,
      });

      // Handle token after successful login
      const token = await user.getIdToken();
      setToken(token);
      localStorage.setItem("token", token);
      setShowLogin(false); // Close the login popup

    } catch (error) {
      alert("Error during Google sign-in: " + error.message);
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Handle sign up process
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        
        // Save user data to backend
        await axios.post(`${url}/api/user/register`, {
          uid: user.uid,
          name: data.name,
          email: data.email,
        });

        alert("Account created successfully!");
      } else {
        // Handle login process
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const token = await userCredential.user.getIdToken();
        
        await axios.post(`${url}/api/user/login`, { email: data.email });

        setToken(token);
        localStorage.setItem("token", token);
        setShowLogin(false); // Close the popup
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flexCenter bg-black/50 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-md max-w-md w-full'>
        <FaXmark 
          className='text-xl cursor-pointer float-right' 
          onClick={() => setShowLogin(false)} 
        />

        <h4 className='text-center text-2xl mb-4'>
          {isSignUp ? "Sign Up" : "Login"}
        </h4>

        <form onSubmit={onLogin}>
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

        <button
          onClick={onGoogleSignIn}
          className='w-full bg-blue-500 text-white p-2 mt-4 rounded-md'
        >
          Sign in with Google
        </button>

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

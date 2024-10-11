import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { NavBar } from './NavBar';
import { MdClose, MdMenu } from 'react-icons/md';
import { FaBasketShopping, FaCircleUser } from 'react-icons/fa6';
import { FiPackage } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { ShopContext } from '../context/ShopContext';

export function Header({ setShowLogin }) {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const { getTotalCartAmount, token, setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");  // Clear token from context
    navigate("/");  // Redirect to homepage
  };

  return (
    <header className='fixed w-full z-20'>
      <div className='max-padd-container flex justify-between items-center py-4'>
        
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="delight-logo" className="h-20 w-20" />
        </Link>

        {/* Navbar */}
        <NavBar containerStyles="hidden md:flex" />

        {/* Right side: Cart and Login/User Button */}
        <div className='flex items-center gap-x-6'>
          {/* Cart Icon */}
          <Link to="/cart" className="flex items-center">
            <FaBasketShopping className="text-[22px]" />
            <span className={getTotalCartAmount() > 0 ? 'relative flexCenter w-2 h-2 rounded-full bg-secondary text-white medium-14 -top-1' : 'w-2 h-2 rounded-full bg-transparent'}></span>
          </Link>

          {/* Conditionally Render Login or User Icon */}
          {!token ? (
            <button 
              onClick={() => setShowLogin(true)}  // Trigger the login popup
              className='btn-outline rounded-full hidden md:inline-block'>
              Login
            </button>
          ) : (
            <div className='relative hidden md:inline-block'>
              <FaCircleUser className='text-2xl cursor-pointer' onClick={toggleMenu} />
              {/* User Menu for Desktop */}
              {menuOpened && (
                <ul className='absolute right-0 mt-2 bg-secondary/35 shadow-sm p-3 w-24 ring-1 ring-slate-900/15 rounded flex flex-col'>
                  <li className='flex items-center gap-x-2 p-2 hover:bg-gray-100'>
                    <FiPackage />
                    <Link to="/orders">Orders</Link>
                  </li>
                  <hr className='my-2' />
                  <li onClick={logout} className='flex items-center gap-x-2 p-2 hover:bg-gray-100 cursor-pointer'>
                    <TbLogout />
                    <p>Log Out</p>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden flex items-center'>
          {!menuOpened ? (
            <MdMenu className="text-2xl cursor-pointer" onClick={toggleMenu} />
          ) : (
            <MdClose className="text-2xl cursor-pointer" onClick={toggleMenu} />
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      {menuOpened && (
        <div className='fixed top-16 right-0 left-0 bg-white p-4 shadow-md flex flex-col space-y-4 md:hidden'>
          <NavBar containerStyles="flex flex-col space-y-4" />

          {/* Cart Icon for Mobile */}
          <Link to="/cart" className="flex items-center justify-center">
            <FaBasketShopping className="text-[22px]" />
            <span className={getTotalCartAmount() > 0 ? 'relative flexCenter w-2 h-2 rounded-full bg-secondary text-white medium-14 -top-1' : 'w-2 h-2 rounded-full bg-transparent'}></span>
          </Link>

          {/* Conditionally Render Login or User Icon for Mobile */}
          {!token ? (
            <button 
              onClick={() => setShowLogin(true)}  // Trigger the login popup for mobile
              className='btn-outline rounded-full'>
              Login
            </button>
          ) : (
            <div className='group relative'>
              <FaCircleUser className='text-2xl' />
              {/* User Menu for Mobile */}
              <ul className='bg-secondary shadow-sm p-3 w-24 ring-1 ring-slate-900/15 rounded absolute right-0 flex flex-col'>
                <li onClick={() => navigate("/myorders")} className='flexCenter gap-x-2 cursor-pointer'>
                  <FiPackage className='text-[19px]' />
                  <p>Orders</p>
                </li>
                <hr className='my-2'/>
                {/* Logout */}
                <li onClick={logout} className='flexCenter gap-x-2 cursor-pointer'>
                  <TbLogout className='text-[19px]' />
                  <p>Log Out</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

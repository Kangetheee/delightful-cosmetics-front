import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Orders = () => {
  const { getTotalCartAmount, cartItems, all_products, url, token } = useContext(ShopContext);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    county: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  // Handle coupon submission
  const handleCouponSubmit = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(10);  // Example discount of 10
    } else {
      alert('Invalid coupon code');
    }
  };

  // Total after applying coupon discount
  const getDiscountedTotal = () => {
    const totalAmount = getTotalCartAmount();
    return totalAmount - (totalAmount * discount / 100);
  };

  // Handle input change for form fields
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true); // Start loading

    let orderItems = [];
    all_products.forEach((item) => {
        if (cartItems[item._id] > 0) {
            let itemInfo = { ...item, quantity: cartItems[item._id] };
            orderItems.push(itemInfo);
        }
    });

    let orderData = {
        address: data, // Ensure 'data' holds the correct address
        items: orderItems,
        amount: getDiscountedTotal(), // Ensure this returns the correct amount
        phone: data.phone
    };

    try {
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        
        if (response.data.success) {
            // If the STK push was successful, handle the response as needed
            alert("Payment request sent successfully. Please check your phone for payment confirmation.");
            navigate("/myorders");
            // You can redirect the user or show a confirmation message as needed
        } else {
            alert("Error processing your order. Please try again.");
        }
    } catch (error) {
        console.error("Error placing order:", error.response || error.message);
        alert("Network error. Please check your connection and try again.");
    } 
};



    useEffect(()=>{
      if(!token){
        navigate("/cart")
      }else if(getTotalCartAmount()===0){
        navigate("/cart")
      }
    })



  return (
    <section className='max-padd-container py-28 xl:py-32'>
      <form className='flex flex-col xl:flex-row gap-20 xl:gap-28' onSubmit={handleFormSubmit}>
        {/* Delivery Information */}
        <div className='flex flex-1 flex-col gap-3 text-[95%]'>
          <h3 className='bold-28 mb-4'>Delivery Information</h3>
          <div className='flex gap-3'>
            <input 
              onChange={onChangeHandler} 
              name='firstName' 
              value={data.firstName} 
              type="text" 
              placeholder='First Name' 
              className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' 
              required 
            />
            <input 
              onChange={onChangeHandler} 
              name='lastName' 
              value={data.lastName} 
              type="text" 
              placeholder='Last Name' 
              className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' 
              required 
            />
          </div>
          <input 
            onChange={onChangeHandler} 
            name='email' 
            value={data.email} 
            type="email" 
            placeholder='Your Email' 
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' 
            required 
          />
          <input 
            onChange={onChangeHandler} 
            name='phone' 
            value={data.phone} 
            type="text" 
            placeholder='Phone Number' 
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' 
            required 
          />
         <input 
            onChange={onChangeHandler} 
            name='street' 
            value={data.street} 
            type="text" 
            placeholder='Street' 
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' 
          />
          <div className='flex gap-3'>
            <input 
              onChange={onChangeHandler} 
              name='city' 
              value={data.city} 
              type="text" 
              placeholder='City' 
              className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' 
            />
            <input 
              onChange={onChangeHandler} 
              name='county' 
              value={data.county} 
              type="text" 
              placeholder='County' 
              className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' 
            />
          </div>
          <div className='flex gap-3'>
            <input 
              onChange={onChangeHandler} 
              name='zipcode' 
              value={data.zipcode} 
              type="text" 
              placeholder='Zip code' 
              className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' 
            />
            <input 
              onChange={onChangeHandler} 
              name='country' 
              value={data.country} 
              type="text" 
              placeholder='Country' 
              className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' 
            />
          </div>
        </div>
        
        {/* Card Details */}
        <div className='flex flex-1 flex-col gap-2'>
          <h4 className='bold-22'>Summary</h4>
          <div>
            <div className='flexBetween py-3'>
              <h4 className='medium-16'>SubTotal:</h4>
              <h4 className='text-gray-30 font-semibold'>KSH{getTotalCartAmount()}</h4>
            </div>
            <hr />
            <div className='flexBetween py-3'>
              <h4 className='medium-16'>Shipping Fee</h4>
              <h4 className='text-gray-30 font-semibold'>KSH{0}</h4> {/* Replace with actual shipping fee */}
            </div>
            <hr />
            <div className='flexBetween py-3'>
              <h4 className='medium-18'>Total: </h4>
              <h4 className='text-gray-30 font-semibold'>KSH{getDiscountedTotal() + 200}</h4>
            </div>
          </div>
          <button 
            type="submit" 
            className='btn-secondary w-52 rounded'>
            Proceed to Checkout
          </button>
        </div>

        {/* Coupon Code */}
        <div className='flex flex-1 flex-col gap-8'>
          <h4 className='bold-28 capitalize'>Your Coupon code enter here:</h4>
          <div className='flexBetween h-2.8[rem] bg-white text-center ring-1 ring-slate-900/10 w-full max-w-[488px] rounded'>
            <input
              type='text'
              placeholder='Coupon Code'
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className='pl-3 bg-transparent border-none outline-none'
            />
            <button type='button' onClick={handleCouponSubmit} className='btn-dark rounded relative !px-10 !py-3'>
              Submit
            </button>
          </div>
          {discount > 0 && (
            <p className='text-green-500'>
              Coupon applied! {discount}% discount on your total.
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default Orders;
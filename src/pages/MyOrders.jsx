import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { FaBox } from "react-icons/fa";

const MyOrders = () => {
  const { url, token } = useContext(ShopContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      console.log(response.data); // Add this to inspect the response structure
      setData(response.data.data || []); // Ensure data is an array or fallback to an empty array
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <section className='max-padd-container pt-20'>
      <div>
        <h4 className='mb-4 font-semibold text-xl'>My Orders</h4>
        {data.length === 0 ? (
          <p>No orders found.</p> // Display this if no orders are found
        ) : (
          <table className='min-w-full border-collapse'>
            <thead>
              <tr>
                <th className='p-1 text-left hidden sm:table-cell'>Package</th>
                <th className='p-2 text-left'>Title</th>
                <th className='p-2 text-left'>Price</th>
                <th className='p-2 text-left'>Quantity</th>
                <th className='p-2 text-left'>Status</th>
                <th className='p-2 text-left'>Track</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, i) => (
                <tr key={i} className='border-b border-slate-900-20 text-gray-50 p-6 medium-14 text-left'>
                  <td className='p-1 hidden sm:table-cell'><FaBox className='text-2xl text-secondary'/></td>
                  <td>
                    <p>
                      {order.items.map((item, index) => (
                        index === order.items.length - 1
                          ? `${item.name} x ${item.quantity}`
                          : `${item.name} x ${item.quantity}, `
                      ))}
                    </p>
                  </td>
                  <td className='p-2 border'>
                   KSH {order.amount}                     
                  </td>
                  <td className='p-1'>
                    {order.items.length}
                  </td>
                  <td className='p-2 border'>
                    <p className='flexCenter gap-x-2'>
                      <span className='hidden lg:flex'>&#x25cf;</span>
                      <b>{order.status}</b>
                    </p>
                  </td>
                  <td className='p-2 border'>
                    <button onClick={fetchOrders} className='btn-light rounded-sm !py-2'>Track
                      <span className='hidden lg:flex'>Order</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default MyOrders;

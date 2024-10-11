import React, { useContext, useState } from 'react'
import { FaPlus, FaMinus, FaUpRightAndDownLeftFromCenter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Item = ({ product }) => {
  const { cartItems = {}, addToCart, removeFromCart, url } = useContext(ShopContext)
  const [error, setError] = useState(null)

  // Handle potential errors with product
  if (!product || !product._id) {
    return <div className="text-red-500">Product not found.</div>
  }

  // Check how many of this product are in the cart
  const itemCount = cartItems[product._id] || 0

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId)
      setError(null) // Clear any previous error
    } catch (err) {
      setError('Failed to add item to cart. Please try again.')
    }
  }

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId)
      setError(null) // Clear any previous error
    } catch (err) {
      setError('Failed to remove item from cart. Please try again.')
    }
  }

  return (
    <div className='shadow-sm'>
      {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
      <div className='relative group'>
        {/* Product image */}
        <img src={`${url}/images/${product.image}`} alt={product.name} className='rounded-tl-2xl rounded-tr-xl' />
        
        {/* Action buttons (view details and add/remove from cart) */}
        <div className='absolute right-3 bottom-3 flexCenter gap-x-2'>
          {/* Link to product details */}
          <Link to={`/product/${product._id}`} className="bg-white h-8 w-8 p-2 rounded-full shadow-inner cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-500">
            <FaUpRightAndDownLeftFromCenter />
          </Link>

          {/* If itemCount is 0, show only the add button, otherwise show add/remove buttons */}
          {itemCount === 0 ? (
            <FaPlus 
              onClick={() => handleAddToCart(product._id)} 
              className="bg-white h-8 w-8 p-2 rounded-full shadow-inner cursor-pointer" 
            />
          ) : (
            <div className='bg-white rounded-full flexCenter gap-2'>
              {/* Decrement item count */}
              <FaMinus 
                onClick={() => handleRemoveFromCart(product._id)} 
                className="rounded-full h-8 w-8 p-2 cursor-pointer" 
              />
              <p>{itemCount}</p>
              {/* Increment item count */}
              <FaPlus 
                onClick={() => handleAddToCart(product._id)} 
                className="rounded-full bg-secondary h-6 w-6 p-1 mr-1 cursor-pointer" 
              />
            </div>
          )}
        </div>
      </div>

      {/* Product info */}
      <div className='p-3'>
        <div className='flexBetween'>
          <h5 className='text-[16px] font-bold text-gray-900/50'>{product.category}</h5>
          <div className='text-secondary bold-18'>${product.price}</div>
        </div>
        <h4 className='medium-18 mb-1 line-clamp-1'>{product.name}</h4>
        <p className='line-clamp-2'>{product.description}</p>
      </div>
    </div>
  )
}

export default Item

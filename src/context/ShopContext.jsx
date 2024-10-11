import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(""); 
    const [all_products, setAll_products] = useState([]);
    const url = "http://localhost:4000";

    // Add to Cart
    const addToCart = async (itemId) => {
        const updatedCart = { ...cartItems };
    
        // Update local state first
        if (!updatedCart[itemId]) {
            updatedCart[itemId] = 1;
        } else {
            updatedCart[itemId] += 1;
        }
        setCartItems(updatedCart);
    
        // Sync with backend
        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { userId: token, itemId }, { headers: { token } });
                // Optionally: Fetch the updated cart from backend to keep frontend state synced
                const response = await axios.post(url + "/api/cart/get", { userId: token }, { headers: { token } });
                setCartItems(response.data.cartData); // Sync frontend cart state with the backend
            } catch (error) {
                console.error("Error adding item to cart:", error);
            }
        }
    };
    
    const removeFromCart = async (itemId) => {
        const updatedCart = { ...cartItems };
    
        // Update local state first
        if (updatedCart[itemId]) {
            updatedCart[itemId] -= 1;
            if (updatedCart[itemId] === 0) {
                delete updatedCart[itemId]; // Remove item completely if count reaches 0
            }
            setCartItems(updatedCart);
    
            // Sync with backend
            if (token) {
                try {
                    await axios.post(url + "/api/cart/remove", { userId: token, itemId }, { headers: { token } });
                    // Optionally: Fetch the updated cart from backend to keep frontend state synced
                    const response = await axios.post(url + "/api/cart/get", { userId: token }, { headers: { token } });
                    setCartItems(response.data.cartData); // Sync frontend cart state with the backend
                } catch (error) {
                    console.error("Error removing item from cart:", error);
                }
            }
        }
    };
    

    // Calculate total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_products.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // Fetch product list
    const fetchProductList = async () => {
        try {
            const response = await axios.get(url + "/api/product/list");
            setAll_products(response.data.data);
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    };

    // Load cart data when token is available
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                url + "/api/cart/get", 
                {}, 
                { headers: {token}}
            );
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // Effect to load products and cart on component mount
    useEffect(() => {
        async function loadData() {
            await fetchProductList();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        }
        loadData();
    }, []);

    // Context values to be provided to children components
    const contextValue = {
        all_products,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;

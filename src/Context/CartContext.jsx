import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
  
    const { token } = useContext(AuthContext);
    
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [numOfItems, setNumOfItems] = useState(0)
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [cartId, setCartId] = useState(null)
    
    async function addProductToCart(id) {
      try {
          const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
            {
                productId: id,
            }, 
            {
                headers: {
                    token: localStorage.getItem("token"),
                }
            }
        );
        getUserCart();
        return data
      } catch (error) {
        
      }
    }

    async function getUserCart() {
        try {
            setLoading(true)
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setProducts(data.data.products);
            setNumOfItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setLoading(false)
            setCartId(data.data._id)
        }
        catch (error) {
            setLoading(false)
        }
    }

    async function updateCount(id, count) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {
                    count: count
                },
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );
            setProducts(data.data.products);
            setNumOfItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
        } catch (error) {
            
        }
    }

    async function deleteCartItem(id) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );
            setProducts(data.data.products);
            setNumOfItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
        } catch (error) {
            
        }
    }

    async function deleteUserCart() {
      try {
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setProducts([]);
        setNumOfItems(0);
        setTotalCartPrice(0);
      } catch (error) {}
    }

    useEffect(function () {
        if (token) {
            getUserCart();
        }
    }, [token])

    return (
      <CartContext.Provider value={
          {
            addProductToCart,
            products,
            setProducts,
            numOfItems,
            setNumOfItems,
            totalCartPrice,
            setTotalCartPrice,
            loading,
            updateCount,
            deleteCartItem,
            deleteUserCart,
            cartId,
          }
      }>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
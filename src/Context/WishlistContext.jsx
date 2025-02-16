import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from './AuthContext'
import axios from 'axios'


export const WishlistContext = createContext()

const WishlistContextProvider = ({children}) => {
  
  const {token} = useContext(AuthContext)
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false);
  
  async function getWishlist() {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: {
            token: token,
          },
        }
      );
      setLoading(false)
      setWishlist(data.data)
      localStorage.setItem("wishlist", JSON.stringify(data.data))
    } catch (error) {
      
    }
  }

  async function addProductToWishlist(product) {
    try {
      const { data } = axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: product.id,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      let updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      console.log(data);
      
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } catch (error) {
      
    }
  }
  
  async function removeProductFromWishlist(id) {
    try {
      const { data } = axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist${id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      let newWishlist = wishlist.filter((item) => item.id !== id)
      setWishlist(newWishlist)
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    } catch (error) {}
  }

  function isInWishlist(productId) {
    return wishlist.some((item) => item.id == productId);
  }

  useEffect(function () {
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    } else {
      getWishlist();
    }
  }, [])
  
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        loading,
        setLoading,
        getWishlist,
        addProductToWishlist,
        removeProductFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContextProvider
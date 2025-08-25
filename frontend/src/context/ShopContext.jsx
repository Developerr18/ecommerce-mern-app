import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [searchText, setSearchText] = useState("");
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const currency = "$";
  const deliveryFee = 10;

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please Select Product Size!");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  const updateCart = (itemId, size, quantity) => {
    let cartItemsClone = structuredClone(cartItems);
    cartItemsClone[itemId][size] = quantity;
    setCartItems(cartItemsClone);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      for (const size in cartItems[itemId]) {
        totalAmount += product.price * cartItems[itemId][size];
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    deliveryFee,
    searchText,
    setSearchText,
    showSearchbar,
    setShowSearchbar,
    cartItems,
    addToCart,
    getCartCount,
    updateCart,
    getCartAmount,
    navigate,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

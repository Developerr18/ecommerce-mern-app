import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [searchText, setSearchText] = useState("");
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const currency = "$";
  const deliveryFee = 10;

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select product size!");
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
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            totalCount += cartItems[item][size];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalCount;
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
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

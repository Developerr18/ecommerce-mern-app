import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [searchText, setSearchText] = useState("");
  const [showSearchbar, setShowSearchbar] = useState(false);
  const currency = "$";
  const deliveryFee = 10;
  const value = {
    products,
    currency,
    deliveryFee,
    searchText,
    setSearchText,
    showSearchbar,
    setShowSearchbar,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

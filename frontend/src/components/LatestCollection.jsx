import { ShopContext } from "../context/ShopContext";
import React, { useContext } from "react";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  console.log(products);

  return <div>LatestCollection</div>;
};

export default LatestCollection;

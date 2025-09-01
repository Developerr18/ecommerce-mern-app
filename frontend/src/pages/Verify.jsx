import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Verify = () => {
  const { navigate, token, setCartItems, backendURL } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) return null;
      const res = await axios.post(
        `${backendURL}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );
      if (res.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return <div></div>;
};

export default Verify;

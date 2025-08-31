import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";

// placing orders using COD method
const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// placing orders using Stripe method
const placeOrderStripe = (req, res) => {};

// placing order using Razorpay
const placeOrderRazorpay = (req, res) => {};

// all orders data for Admin panel
const allOrders = (req, res) => {};

// user order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await OrderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// update order status from admin panel
const updateStatus = (req, res) => {};

export {
  placeOrderCOD,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};

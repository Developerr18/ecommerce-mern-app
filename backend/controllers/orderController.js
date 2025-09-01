import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from "stripe";

// global variables
const currency = "inr";
const deliveryCharge = 10;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// Verify stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      await UserModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await OrderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// placing order using Razorpay
const placeOrderRazorpay = (req, res) => {};

// all orders data for Admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.json({ success: true, orders });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

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
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await OrderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export {
  placeOrderCOD,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
};

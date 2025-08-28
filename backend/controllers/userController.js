import UserModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

/////////////////////////////////////////////
// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking, is user exists or not
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exists" });
    }

    // compare entered password with db stored password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (isPasswordMatched) {
      const token = createToken(user._id);
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//////////////////////////////////////////////
// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking if user already exists or not
    const isUserExists = await UserModel.findOne({ email });
    if (isUserExists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists!" });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(201).json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

////////////////////////////////////////////
// Route for Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { loginUser, registerUser, adminLogin };

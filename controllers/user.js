import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, address } = req.body;

    if (!fullName || !email || !password || !address) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
        payload: req.body,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        success: false,
        message: "The Email is already registered",
        payload: req.body,
      });
    }

    // hash password code start
    const hashpassword = await bcrypt.hash(password, 10);
    // hash password code end

    const newUser = await User.create({
      fullName,
      email,
      password: hashpassword,
      address,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      payload: req.body, // Include the payload in the response
      createdUser: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        address: newUser.address,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
        // payload: req.body,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        // payload: req.body,
      });
    }

    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
        // payload: req.body,
      });
    }

    const token = user.generateToken();
    res.json({
      success: true,
      message: "User logged in successfully",
      //   payload: req.body, // Include the payload in the response
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

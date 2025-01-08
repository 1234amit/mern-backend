import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateToken = function () {
  const payload = { id: this._id, email: this.email };
  const secretKey = process.env.JWT_SECRET || "amit"; // Replace with your secret key
  const token = jwt.sign(payload, secretKey, { expiresIn: "1m" }); // Token expires in 1 hour
  return token;
};

export const User = mongoose.model("User", userSchema);

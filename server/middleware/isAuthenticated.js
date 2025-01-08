import { User } from "../models/users.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // Use optional chaining to prevent crashes
    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid or expired token" });
        }
        return decoded;
      }
    );

    // const user = await User.findById(decodedToken.id);
    // if (!user) {
    //   return res.status(403).json({ message: "Unauthorized" });
    // }
    req.id = decodedToken.userId; // Attach the user to the request object for further use
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

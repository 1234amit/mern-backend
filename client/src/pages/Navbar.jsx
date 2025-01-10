import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button component

import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import toast from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const [loading, setLoading] = useState(false); // To handle loading state during logout
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken");
  const [fullName, setFullName] = useState("");

  const handleLogout = async () => {
    setLoading(true); // Set loading state during logout process

    try {
      // Make the logout request
      await axios.get("https://basic-todo-application.onrender.com/api/v1/user/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // Remove the auth token from localStorage
      localStorage.removeItem("authToken");

      // navigate("/"); // Or navigate("/");

      toast.success("You have logged out successfully!");
      setTimeout(() => {
        navigate("/"); // Or navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-gray-800">
          MyLogo
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition">
            Home
          </Link>
          <a
            href="#about"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            About
          </a>
          <a
            href="#services"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Contact
          </a>

          {/* Conditional rendering based on authentication */}
          {!isAuthenticated ? (
            <Button>
              <Link to="/">Login</Link>
            </Button>
          ) : (
            <>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          )}
        </div>

        {/* Mobile Menu (Hamburger + Dropdown) */}
      </div>
    </nav>
  );
};

export default Navbar;

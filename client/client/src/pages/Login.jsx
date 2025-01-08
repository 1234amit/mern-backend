import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios"; // Import axios
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if email or password is empty
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive", // Show error variant
      });
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      // Make the API request to the login endpoint
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { token } = response.data; // You can adjust this based on your API response

      localStorage.setItem("authToken", token);

      toast({
        title: "Success",
        description: "You have logged in successfully!",
        variant: "default", // Show success variant
      });

      navigate("/add-todo"); // Use navigate instead of Navigate component
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An error occurred during login.",
        variant: "destructive", // Show error variant
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-sm text-blue-600 hover:underline"
          >
            Don't have an account? Sign up here.
          </Link>
        </div>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

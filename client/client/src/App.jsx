import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";
import Navbar from "./pages/Navbar";
import AddTodo from "./pages/AddTodo";
import Login from "./pages/Login";
import { Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-todo" element={<AddTodo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

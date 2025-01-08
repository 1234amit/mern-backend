import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
// import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodoHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo/todos",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        // Clear the input fields
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error adding Todo:", error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-[250px]">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Add Todo</h1>
      <form>
        {/* Title Field */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title"
            className="w-full"
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description"
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <Button
            type="submit"
            onClick={addTodoHandler}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;

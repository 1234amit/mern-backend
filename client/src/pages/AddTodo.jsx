import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
// import { Toaster } from "@/components/ui/toaster";
// import { toast } from "@/hooks/use-toast";
import { ToastContainer, toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Spinner from "./Spinner";

const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const addTodoHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const res = await axios.post(
        "https://basic-todo-application.onrender.com/api/v1/todo/todos",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // Clear the input fields
        setTodos([...todos, res.data.data]);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error adding Todo:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(
          "https://basic-todo-application.onrender.com/api/v1/todo/todosAll",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          console.log("API Data:", res.data.data); // Log API response
          setTodos(res.data.data);
          console.log(todos);
        }
      } catch (error) {
        console.error("Error fetching Todos:", error.message);
      }
    };
    fetchTodos();
  }, []);

  console.log(todos);

  const todoChunks = chunkArray(todos, 3); // Split todos into chunks of 3

  return (
    <div>
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

      <div className="mt-8">
        {loading && (
          <div className="text-center mb-4">
            <Spinner /> {/* Loader */}
          </div>
        )}

        {todoChunks.length > 0 ? (
          todoChunks.map((chunk, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-between items-start mb-4 gap-4 mr-[40px] ml-[40px]"
            >
              {chunk.map((todo) => (
                <Card key={todo._id} className="w-1/3">
                  <CardHeader>
                    <CardTitle className="font-bold">{todo.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{todo.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No todos found.</p>
        )}
      </div>
    </div>
  );
};

export default AddTodo;

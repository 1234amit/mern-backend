import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const newTodo = new Todo({ title, description });
    await newTodo.save();

    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodosById = async (req, res) => {
  try {
    const todoId = req.params.todoId; // Get the Todo ID from the request parameters
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodos = async (req, res) => {
  try {
    const todoId = req.params.todosId; // Get the Todo ID from the request parameters
    const { title, description } = req.body; // Extract updated fields from the request body

    if (!title && !description) {
      return res.status(400).json({
        success: false,
        message:
          "At least one field (title or description) must be provided for the update",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description },
      { new: true } // Options: return the updated document and validate fields
    );

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    console.error("Error updating Todo:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the Todo",
      error: error.message,
    });
  }
};

export const deleteTodos = async (req, res) => {
  try {
    const todoId = req.params.todoId; // Get the Todo ID from the request parameters
    await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Todo:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the Todo",
      error: error.message,
    });
  }
};

import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodosById,
  updateTodos,
  deleteTodos,
} from "../controllers/todo.js";
import { isAuthenticated } from "./../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/todos").post(isAuthenticated, createTodo);
router.route("/todosAll").get(isAuthenticated, getAllTodos);
router.route("/todosAll/:todoId").get(isAuthenticated, getTodosById);
router.route("/todos/:todosId").put(isAuthenticated, updateTodos);
router.route("/todos/:todoId").delete(isAuthenticated, deleteTodos);

export default router;

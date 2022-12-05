import express from "express";
import {
  addTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from "../contorlers/todoContoler";
import { protect } from "../middleware/auth";
import { validate } from "../middleware/validate";
import {
  addTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from "../zodSchema/schemas";

const router = express.Router();

router.get(`/`, protect, getAllTodo);
router.post(`/`, protect, validate(addTodoSchema), addTodo);
router.put(`/:todoid`, protect, validate(updateTodoSchema), updateTodo);
router.delete(`/:todoid`, protect, validate(deleteTodoSchema), deleteTodo);

export default router;

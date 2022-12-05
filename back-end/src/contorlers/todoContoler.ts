import { Todo, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../config/DB";
import { IUser } from "../middleware/auth";
import {
  deleteTodoParamsType,
  updateTodoParamsType,
} from "../zodSchema/schemas";

export const getAllTodo = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user as IUser;

    const todoList = await prisma.todo.findMany({
      where: {
        user_id: user.id,
      },
    });
    return res.status(200).json(todoList);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error !",
    });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { name } = req.body as Todo;
    const user = res.locals.user as IUser;

    await prisma.todo.create({
      data: {
        name,
        user_id: user.id,
      },
    });

    return res.status(201).json({
      message: "todo added !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error !",
    });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const newTodo = req.body as Todo;
    const { todoid } = req.params as updateTodoParamsType;
    const user = res.locals.user as IUser;

    const isUpdated = await prisma.todo.updateMany({
      where: { id: todoid, user_id: user.id },
      data: newTodo,
    });

    if (isUpdated.count == 0) {
      return res.status(400).json({
        message: "invalid todo ID ",
      });
    }

    return res.status(201).json({
      message: "todo updated " + user.username + " !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error !",
    });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { todoid } = req.params as deleteTodoParamsType;
    const user = res.locals.user as IUser;

    const deleteTodo = await prisma.todo.deleteMany({
      where: {
        id: todoid,
        user_id: user.id,
      },
    });

    if (deleteTodo.count == 0) {
      return res.status(400).json({
        message: "invalid todo ID !",
      });
    }

    return res.status(200).json({
      message: "todo deleted !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error !",
    });
  }
};

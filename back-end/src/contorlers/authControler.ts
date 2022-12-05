import { User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../config/DB";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

export const logIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as User;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(400).json({
        message: "your password or username is inncorrect !",
      });
    }

    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: "your password or username is inncorrect !",
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_KEY as string,
      { expiresIn: "3 days" }
    );

    return res.status(201).json({
      message: `welcome back ${user.username}`,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "error with your input !",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body as User;
    const hashedPassword = await argon2.hash(password);
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });

    return res.status(201).json({
      message: "user added !",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "error with your input !",
    });
  }
};

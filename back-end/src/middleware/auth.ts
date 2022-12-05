import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export interface IUser {
  id: string;
  username: string;
}
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "you are not allow in this page !",
      });
    }

    token = token.split(` `)[1];
    const user = jwt.verify(token, process.env.JWT_KEY as string) as IUser;

    res.locals.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "you are not allow in this page !",
    });
  }
};

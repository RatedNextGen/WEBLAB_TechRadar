import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { MongoUserRepository } from '../repositories/user/mongoUserRepository';

const userService = new UserService(new MongoUserRepository());

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const result = await userService.login(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message || "Authentication failed." });
  }
};

import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import {users} from "../services/user.service";

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = generateToken({ email: user.email, role: user.role });

  res.json({ token });
};

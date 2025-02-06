import { Request, Response } from "express";
import { UserService } from "../services/user/user.service";
import { MongoUserRepository } from '../repositories/user/mongoUserRepository';
import { MongoLoginLogRepository } from '../repositories/loginLog/mongoLoginLogRepository';
import { LoginLogService } from '../services/loginLog/loginLog.service';

const loginService = new LoginLogService(new MongoLoginLogRepository())
const userService = new UserService(new MongoUserRepository(), loginService);

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

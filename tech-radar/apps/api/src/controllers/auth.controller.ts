import { Request, Response } from 'express';
import { UserService } from '../services/user/user.service';
import { MongoUserRepository } from '../repositories/user/mongoUserRepository';
import { MongoLoginLogRepository } from '../repositories/loginLog/mongoLoginLogRepository';
import { LoginLogService } from '../services/loginLog/loginLog.service';

const loginService = new LoginLogService(new MongoLoginLogRepository());
const userService = new UserService(new MongoUserRepository(), loginService);

function getMaxAge() {
  return 3600000;
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const token = await userService.login(email, password);
    res.cookie('techRadar', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: getMaxAge()
    });
    res.json({ message: 'Logged in successfully' });
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Authentication failed.' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('techRadar');
  res.json({ message: 'Logged out successfully' });
};

export const getTokenInfo = async (req: Request, res: Response) => {
  // @ts-ignore
  const { email, role } = req.user;
  res.json({ email, role });
};

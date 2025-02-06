import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../utils/jwt";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // @ts-ignore
    req.user = verifyToken(token); // ⬅️ Speichern der User-Daten im Request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const userRole = req.user?.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied." });
    }
    next();
  };
};

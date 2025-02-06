import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "weblab_secret_key";

export const generateToken = (user: { email: string; role: string }) => {
  return jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token yok" });
  }

  try {
    const decoded = jwt.verify(token, env.jwt_secret);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Geçersiz token" });
  }
};
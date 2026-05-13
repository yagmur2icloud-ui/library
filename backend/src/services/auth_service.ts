import { User } from "../models/user";
import bcrypt from "bcrypt"
import { env } from "../config";
import jwt from "jsonwebtoken"

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Kullanıcı zaten var");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  return user;
};


export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Kullanıcı bulunamadı");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Şifre yanlış");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role, // 🔥 BURASI ÖNEMLİ
    },
    env.jwt_secret,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};


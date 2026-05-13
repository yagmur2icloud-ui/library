import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth_service";
import { Borrow } from "../models/borrow";
import { User } from "../models/user";



export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password){
        res.status(400).json({"msg":"empty"})
    }

    const data = await loginUser(email, password);

    res.status(200).json({
      message: "Giriş başarılı",
      ...data,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
     if (!name ||!email || !password){
        res.status(400).json({"msg":"empty"})
        return
    }
    const data = await registerUser(name,email, password);

    res.status(201).json({
      message: "created",
      
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};



export const getMyProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const activeBorrows = await Borrow.find({
      userId,
      returnDate: null,
    }).populate("bookId");

    const history = await Borrow.find({
      userId,
      returnDate: { $ne: null },
    }).populate("bookId");

    res.json({
      user,
      activeBorrows,
      history,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
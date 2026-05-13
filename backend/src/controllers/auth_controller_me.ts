import { Response } from "express";
import { User } from "../models/user"; 

export const me = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.json({
      valid: true,
      user:{email:user.email,name:user.name,role:user.role},
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
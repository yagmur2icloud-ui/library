import mongoose from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  score:number
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    score:{
      type:Number,
      default:0
    }
    
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
import mongoose from "mongoose";

export type BookStatus = "available" | "BORROWED" 

export interface IBook extends mongoose.Document {
  title: string;
  author: string;
  isbn: string;
  status: BookStatus;
  image:string;
}

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["available", "BORROWED", "NOT_AVAILABLE"],
      default: "available",
    },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Book = mongoose.model<IBook>("Book", bookSchema);
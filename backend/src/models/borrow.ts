import mongoose, { Types } from "mongoose";

export interface IBorrow extends mongoose.Document {
  userId: Types.ObjectId;
  bookId: Types.ObjectId;
  borrowDate: Date;
  returnDate?: Date;
  dueDate: Date;
}

const borrowSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);
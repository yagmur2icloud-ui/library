import { Request, Response } from "express";
import * as borrowService from "../services/borrow";

export const borrow = async (req: any, res: Response) => {
  try {
    const {bookId,email} = req.body;

    const result = await borrowService.borrowBook(bookId, email);

    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const returnBook = async (
  req: Request,
  res: Response
) => {
  try {
    const { bookId, email } = req.body;

    const result = await borrowService.returnBook(
      bookId,
      email
    );

    res.json(result);

  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllOrders = async (req: Request,res: Response) => {
  try {
    const borrows = await borrowService.getAllBorrows();

     res.json(borrows);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};


import { Book } from "../models/book";

export const createBook = async (data: any,image:string) => {
  return await Book.create({
    ...data,
    image,
    status: "available",
  });
};

export const getBooks = async () => {
  return await Book.find();
};

export const getBookById = async (id: string | null) => {
  return await Book.findById(id);
};

export const updateBook = async (id: string, data: any) => {
  return await Book.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBook = async (id: string) => {
  return await Book.findByIdAndDelete(id);
};
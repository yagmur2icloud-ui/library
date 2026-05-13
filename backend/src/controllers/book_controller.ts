import { Request, Response } from "express";
import * as bookService from "../services/book_service";
import { delete_file } from "../utils/file";

export const create = async (req: Request, res: Response) => {
  try {
    let img=req.file?.filename;
    img=img ? `/uploads/${img}` : ""
    const book = await bookService.createBook(req.body,img);
    res.status(201).json(book);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const books = await bookService.getBooks();
  res.json(books);
};

export const getOne = async (req: Request, res: Response) => {
    const id =req.params.id as string
    if (!id) {
        res.status(400).json({"msg":"bad request"})
    }
    const book = await bookService.getBookById(id);

  res.json(book);
};


export const update = async (req: any, res: Response) => {
  try {
    const id = req.params.id;

    const existingBook = await bookService.getBookById(id);
    if (!existingBook) {
      return res.status(404).json({ message: "Kitap bulunamadı" });
    }

    let imagePath = existingBook.image;

    // 🔥 yeni resim geldiyse
    if (req.file) {
      const newImage = `/uploads/${req.file.filename}`;

      delete_file(existingBook.image);

      imagePath = newImage;
    }
    const updatedBook = await bookService.updateBook(id, {
      ...req.body,
      image: imagePath,
    });

    res.json(updatedBook);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const book = await bookService.getBookById(id);

    if (!book) {
      return res.status(404).json({ message: "Kitap bulunamadı" });
    }

    delete_file(book.image);

    await bookService.deleteBook(id);

    res.json({ message: "Kitap ve resmi silindi" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
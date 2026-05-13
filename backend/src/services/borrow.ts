import { Book } from "../models/book";
import { Borrow } from "../models/borrow";
import { User } from "../models/user";

export const borrowBook = async (
  bookId: string,
  email: string
) => {

  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Kitap bulunamadı");
  }

  // ⚠️ status kontrolü
  if (book.status !== "available") {
    throw new Error("Kitap alınamaz");
  }

  // 👤 kullanıcı
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Kullanıcı bulunamadı");
  }

  // 🚫 negatif score engeli
  if (user.score < 0) {
    throw new Error(
      "Negatif puana sahip kullanıcı kitap alamaz"
    );
  }

  // 📚 kitap ödünçte
  book.status = "BORROWED";

  await book.save();

  // 📅 teslim tarihi
  const dueDate = new Date();

  dueDate.setDate(
    dueDate.getDate() + 14
  );

  // 📦 borrow oluştur
  const borrow = await Borrow.create({
    bookId,
    userId: user._id,
    borrowDate: new Date(),
    dueDate,
  });

  return borrow;
};

export const returnBook = async (
  bookId: string,
  email: string
) => {

  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Kitap bulunamadı");
  }
   const user = await User.findOne({email});

  if (!user) {
    throw new Error("Kullanıcı bulunamadı");
  }
  const borrow = await Borrow.findOne({
    bookId,
    userId:user._id,
    returnDate: null,
  });

  if (!borrow) {
    throw new Error("Aktif ödünç kaydı bulunamadı");
  }

 

  const now = new Date();

  // iade tarihi
  borrow.returnDate = now;

  // kitap tekrar available
  book.status = "available";

  // 🔥 score hesaplama
  const dueDate = new Date(borrow.dueDate);

  const diffMs = now.getTime() - dueDate.getTime();

  // kaç gün geç
  const lateDays = Math.ceil(
    diffMs / (1000 * 60 * 60 * 24)
  );

  let scoreChange = 0;

  // zamanında teslim
  if (lateDays <= 0) {
    scoreChange = 1;
  } else {
    // geç teslim
    scoreChange = -lateDays;
  }

  // user score güncelle
  user.score += scoreChange;

  // save işlemleri
  await user.save();
  await book.save();
  await borrow.save();

  return {
    borrow,
    scoreChange,
    currentScore: user.score,
  };
};

export const getAllBorrows = async () => {
  const borrows = await Borrow.find()
    .populate("userId", "name email")
    .populate("bookId", "title author image")
    .sort({ createdAt: -1 });

  return borrows.map((borrow) => {
    const isLate =
      !borrow.returnDate && new Date() > new Date(borrow.dueDate);

    return {
      ...borrow.toObject(),
      isLate,
    };
  });
};
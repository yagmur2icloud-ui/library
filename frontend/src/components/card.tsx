import React from "react";
import type { Book } from "../store/features/book/book_slice";

type Props = {
  book: Book;
};

const Card: React.FC<Props> = ({ book }) => {
  // 🔥 normalize
  const status = book.status.toLowerCase();

  return (
    <div className="w-52 bg-white border rounded-xl p-4 shadow hover:shadow-md transition flex flex-col">
      
      {/* 📸 Image */}
      <div className="h-40 w-full mb-3">
        {book.image ? (
          <img
            src={`http://localhost:3000${book.image}`}
            alt={book.title}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
            Görsel yok
          </div>
        )}
      </div>

      {/* 📚 Info */}
      <h3 className="font-semibold line-clamp-2">
        {book.title}
      </h3>

      <p className="text-sm text-gray-500">
        {book.author}
      </p>

      {/* 📌 Status */}
      <span
        className={`mt-auto inline-block px-2 py-1 text-xs rounded ${
          status === "available"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {status === "available"
          ? "Müsait"
          : "Ödünç Alınmış"}
      </span>

    </div>
  );
};

export default Card;
import { useEffect, useState } from "react";
import api from "../../services/axios";
import { Link } from "react-router";

interface Book {
    _id: string;
    title: string;
    author: string;
    isbn:string;
    status:string;
    image:string;

}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/book/");
        setBooks(res.data);
      } catch (err: any) {
        setError("Kitaplar alınamadı");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 🔥 LOADING
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ❌ ERROR
  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📚 Kitaplar</h1>
      </div>

      {/* EMPTY STATE */}
      {books.length === 0 ? (
        <p className="text-gray-500 text-center">
          Henüz kitap yok.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {books.map((book) => (
    <div
      key={book._id}
      className="border rounded-xl p-4 hover:shadow-md transition hover:-translate-y-1"
    >
      {/* IMAGE */}
      <img
        src={`http://localhost:3000${book.image}`}
        alt={book.title}
        className="h-40 w-full object-cover rounded mb-3"
      />

      <h3 className="font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-500">{book.author}</p>

      <p className="text-xs text-gray-400 mt-1">
        ISBN: {book.isbn}
      </p>

      <span
        className={`inline-block mt-2 text-xs px-2 py-1 rounded
          ${
            book.status === "available"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-500"
          }`}
      >
        {book.status === "available"
          ? "Müsait"
          : "Ödünç Alınmış"}
      </span>

      <Link to={`/book/${book._id}`} className="block mt-3 text-blue-500 text-sm hover:underline cursor-pointer">
        Detay Gör
      </Link>
    </div>
  ))}
</div>
      )}
    </div>
  );
};

export default Books;
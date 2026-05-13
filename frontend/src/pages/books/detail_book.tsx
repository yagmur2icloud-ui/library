import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/app_hook";
import {
  getOneBook,
  clearSelectedBook,
} from "../../store/features/book/book_slice";

const BookDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { selectedBook, isLoading } = useAppSelector(
    (state) => state.book_slice
  );

  // 🔥 FETCH BOOK
  useEffect(() => {
    if (id) {
      dispatch(getOneBook(id));
    }

    return () => {
      dispatch(clearSelectedBook());
    };
  }, [id]);

  // 🔄 LOADING
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ❌ NOT FOUND
  if (!selectedBook) {
    return (
      <div className="text-center py-20 text-gray-500">
        Kitap bulunamadı
      </div>
    );
  }

  const status = selectedBook.status?.toLowerCase();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      
      {/* IMAGE */}
      <div className="w-full h-100 bg-gray-100 rounded-xl overflow-hidden">
        {selectedBook.image ? (
          <img
            src={`http://localhost:3000${selectedBook.image}`}
            className="w-full h-full object-cover"
            alt={selectedBook.title}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Görsel yok
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          {selectedBook.title}
        </h1>

        <p className="text-gray-600 text-lg">
          {selectedBook.author}
        </p>

        <p className="text-sm text-gray-500">
          ISBN: {selectedBook.isbn}
        </p>

        {/* STATUS */}
        <span
          className={`inline-block px-3 py-1 text-sm rounded ${
            status === "available"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status === "available" ? "Müsait" : "Ödünç Alınmış"}
        </span>

        {/* EXTRA INFO */}
        <div className="text-sm text-gray-500 space-y-1">
          <p>Oluşturulma: {new Date(selectedBook.createdAt).toLocaleString("tr-TR")}</p>
          <p>Güncellenme: {new Date(selectedBook.updatedAt).toLocaleString("tr-TR")}</p>
        </div>

      </div>
    </div>
  );
};

export default BookDetail;
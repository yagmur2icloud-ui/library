import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../store/app_hook";

import {
  getBooks,
  deleteBook,
} from "../../../store/features/book/book_slice";

const AdminBook = () => {
  const dispatch = useAppDispatch();

  const { books, isLoading, error } = useAppSelector(
    (state) => state.book_slice
  );
   const [search, setSearch] = useState("");

  // 🔥 DATE FORMAT
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 🔥 FETCH
  useEffect(() => {
    dispatch(getBooks());
  }, []);

  // 🔥 DELETE
  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Bu kitabı silmek istediğinize emin misiniz?"
    );

    if (confirmDelete) {
      dispatch(deleteBook(id));
    }
  };

  // 🔄 LOADING
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
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }
 // 🔎 FILTER LOGIC
  const filteredBooks = books.filter((book) => {
    const q = search.toLowerCase();

    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.isbn.toLowerCase().includes(q)
    );
  });
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold">
            Kitap Yönetimi
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Toplam kitap: {books.length}
          </p>
        </div>
        {/* 🔎 SEARCH */}
        <input
          type="text"
          placeholder="Kitap, yazar veya ISBN ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-xl w-full md:w-72 outline-none focus:ring-2 focus:ring-blue-300"
        />
        <Link
          to="/admin/add-book"
          className="bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm hover:bg-blue-600 transition"
        >
          + Kitap Ekle
        </Link>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Kapak</th>
              <th className="p-4">Başlık</th>
              <th className="p-4">Yazar</th>
              <th className="p-4">ISBN</th>
              <th className="p-4">Durum</th>
              <th className="p-4">Oluşturulma</th>
              <th className="p-4">Güncellenme</th>
              <th className="p-4 text-right">
                İşlemler
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.map((book) => (
              <tr
                key={book._id}
                className="border-t hover:bg-gray-50 transition"
              >

                {/* IMAGE */}
                <td className="p-4">
                  <img
                    src={`http://localhost:3000${book.image}`}
                    alt={book.title}
                    className="w-14 h-20 object-cover rounded-lg shadow-sm"
                  />
                </td>

                {/* TITLE */}
                <td className="p-4 font-medium">
                  {book.title}
                </td>

                {/* AUTHOR */}
                <td className="p-4 text-gray-600">
                  {book.author}
                </td>

                {/* ISBN */}
                <td className="p-4">
                  {book.isbn}
                </td>

                {/* STATUS */}
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      book.status.toLowerCase() ===
                      "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {book.status.toLowerCase() ===
                    "available"
                      ? "Müsait"
                      : "Ödünçte"}
                  </span>
                </td>

                {/* CREATED */}
                <td className="p-4 text-gray-500">
                  {book.createdAt
                    ? formatDate(book.createdAt)
                    : "-"}
                </td>

                {/* UPDATED */}
                <td className="p-4 text-gray-500">
                  {book.updatedAt
                    ? formatDate(book.updatedAt)
                    : "-"}
                </td>

                {/* ACTIONS */}
                <td className="p-4">

                  <div className="flex items-center justify-end gap-2">

                    <Link
                      to={`/admin/borrow/${book._id}`}
                      className="px-3 py-2 rounded-lg border hover:bg-gray-100 transition text-sm"
                    >
                      Sipariş
                    </Link>

                    <Link
                      to={`/admin/edit-book/${book._id}`}
                      className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition text-sm"
                    >
                      Düzenle
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(book._id)
                      }
                      className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition text-sm"
                    >
                      Sil
                    </button>

                  </div>

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default AdminBook;
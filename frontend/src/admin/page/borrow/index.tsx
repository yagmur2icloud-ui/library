import { useEffect, useMemo, useState } from "react";
import { getBorrows } from "../../../store/features/borrow/borrow_slice"; 
import { useAppDispatch, useAppSelector } from "../../../store/app_hook";
import { Link } from "react-router";

const AdminBorrow = () => {
  const dispatch = useAppDispatch();

  const { borrows, isLoading, error } = useAppSelector (
    (state) => state.borrow_slice
  );

  // 🔥 FILTER
  const [filter, setFilter] = useState<
    "all" | "active" | "late" | "returned" | "soon"
  >("all");

  useEffect(() => {
    dispatch(getBorrows());
  }, []);

  // 🔹 DATE FORMAT
  const formatDate = (date: string | null) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // 🔹 LATE DAYS
  const getLateDays = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);

    const diff = now.getTime() - due.getTime();

    const days = Math.floor(
      diff / (1000 * 60 * 60 * 24)
    );

    return days > 0 ? days : 0;
  };

  // 🔹 DAYS LEFT
  const getDaysLeft = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);

    const diff = due.getTime() - now.getTime();

    return Math.ceil(
      diff / (1000 * 60 * 60 * 24)
    );
  };

  // 🔥 FILTERED BORROWS
  const filteredBorrows = useMemo(() => {
    switch (filter) {

      // 📚 devam ediyor
      case "active":
        return borrows.filter(
          (b) => !b.returnDate && !b.isLate
        );

      // 🔴 gecikmiş
      case "late":
        return borrows.filter(
          (b) => b.isLate && !b.returnDate
        );

      // ✅ teslim edilmiş
      case "returned":
        return borrows.filter(
          (b) => b.returnDate
        );

      // ⏰ yaklaşan teslim
      case "soon":
        return borrows.filter((b) => {
          const left = getDaysLeft(b.dueDate);

          return (
            !b.returnDate &&
            left <= 3 &&
            left >= 0
          );
        });

      default:
        return borrows;
    }
  }, [borrows, filter]);

  // 🔄 loading
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ❌ error
  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <h1 className="text-2xl font-bold">
          Ödünç Kitaplar
        </h1>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-2">

          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              filter === "all"
                 ? "bg-yellow-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Tümü
          </button>

          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              filter === "active"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Devam Ediyor
          </button>

          <button
            onClick={() => setFilter("soon")}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              filter === "soon"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Teslim Yaklaşan
          </button>

          <button
            onClick={() => setFilter("late")}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              filter === "late"
                ? "bg-red-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Gecikmiş
          </button>

          <button
            onClick={() => setFilter("returned")}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              filter === "returned"
                ? "bg-green-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Teslim Edilmiş
          </button>

        </div>
      </div>

      {/* INFO */}
      <div className="text-sm text-gray-500">
        Toplam kayıt: {filteredBorrows.length}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Kitap</th>
              <th className="p-4">Kullanıcı</th>
              <th className="p-4">Alınma</th>
              <th className="p-4">Teslim</th>
              <th className="p-4">İade</th>
              <th className="p-4">Durum</th>
            </tr>
          </thead>

          <tbody>
            {filteredBorrows.map((borrow) => (
              <tr
                key={borrow._id}
                className="border-t hover:bg-gray-50 transition"
              >

                {/* BOOK */}
                <td className="p-4">
                  <div className="flex items-center gap-3">

                    <img
                      src={`http://localhost:3000${borrow.bookId.image}`}
                      alt={borrow.bookId.title}
                      className="w-14 h-20 rounded object-cover"
                    />

                    <div>
                      <p className="font-semibold">
                        {borrow.bookId.title}
                      </p>

                      <p className="text-xs text-gray-500">
                        {borrow.bookId.author}
                      </p>
                    </div>

                  </div>
                </td>
                <td className="p-4">
                  <p className="font-medium">
                    {borrow.userId.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {borrow.userId.email}
                  </p>
                </td>

                {/* BORROW DATE */}
                <td className="p-4">
                  {formatDate(borrow.borrowDate)}
                </td>

                {/* DUE DATE */}
                <td className="p-4">
                  {formatDate(borrow.dueDate)}
                </td>

                {/* RETURN DATE */}
                <td className="p-4">
                  {formatDate(borrow.returnDate)}
                </td>

                {/* STATUS */}
                <td className="p-4">

                  {borrow.returnDate ? (
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      Teslim Edildi
                    </span>
                  ) : borrow.isLate ? (
                    <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">
                      Gecikmiş ({getLateDays(borrow.dueDate)} gün)
                    </span>
                  ) : getDaysLeft(borrow.dueDate) <= 3 ? (
                    <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">
                      {getDaysLeft(borrow.dueDate)} gün kaldı
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                        Devam Ediyor
                      </span>

                      <Link
                        to={`/admin//borrow-delivery/${borrow.bookId._id}`}
                        className="text-xs bg-black text-white px-3 py-1 rounded-full hover:opacity-90 transition"
                      >
                        Teslim Al
                      </Link>

                    </div>
                  )}

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default AdminBorrow;
import { useEffect } from "react";

import {
  getProfile,
} from "../../store/features/profile/profile_slice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../store/app_hook";

const ProfilePage = () => {
  const dispatch = useAppDispatch();

  const {
    profile,
    activeBorrows,
    history,
    isLoading,
    error,
  } = useAppSelector(
    (state) => state.profile_slice
  );

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  // 🔹 DATE FORMAT
  const formatDate = (date?: string | null) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "tr-TR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  // 🔄 LOADING
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-7 h-7 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* 🔹 PROFILE CARD */}
      <div className="bg-white rounded-3xl shadow p-6">

        <div className="flex flex-col md:flex-row md:items-center gap-6">

          {/* AVATAR */}
          <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold">
            {profile?.name?.charAt(0).toUpperCase()}
          </div>

          {/* INFO */}
          <div className="flex-1">

            <h1 className="text-3xl font-bold">
              {profile?.name}
            </h1>

            <p className="text-gray-500 mt-1">
              {profile?.email}
            </p>

            <div className="flex flex-wrap gap-3 mt-4">

              <span className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full">
                Rol: {profile?.role}
              </span>

              <span
                className={`text-sm px-4 py-2 rounded-full ${
                  (profile?.score || 0) > 0
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                Puanı:{" "}
                {profile?.score || 0}
              </span>

              <span className="bg-blue-100 text-blue-600 text-sm px-4 py-2 rounded-full">
                Aktif Kitap:{" "}
                {activeBorrows.length}
              </span>

            </div>
          </div>

        </div>
      </div>

      {/* 🔥 ACTIVE BORROWS */}
      <div className="space-y-5">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Aktif Ödünçler
          </h2>

          <span className="text-sm text-gray-500">
            {activeBorrows.length} kitap
          </span>

        </div>

        {activeBorrows.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
            Aktif ödünç alınmış kitap yok
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {activeBorrows.map((borrow) => (
              <div
                key={borrow._id}
                className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition"
              >

                {/* IMAGE */}
                <img
                  src={`http://localhost:3000${borrow.bookId.image}`}
                  alt={borrow.bookId.title}
                  className="w-full h-72 object-cover"
                />

                {/* CONTENT */}
                <div className="p-5 space-y-3">

                  <div>
                    <h3 className="font-bold text-lg line-clamp-1">
                      {borrow.bookId.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {borrow.bookId.author}
                    </p>
                  </div>

                  <div className="space-y-1 text-sm">

                    <p>
                      <span className="font-medium">
                        Alınma:
                      </span>{" "}
                      {formatDate(
                        borrow.borrowDate
                      )}
                    </p>

                    <p>
                      <span className="font-medium">
                        Teslim:
                      </span>{" "}
                      {formatDate(
                        borrow.dueDate
                      )}
                    </p>

                  </div>

                  <div>
                    <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                      Devam Ediyor
                    </span>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>

      {/* 🔥 HISTORY */}
      <div className="space-y-5">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Kitap Geçmişi
          </h2>

          <span className="text-sm text-gray-500">
            {history.length} kayıt
          </span>

        </div>

        {history.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
            Geçmiş kayıt bulunamadı
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-4">
                    Kitap
                  </th>

                  <th className="p-4">
                    Alınma
                  </th>

                  <th className="p-4">
                    Teslim Tarihi
                  </th>

                  <th className="p-4">
                    İade Tarihi
                  </th>

                  <th className="p-4">
                    Durum
                  </th>
                </tr>
              </thead>

              <tbody>
                {history.map((borrow) => (
                  <tr
                    key={borrow._id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    {/* BOOK */}
                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={`http://localhost:3000${borrow.bookId.image}`}
                          alt={
                            borrow.bookId.title
                          }
                          className="w-14 h-20 object-cover rounded-lg"
                        />

                        <div>

                          <p className="font-semibold">
                            {
                              borrow.bookId.title
                            }
                          </p>

                          <p className="text-xs text-gray-500">
                            {
                              borrow.bookId.author
                            }
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* BORROW DATE */}
                    <td className="p-4">
                      {formatDate(
                        borrow.borrowDate
                      )}
                    </td>

                    {/* DUE DATE */}
                    <td className="p-4">
                      {formatDate(
                        borrow.dueDate
                      )}
                    </td>

                    {/* RETURN DATE */}
                    <td className="p-4">
                      {formatDate(
                        borrow.returnDate
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">

                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                        Teslim Edildi
                      </span>

                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;
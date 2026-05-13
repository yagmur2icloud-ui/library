import { useEffect, useState } from "react";
import api from "../../../services/axios";

interface Stats {
  totalBooks: number;
  totalUsers: number;
  borrowedBooks: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalBooks: 0,
    totalUsers: 0,
    borrowedBooks: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* TITLE */}
      <h1 className="text-2xl font-bold text-gray-800">
        Anasayfa
      </h1>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Toplam Kitap</h2>
          <p className="text-2xl font-bold text-blue-500 mt-2">
            {stats.totalBooks}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Toplam Kullanıcı</h2>
          <p className="text-2xl font-bold text-green-500 mt-2">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">
            Ödünç Alınan Kitaplar
          </h2>
          <p className="text-2xl font-bold text-red-500 mt-2">
            {stats.borrowedBooks}
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Hızlı İşlemler
        </h2>

        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Kitap Ekle
          </button>

          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
            Kullanıcıları Gör
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
import { useState } from "react";

interface Announcement {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
}

const initialData: Announcement[] = [
  {
    id: 1,
    title: "Yeni Kitaplar Eklendi 📚",
    message: "Kütüphaneye 50 yeni kitap eklendi.",
    type: "info",
  },
  {
    id: 2,
    title: "Bakım Duyurusu ⚙️",
    message: "Sistem gece 02:00'de kısa süreli kapalı olacak.",
    type: "warning",
  },
  {
    id: 3,
    title: "Hoş Geldin 🎉",
    message: "Yeni kullanıcılar için özel öneriler hazır.",
    type: "success",
  },
];

const typeStyles = {
  info: "bg-blue-50 border-blue-400 text-blue-700",
  success: "bg-green-50 border-green-400 text-green-700",
  warning: "bg-yellow-50 border-yellow-400 text-yellow-700",
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(initialData);

  const removeItem = (id: number) => {
    setAnnouncements((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">📢 Duyurular</h2>

      {announcements.length === 0 && (
        <p className="text-gray-500 text-sm">Şu an duyuru yok.</p>
      )}

      {announcements.map((item) => (
        <div
          key={item.id}
          className={`border-l-4 p-4 rounded-md flex justify-between items-start ${typeStyles[item.type]}`}
        >
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm">{item.message}</p>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-sm opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
import { useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch } from "../../../store/app_hook";
import { borrowBook } from "../../../store/features/borrow/borrow_slice";

const Order = () => {

  const dispatch = useAppDispatch();

  // 📚 book id
  const { id } = useParams();

  // 👤 user email
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    if (!id || !email) {
      alert("Tüm alanları doldurun");
      return;
    }

    try {

      setLoading(true);

      await dispatch(
        borrowBook({
          bookId: id,
          email,
        })
      ).unwrap();

      alert("Kitap başarıyla ödünç verildi");

      setEmail("");

    } catch (error: any) {

      alert(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow p-6">

      <h1 className="text-2xl font-bold mb-6">
        Kitap Teslim Et
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* EMAIL */}
        <div>

          <label className="block text-sm mb-1">
            Kullanıcı Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="ornek@mail.com"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring"
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          {loading
            ? "İşleniyor..."
            : "Kitabı Ver"}
        </button>

      </form>
    </div>
  );
};

export default Order;
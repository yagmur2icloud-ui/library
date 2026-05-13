import { useState } from "react";
import { useAppDispatch } from "../../../store/app_hook"; 
import { returnBook } from "../../../store/features/borrow/borrow_slice"; 
import { useParams } from "react-router";

const Delivery = () => {

  const dispatch = useAppDispatch();
  const {id}=useParams();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  console.log(id)

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
        returnBook({
          bookId:id,
          email,
        })
      ).unwrap();

      alert("Kitap teslim edildi");

      setEmail("");

    } catch (error: any) {

      alert(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow rounded-2xl p-6">

      <h1 className="text-2xl font-bold mb-6">
        Kitap Teslim
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        

        {/* 👤 Email */}
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
            placeholder="Kullanıcı email girin"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring"
          />
        </div>

        {/* 🚀 Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          {loading
            ? "Teslim ediliyor..."
            : "Teslim Et"}
        </button>

      </form>
    </div>
  );
};

export default Delivery;
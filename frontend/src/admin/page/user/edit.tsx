import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../store/app_hook";
import { updateUserRole } from "../../../store/features/user/user_slice";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { users, isLoading } = useAppSelector(
    (state) => state.user_slice
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
  });

  // 🔥 user bul
  useEffect(() => {
    const user = users.find((u) => u._id === id);

    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [users, id]);

  // 🔹 change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        

      // redux role update sync
      dispatch(updateUserRole({ id: id!, role: form.role }));

      navigate("/admin/users");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
      
      <h1 className="text-xl font-bold">Kullanıcı Düzenle</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NAME */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        {/* ROLE */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded text-white ${
            isLoading
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Güncelle
        </button>

      </form>
    </div>
  );
};

export default EditUser;
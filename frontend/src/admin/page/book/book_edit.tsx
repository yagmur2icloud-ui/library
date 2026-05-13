import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../store/app_hook";
import { updateBook } from "../../../store/features/book/book_slice";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { books, isLoading } = useAppSelector(
    (state) => state.book_slice
  );

  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    status: "available",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  // 🔥 mevcut kitabı bul
  useEffect(() => {
    const book = books.find((b) => b._id === id);

    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        status: book.status,
      });

      setPreview(`http://localhost:3000${book.image}`);
    }
  }, [books, id]);

  // 🔹 input değişim
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 image değişim
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔹 submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("isbn", form.isbn);
    formData.append("status", form.status);
    if (image) {
      formData.append("image", image);
    }

    const result = await dispatch(
      updateBook({ id: id!, data: formData })
    );

    if (updateBook.fulfilled.match(result)) {
      navigate("/admin/book");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
      
      <h1 className="text-xl font-bold">Kitap Güncelle</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Kitap ismi..."
          className="w-full border px-3 py-2 rounded"
        />

        {/* AUTHOR */}
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Yazar..."
          className="w-full border px-3 py-2 rounded"
        />

        {/* ISBN */}
        <input
          type="text"
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="ISBN..."
          className="w-full border px-3 py-2 rounded"
        />

        {/* STATUS */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="available">Müsait</option>
          <option value="borrowed">Ödünç</option>
        </select>

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full"
        />

        {/* PREVIEW */}
        {preview && (
          <img
            src={preview}
            className="w-32 h-40 object-cover rounded"
          />
        )}

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
          {isLoading ? "Güncelleniyor..." : "Güncelle"}
        </button>

      </form>
    </div>
  );
};

export default EditBook;
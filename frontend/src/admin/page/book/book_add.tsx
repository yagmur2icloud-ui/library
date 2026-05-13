import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/app_hook";
import { createBook } from "../../../store/features/book/book_slice"; 
import { useNavigate } from "react-router";

const AddBook = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useAppSelector(
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

  // 🔹 input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 image change
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔹 submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Lütfen bir resim seçin");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("isbn", form.isbn);
    formData.append("status", form.status);
    formData.append("image", image);

    const result = await dispatch(createBook(formData));

    if (createBook.fulfilled.match(result)) {
      navigate("/admin/book");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
      
      <h1 className="text-xl font-bold">Yeni Kitap Ekle</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Kitap adı"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="author"
          placeholder="Yazar"
          value={form.author}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
    
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full cursor-pointer"
        />
        {preview && (
          <img
            src={preview}
            className="w-32 h-40 object-cover rounded"
          />
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded text-white
            ${
              isLoading
                ? "bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {isLoading ? "Ekleniyor..." : "Kitap Ekle"}
        </button>

      </form>
    </div>
  );
};

export default AddBook;
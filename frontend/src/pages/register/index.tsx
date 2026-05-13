import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import {
  useAppDispatch,
  useAppSelector,
} from "../../store/app_hook";

import {
  getMe,
  register_thunk,
} from "../../store/features/auth/auth_slice";

import Loading from "../../components/loading";

const Register = () => {
  const [success, setSuccess] =
    useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    isLoading,
    error,
    user,
  } = useAppSelector(
    (state) => state.auth_slice
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔥 auth kontrol
  useEffect(() => {
    dispatch(getMe());
  }, []);

  // 🔥 user varsa yönlendir
  useEffect(() => {
    if (!isLoading && user) {
      navigate("/");
    }
  }, [user, isLoading]);

  // 🔥 input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // 🔥 submit
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const result =
      await dispatch(
        register_thunk(form)
      );

    if (
      register_thunk.fulfilled.match(
        result
      )
    ) {
      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  // 🔄 loading
  if (isLoading && !success) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">

        {/* TITLE */}
        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold">
            Kayıt Ol
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Yeni hesap oluştur
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 p-3 rounded-xl">
            {typeof error ===
            "string"
              ? error
              : "Bir hata oluştu"}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mb-4 text-sm text-green-600 bg-green-50 p-3 rounded-xl">
            Kayıt başarılı,
            giriş sayfasına
            yönlendiriliyorsunuz...
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NAME */}
          <div>
            <label className="block text-sm mb-2">
              İsim
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={
                handleChange
              }
              required
              placeholder="Adınız"
              className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={
                handleChange
              }
              required
              placeholder="ornek@mail.com"
              className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-2">
              Şifre
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={
                handleChange
              }
              required
              placeholder="••••••••"
              className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white font-medium transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading
              ? "Kayıt yapılıyor..."
              : "Kayıt Ol"}
          </button>

        </form>

        {/* LOGIN */}
        <div className="mt-6 text-center text-sm text-gray-500">

          Zaten hesabın var mı?{" "}

          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Giriş yap
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Register;
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import {
  useAppDispatch,
  useAppSelector,
} from "../../store/app_hook";

import {
  getMe,
  login,
} from "../../store/features/auth/auth_slice";

import Loading from "../../components/loading";

const Login = () => {
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
      await dispatch(login(form));

    if (
      login.fulfilled.match(result)
    ) {
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
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
            Giriş Yap
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Hesabınıza giriş yapın
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
            Giriş başarılı,
            yönlendiriliyorsunuz...
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

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
              ? "Giriş yapılıyor..."
              : "Giriş Yap"}
          </button>

        </form>

        {/* REGISTER */}
        <div className="mt-6 text-center text-sm text-gray-500">

          Hesabın yok mu?{" "}

          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Kayıt ol
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;
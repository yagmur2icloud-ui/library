import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store/app_hook";

import { logout } from "../../store/features/auth/auth_slice";

const AdminHeader = () => {
  const dispatch = useAppDispatch();

  const { user, isLoading } = useAppSelector(
    (state) => state.auth_slice
  );

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(
    null
  );

  useEffect(() => {


}, [user, isLoading, navigate]);

  // 🔥 OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (
      e: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // 🔥 LOGOUT
  const handleLogout = () => {
    dispatch(logout());

    setOpen(false);

    navigate("/login");
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <header className="bg-gray-900 text-white border-b px-6 py-3 flex justify-between items-center">

      {/* LEFT */}
      <div className="text-sm text-gray-300">
        Admin Panel
      </div>

      {/* RIGHT */}
      <div
        className="relative"
        ref={menuRef}
      >

        {/* USER BUTTON */}
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="flex items-center gap-3 hover:bg-gray-800 px-3 py-2 rounded-xl transition"
        >

          <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-semibold">
            {user.name
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium">
              {user.name}
            </p>

            <p className="text-xs text-gray-400">
              {user.email}
            </p>
          </div>

          <svg
            className={`w-4 h-4 transition ${
              open
                ? "rotate-180"
                : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>

        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-2 w-52 bg-white text-black rounded-2xl shadow-xl border overflow-hidden z-50">

            <div className="px-4 py-3 border-b">
              <p className="font-semibold text-sm">
                {user.name}
              </p>

              <p className="text-xs text-gray-500">
                {user.email}
              </p>
            </div>
            <Link to={"/"} className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 hover:text-red-600 transition block">
              Anasayfaya dön
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 hover:text-red-600 transition"
            >
              Çıkış Yap
            </button>

          </div>
        )}

      </div>
    </header>
  );
};

export default AdminHeader;
import { useEffect, useRef, useState, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import menu from "../route/menu";
import { useAppSelector, useAppDispatch } from "../store/app_hook";
import { logout } from "../store/features/auth/auth_slice";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth_slice);
  const { books } = useAppSelector((state) => state.book_slice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔥 debounce
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => clearTimeout(t);
  }, [search]);

  // 🔥 filtre
  const filteredBooks = useMemo(() => {
    if (!debouncedSearch.trim()) return [];

    const q = debouncedSearch.toLowerCase();

    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.isbn?.toLowerCase().includes(q)
    );
  }, [debouncedSearch, books]);

  // 🔥 outside click dropdown
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/login");
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-6 py-4">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          📚 Kütüphane
        </Link>

        {/* MENU */}
        <nav className="hidden md:flex gap-6 items-center font-semibold text-lg">
          {menu.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                isActive ? "text-fourth" : "hover:text-third"
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* SEARCH */}
        <div className="hidden md:block flex-1 max-w-xs mx-4 relative">
          <input
            type="text"
            placeholder="Kitap ara..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            className="w-full bg-third px-3 py-2 rounded-xl outline-none focus:bg-fourth text-black"
          />

          {/* RESULTS */}
          {showResults && debouncedSearch && (
            <div className="absolute left-0 right-0 mt-2 bg-white text-black rounded-xl shadow-lg max-h-72 overflow-y-auto z-50">

              {filteredBooks.slice(0, 8).map((book) => (
                <Link
                  key={book._id}
                  to={`/book/${book._id}`}
                  onClick={() => {
                    setSearch("");
                    setShowResults(false);
                  }}
                  className="flex gap-3 px-3 py-2 hover:bg-gray-100"
                >
                  <img
                    src={`http://localhost:3000${book.image}`}
                    className="w-10 h-14 object-cover rounded"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      {book.title}
                    </p>

                    <p className="text-xs text-gray-500">
                      {book.author}
                    </p>
                  </div>
                </Link>
              ))}

              {filteredBooks.length === 0 && (
                <div className="p-3 text-sm text-gray-500">
                  Sonuç bulunamadı
                </div>
              )}

            </div>
          )}
        </div>

        {/* AUTH */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>

              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <span>{user.name}</span>
              </div>

              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-zinc-700 rounded-xl shadow-lg py-2 z-50">

                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 hover:bg-zinc-600"
                    >
                      Yönetim
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-zinc-600"
                  >
                    Profil
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-zinc-600"
                  >
                    Çıkış
                  </button>

                </div>
              )}

            </div>
          ) : (
            <Link
              to="/login"
              className="bg-button px-4 py-1.5 rounded-md"
            >
              Giriş Yap
            </Link>
          )}
        </div>

        {/* MOBILE BTN */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Navbar;
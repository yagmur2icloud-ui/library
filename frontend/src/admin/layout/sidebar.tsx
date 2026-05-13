import { NavLink } from "react-router";

const menu = [
  { name: "Anasayfa", path: "/admin/" },
  { name: "Kitaplar", path: "/admin/book" },
  { name: "Kullanıcılar", path: "/admin/user" },
  { name: "Siparişler", path: "/admin/borrow" },
];

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5">
      
      <h2 className="text-xl font-bold mb-8">📚 Admin</h2>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <NavLink
  key={item.name}
  to={item.path}
  end={item.path === "/admin/"}   // 🔥 kritik fix
  className={({ isActive }) =>
    `px-3 py-2 rounded-md text-sm transition ${
      isActive ? "bg-indigo-500" : "hover:bg-gray-800"
    }`
  }
>
  {item.name}
</NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
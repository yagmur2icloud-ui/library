import { useEffect } from "react";
import {
  Outlet,
  Navigate,
} from "react-router";

import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

import {
  useAppDispatch,
  useAppSelector,
} from "../../store/app_hook";

import { getMe } from "../../store/features/auth/auth_slice";

const AdminLayout = () => {
  const dispatch = useAppDispatch();

  const { user, isLoading } =
    useAppSelector(
      (state) => state.auth_slice
    );

  useEffect(() => {
    dispatch(getMe());
  }, []);

  // 🔄 loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-7 h-7 border-2 border-gray-300 border-t-black rounded-full animate-spin"> yükleniyor</div>
      </div>
    );
  }

  // ❌ user yok
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ❌ admin değil
  if (user.role !== "admin") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* RIGHT */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <AdminHeader />

        {/* CONTENT */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
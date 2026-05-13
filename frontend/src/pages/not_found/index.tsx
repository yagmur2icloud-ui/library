import React from "react";
import { Link } from "react-router";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      
      <div className="text-center space-y-6">
        
        {/* 404 */}
        <h1 className="text-6xl font-bold text-gray-800">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-700">
          Sayfa Bulunamadı
        </h2>

        {/* Description */}
        <p className="text-gray-500 max-w-md mx-auto">
          Aradığınız sayfa silinmiş olabilir, adı değişmiş olabilir
          ya da hiç var olmamış olabilir.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          
          <Link
            to="/"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Ana Sayfaya Dön
          </Link>

          <Link
            to="/book"
            className="border px-5 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Kitaplara Git
          </Link>

        </div>

      </div>
    </div>
  );
};

export default NotFound;
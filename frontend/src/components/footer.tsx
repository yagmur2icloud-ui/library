const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        
        {/* Logo / About */}
        <div>
          <h2 className="text-white text-lg font-bold mb-3">
            📚 LibraryApp
          </h2>
          <p className="text-sm">
            Kitapları keşfet, favorilerine ekle ve kendi kütüphaneni oluştur.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Sayfalar</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">Ana Sayfa</a>
            </li>
            <li>
              <a href="/books" className="hover:text-white">Kitaplar</a>
            </li>
            <li>
              <a href="/login" className="hover:text-white">Giriş</a>
            </li>
          </ul>
        </div>

        {/* Categories (dummy) */}
        <div>
          <h3 className="text-white font-semibold mb-3">Kategoriler</h3>
          <ul className="space-y-2 text-sm">
            <li>Roman</li>
            <li>Bilim</li>
            <li>Tarih</li>
            <li>Felsefe</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">İletişim</h3>
          <ul className="space-y-2 text-sm">
            <li>📧 info@libraryapp.com</li>
            <li>📍 Türkiye</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} LibraryApp. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
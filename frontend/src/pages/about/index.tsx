const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">

      {/* HEADER */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">
          Hakkımızda
        </h1>

        <p className="text-gray-500">
          Kitapları daha erişilebilir ve düzenli bir şekilde yönetmek için geliştirilmiş modern kütüphane sistemi.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* TEXT */}
        <div className="space-y-5 text-gray-700 leading-relaxed">

          <p>
            Bu platform, kullanıcıların kitapları kolayca ödünç alabilmesini, iade süreçlerini takip edebilmesini ve yöneticilerin tüm sistemi kontrol edebilmesini sağlar.
          </p>

          <p>
            Sistem; kullanıcı yönetimi, kitap yönetimi ve ödünç alma süreçlerini tek bir panelde birleştirir. Böylece hem öğrenciler hem de yöneticiler için daha verimli bir yapı oluşturulur.
          </p>

          <p>
            Geliştirme sürecinde sade arayüz, hızlı işlem akışı ve gerçek zamanlı takip önceliklendirilmiştir.
          </p>

        </div>

        {/* IMAGE / VISUAL */}
        <div className="bg-gray-100 rounded-2xl p-10 text-center shadow">
          <h2 className="text-xl font-semibold mb-3">
            📚 Dijital Kütüphane
          </h2>

          <p className="text-gray-500 text-sm">
            Kitapları yönet, takip et, keşfet.
          </p>
        </div>

      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="font-semibold mb-2">
            📖 Kitap Yönetimi
          </h3>
          <p className="text-sm text-gray-500">
            Aradığınız kitapları kolayca ödünç alabilirsiniz.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="font-semibold mb-2">
            👥 Ceza Sistemi
          </h3>
          <p className="text-sm text-gray-500">
            Kişilerin kitap getirme günü geçtiğinde para cezası verilir.Her gün için 10 TL'dir ücret
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="font-semibold mb-2">
            🔄 Ödünç Takibi
          </h3>
          <p className="text-sm text-gray-500">
            Teslim tarihleri, gecikmeler ve aktif kitaplar takip edilir.
          </p>
        </div>

      </div>

    </div>
  );
};

export default About;
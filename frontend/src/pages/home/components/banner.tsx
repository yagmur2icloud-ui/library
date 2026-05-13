import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Kitap Dünyanı Keşfet 📚",
    description: "Binlerce kitabı keşfet ve kendi kütüphaneni oluştur.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    id: 2,
    title: "Favorilerini Kaydet ❤️",
    description: "Sevdiğin kitapları kaydet ve kolayca eriş.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    id: 3,
    title: "Okuma Listeni Oluştur 🚀",
    description: "Kendi okuma planını oluştur ve takip et.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-100 overflow-hidden rounded-md shadow-xl ">
      
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="text-white px-10 ml-10 max-w-xl">
              <h2 className="text-3xl font-bold mb-3 ">
                {slide.title}
              </h2>
              <p className="mb-5 text-gray-200">
                {slide.description}
              </p>

              <Link
                to="/book"
                className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded transition"
              >
                Keşfet
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 px-3 py-2 rounded text-white hover:bg-black cursor-pointer md:flex hidden"
      >
        <FaArrowLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 px-3 py-2 rounded text-white hover:bg-black cursor-pointer md:flex hidden"
      >
        ›
      </button>

      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
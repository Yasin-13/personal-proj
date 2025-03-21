import { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PlainCottonKurta from "./sliderimages/PlainCottonKurta.jpg";
import MandarinCollarKurta  from "./sliderimages/MandarinCollarKurta.jpg";
import DesignerKurta from "./sliderimages/designerkurta.jpg";
import WeddingSherwani from "./sliderimages/weddingsherwani.jpg";
import DhotiKurta from "./sliderimages/dhotikurta.jpg";
import BandhgalaKurta from "./sliderimages/BandhgalaKurta.jpg";


const products = [
  { id: 1, name: "Plain Cotton Kurta", image: PlainCottonKurta, category: "Men's Festive Wear" },
  { id: 3, name: "Mandarin Collar Kurta", image: MandarinCollarKurta, category: "Men's Festive Wear" },
  { id: 3, name: "Designer Kurta", image: DesignerKurta, category: "Men's Festive Wear" },
  { id: 4, name: "Wedding Sherwani", image: WeddingSherwani, category: "Men's Wedding Wear" },
  { id: 5, name: "Classic Dhoti Kurta", image: DhotiKurta, category: "Men's Ethnic Essentials" },
  { id: 4, name: "Bandhgala Kurta", image: BandhgalaKurta, category: "Men's Wedding Wear" },
];

const SimpleSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = Math.ceil(products.length / 3);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesCount);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);

  return (
    <div className="w-full max-w-[90rem] mx-auto px-4 py-12">
      <div className="w-12 h-12 mx-auto mb-4">
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full text-amber-500"
  >
    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" />
    <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
    <path
      d="M32 4 L36 16 L32 8 L28 16 Z M32 60 L36 48 L32 56 L28 48 Z 
         M4 32 L16 36 L8 32 L16 28 Z M60 32 L48 36 L56 32 L48 28 Z"
      fill="currentColor"
    />
    <circle cx="32" cy="32" r="8" fill="currentColor" />
  </svg>
</div>

      <h2 className="text-4xl font-serif text-center mb-8 text-amber-800">THE WEDDING EDIT</h2>
      <div className="relative bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 p-8 rounded-xl">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: slidesCount }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {products.slice(slideIndex * 3, (slideIndex + 1) * 3).map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg overflow-hidden border border-amber-300 transition-all duration-200 hover:shadow-xl"
                    >
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
                        />
                      </div>
                      <div className="p-6 text-center">
                        <p className="text-amber-600 text-sm mb-2">{product.category}</p>
                        <h3 className="text-2xl font-serif text-amber-800">{product.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/80 border border-amber-300 text-amber-800"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/80 border border-amber-300 text-amber-800"
            onClick={nextSlide}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: slidesCount }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide ? "bg-amber-500 w-6" : "bg-amber-300"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleSlider;


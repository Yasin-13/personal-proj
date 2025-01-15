"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { id: 1, name: "Chikankari Kurta", image: "/placeholder.svg?height=600&width=400", category: "Men's Ethnic" },
  { id: 2, name: "Cocktail Saree", image: "/placeholder.svg?height=600&width=400", category: "Women's Ethnic" },
  { id: 3, name: "Brocade Weave Jacket", image: "/placeholder.svg?height=600&width=400", category: "Men's Ethnic" },
  { id: 4, name: "Designer Kurta", image: "/placeholder.svg?height=600&width=400", category: "Men's Collection" },
  { id: 5, name: "Embroidered Saree", image: "/placeholder.svg?height=600&width=400", category: "Women's Collection" },
  { id: 6, name: "Wedding Sherwani", image: "/placeholder.svg?height=600&width=400", category: "Men's Collection" },
];

const SimpleSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = Math.ceil(products.length / 3);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesCount);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
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

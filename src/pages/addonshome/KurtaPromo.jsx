import React from "react";
import { Link } from "react-router-dom";
import DesignerKurta1 from "./sliderimages/m2.jpeg"; 
import DesignerKurta2 from "./sliderimages/m3.jpeg"; 

const KurtaPromo = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 p-6 md:p-10 lg:p-16 rounded-lg shadow-xl border border-amber-300 transition-all duration-200 gap-8 lg:gap-12">
      {/* Left Section: Images */}
      <div className="flex flex-col md:flex-row w-full lg:w-1/2 gap-6 justify-center lg:justify-start">
        {/* Image 1 */}
        <div className="flex-1 overflow-hidden rounded-xl shadow-lg border-4 border-amber-400 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
          <img
            src={DesignerKurta1}
            alt="Elegant Festive Kurta"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Image 2 */}
        <div className="flex-1 overflow-hidden rounded-xl shadow-lg border-4 border-amber-400 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
          <img
            src={DesignerKurta2}
            alt="Traditional Festive Kurta"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Section: Text Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl font-serif text-amber-800 leading-snug border-b-2 border-amber-500 inline-block pb-2">
          Welcome to Nitin Readymade
        </h2>
        <p className="text-amber-700 text-base sm:text-lg mt-4 sm:mt-6 leading-relaxed">
          Discover timeless elegance and premium craftsmanship with Nitin
          Readymade's exclusive festive collection. For over two decades, we've
          been curating styles that blend tradition and modernity, offering a
          range of men’s kurtas designed to make you stand out. Celebrate every
          occasion with apparel that embodies grace, comfort, and sophistication.
        </p>
        <Link to="/shop/listing">
          <button
            className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 text-white font-bold text-base rounded-md bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200"
          >
            Shop the Collection
          </button>
        </Link>
      </div>
    </div>
  );
};

export default KurtaPromo;

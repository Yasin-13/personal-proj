import React from "react";
import festivekurta from "./sliderimages/1.jpeg";
import CottonKurta from "./sliderimages/2.jpeg";
import SilkKurta from "./sliderimages/3.jpeg";
import WinterEthnic from "./sliderimages/4.jpeg";

const KurtaCollection = () => {
  const images = [
    { src: festivekurta, title: "CLASSIC FESTIVE KURTA", price: " Under ₹1,499" },
    { src: CottonKurta, title: "ELEGANT COTTON KURTA", price: "Under ₹999" },
    { src: SilkKurta, title: "ROYAL SILK KURTA", price: "Under ₹1,199" },
    { src: WinterEthnic, title: "WINTER ETHNIC KURTA", price: "Under ₹1,199" },
  ];

  return (
    <div className="grid grid-cols-1 mt-5 mb-5 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 p-4">
      {images.map((item, index) => (
        <div key={index} className="relative border border-amber-400 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <img src={item.src} alt={item.title} className="w-full aspect-[2/3] object-cover" />
          <div className="absolute bottom-0 bg-gradient-to-t from-black/50 to-transparent w-full p-9 text-white text-center">
            <h3 className="text-3xl font-serif font-extrabold uppercase tracking-wide">{item.title}</h3>
            <p className="text-2xl font-serif font-bold text-amber-300 mt-2">{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KurtaCollection;

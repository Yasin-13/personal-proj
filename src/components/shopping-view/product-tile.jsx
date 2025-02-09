import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  // Create array of available images
  const productImages = [
    product?.image1,
    product?.image2,
    product?.image3,
    product?.image4,
  ].filter((img) => img);

  useEffect(() => {
    if (productImages.length > 1 && autoRotate) {
      const interval = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % productImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoRotate, productImages.length]);

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % productImages.length);
    setAutoRotate(false);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    setAutoRotate(false);
  };

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        {/* Image Container with Carousel */}
        <div
          className="relative pt-[150%] overflow-hidden"
          onMouseEnter={() => setAutoRotate(false)}
          onMouseLeave={() => setAutoRotate(true)}
        >
          <img
            src={productImages[activeImageIndex]}
            alt={product?.title}
            className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />

          {productImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
              >
                &lt;
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
              >
                &gt;
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {productImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeImageIndex ? "bg-amber-400" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

          <div className="absolute top-3 right-3 space-y-1">
            {product?.totalStock === 0 ? (
              <Badge variant="destructive" className="animate-pulse">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="bg-orange-600 hover:bg-orange-700">
                {`${product?.totalStock} left`}
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="bg-green-600 hover:bg-green-700">
                {`${Math.round(100 - (product.salePrice / product.price) * 100)}% OFF`}
              </Badge>
            ) : null}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-white drop-shadow-md line-clamp-2">
                {product?.title}
              </h2>
              <div className="flex flex-col items-end">
                <span
                  className={`text-lg font-bold text-white ${
                    product?.salePrice > 0 ? "line-through text-gray-300" : ""
                  }`}
                >
                  ₹{product?.price}
                </span>
                {product?.salePrice > 0 && (
                  <span className="text-xl font-black text-amber-400">₹{product?.salePrice}</span>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="bg-black/30 text-gray-200">
                {categoryOptionsMap[product?.category]}
              </Badge>
              <Badge variant="secondary" className="bg-black/30 text-gray-200">
                {brandOptionsMap[product?.brand]}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <CardFooter className="p-3 bg-gray-50">
        {product?.totalStock === 0 ? (
          <Button disabled className="w-full h-12 bg-gray-400 hover:bg-gray-400 text-white font-bold">
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full h-12 bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all hover:scale-[1.02]"
          >
            Add to Cart 🛒
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;

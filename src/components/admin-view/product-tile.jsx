import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative">
        {/* Image with 2:3 aspect ratio */}
        <div className="relative w-full pt-[150%]"> 
          <img
            src={product?.image1}
            alt={product?.title}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
          />
          
          {/* Buttons overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center space-x-2 bg-gradient-to-t from-black/80 to-transparent">
            <Button
              onClick={() => {
                setOpenCreateProductsDialog(true);
                setCurrentEditedId(product?._id);
                setFormData(product);
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold w-1/2"
            >
              Edit
            </Button>

            <Button
              onClick={() => handleDelete(product?._id)}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold w-1/2"
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <CardContent className="p-4">
          <h2 className="text-lg font-bold text-gray-800 truncate">{product?.title}</h2>
          <div className="flex justify-between items-center mt-2">
            <span
              className={`text-lg font-semibold text-gray-700 ${
                product?.salePrice > 0 ? "line-through text-gray-400" : ""
              }`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-bold text-amber-600">
                ₹{product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default AdminProductTile;

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import StarRatingComponent from "../common/star-rating";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { addReview, getReviews } from "@/store/shop/review-slice";

const specificationLabels = [
  { label: "Material", key: "material" },
  { label: "Sleeve Length", key: "sleeveLength" },
  { label: "Neck", key: "neck" },
  { label: "Length", key: "length" },
  { label: "Occasion", key: "occasion" },
  { label: "Technique", key: "technique" },
];

const ReviewItem = ({ review }) => (
  <div className="flex gap-4 group">
    <Avatar className="w-10 h-10 border transition-transform group-hover:scale-105">
      <AvatarFallback className="bg-primary/10">
        {review?.userName[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
    <div className="grid gap-1 flex-1">
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-foreground">{review?.userName}</h3>
        <span className="text-muted-foreground text-sm">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      <StarRatingComponent rating={review?.reviewValue} />
      <p className="text-muted-foreground mt-1">{review.reviewMessage}</p>
    </div>
  </div>
);

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const averageReview = useMemo(() => {
    if (!reviews?.length) return 0;
    return (
      reviews.reduce((sum, item) => sum + item.reviewValue, 0) / reviews.length
    );
  }, [reviews]);

  useEffect(() => {
    if (productDetails?._id && !reviews) {
      dispatch(getReviews(productDetails._id));
    }
  }, [productDetails, dispatch]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    const cartItem = cartItems.items?.find(
      (item) => item.productId === productDetails._id && item.size === selectedSize
    );

    const sizeStock = productDetails.sizes.find(s => s.size === selectedSize)?.stock || 0;

    if (cartItem?.quantity >= sizeStock) {
      toast({
        title: `Maximum available quantity (${sizeStock}) for this size in cart`,
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user.id,
        productId: productDetails._id,
        size: selectedSize,
        quantity: 1,
      })
    ).then(() => {
      dispatch(fetchCartItems(user.id));
      toast({ title: "Added to cart successfully!" });
    });
  };

  // ... keep previous review handling functions the same ...

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="flex flex-col sm:grid sm:grid-cols-[1fr_1.5fr] gap-8 max-w-[95vw] sm:max-w-[80vw] lg:max-w-[70vw] h-[90vh]">
        {/* Image Section with 2:3 ratio */}
        <div className="relative" style={{ paddingTop: '150%' }}>
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
            <img
              src={productDetails?.image1}
              alt={productDetails?.title}
              className="object-contain w-full h-full p-4"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {productDetails?.title}
          </h1>
          
          {/* Size Selector */}
          <div className="space-y-2">
            <Label className="text-base">Select Size</Label>
            <div className="flex flex-wrap gap-2">
              {productDetails?.sizes?.map((sizeInfo) => (
                <Button
                  key={sizeInfo.size}
                  variant={selectedSize === sizeInfo.size ? "default" : "outline"}
                  onClick={() => setSelectedSize(sizeInfo.size)}
                  disabled={sizeInfo.stock <= 0}
                  className="min-w-[60px]"
                >
                  {sizeInfo.size}
                </Button>
              ))}
            </div>
          </div>

          {/* Price and Rating */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p
                className={`text-3xl font-bold ${
                  productDetails?.salePrice ? "text-muted-foreground line-through" : "text-primary"
                }`}
              >
                ₹{productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 && (
                <p className="text-3xl font-bold text-primary">
                  ₹{productDetails?.salePrice}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <StarRatingComponent rating={averageReview} />
              <span className="text-muted-foreground">
                ({reviews?.length || 0} reviews)
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            size="lg"
            className="w-full h-12 text-lg"
            onClick={handleAddToCart}
            disabled={!productDetails?.totalStock || !selectedSize}
          >
            {productDetails?.totalStock ? "Add to Cart" : "Out of Stock"}
          </Button>

          <Separator />

          {/* Specifications Table */}
          <div className="w-full overflow-hidden border rounded-lg">
            <table className="w-full">
              <tbody>
                {specificationLabels.map(({ label, key }) => (
                  <tr key={key} className="border-b">
                    <td className="px-4 py-3 text-sm font-medium text-muted-foreground w-1/2">
                      {label}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {productDetails?.[key] || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ... Keep reviews section the same as before ... */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
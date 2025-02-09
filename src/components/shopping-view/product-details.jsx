import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Tag } from "lucide-react"
import { Dialog, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useToast } from "../ui/use-toast"
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
import { getReviews, addReview } from "@/store/shop/review-slice"

const StarRating = ({ rating, showCount, count }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded">
      <span className="font-medium">{rating}</span>
      <Star className="w-3 h-3 fill-current" />
    </div>
    {showCount && <span className="text-gray-500">({count})</span>}
  </div>
)

const ReviewItem = ({ review }) => (
  <div className="border-b pb-4 mb-4 last:border-b-0">
    <div className="flex items-center gap-2 mb-2">
      <StarRating rating={review.reviewValue} />
      <span className="text-gray-500 text-sm">{new Date(review.createdAt).toLocaleDateString()}</span>
    </div>
    <p className="text-gray-700">{review.reviewMessage}</p>
    <p className="text-gray-500 text-sm mt-2">By {review.userName}</p>
  </div>
)

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { user } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.shopCart)
  const { reviews } = useSelector((state) => state.shopReview)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [reviewMsg, setReviewMsg] = useState("")
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pincode, setPincode] = useState("")
  const [showFullDescription, setShowFullDescription] = useState(false)

  const images = [
    productDetails?.image1,
    productDetails?.image2,
    productDetails?.image3,
    productDetails?.image4,
  ].filter(Boolean)

  useEffect(() => {
    if (productDetails?._id) {
      dispatch(getReviews(productDetails._id))
    }
  }, [dispatch, productDetails])

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", variant: "destructive" })
      return
    }
    if (!user) {
      toast({ title: "Please login to add items to cart", variant: "destructive" })
      return
    }

    const sizeStock = productDetails.sizes.find((s) => s.size === selectedSize)?.stock || 0
    const cartItem = cartItems.items?.find(
      (item) => item.productId === productDetails._id && item.size === selectedSize,
    )

    if (cartItem?.quantity >= sizeStock) {
      toast({
        title: `Maximum available quantity (${sizeStock}) for this size in cart`,
        variant: "destructive",
      })
      return
    }

    dispatch(
      addToCart({
        userId: user.id,
        productId: productDetails._id,
        size: selectedSize,
        quantity: 1,
      }),
    ).then(() => {
      dispatch(fetchCartItems(user.id))
      toast({ title: "Added to cart successfully!" })
    })
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      toast({ title: "Please login to submit a review", variant: "destructive" })
      return
    }
    if (!rating) {
      toast({ title: "Please select a rating", variant: "destructive" })
      return
    }
    setIsSubmitting(true)
    dispatch(
      addReview({
        productId: productDetails._id,
        userId: user.id,
        userName: user.name,
        reviewValue: rating,
        reviewMessage: reviewMsg,
      }),
    ).then(() => {
      setReviewMsg("")
      setRating(0)
      toast({ title: "Review submitted successfully!" })
      dispatch(getReviews(productDetails._id))
      setIsSubmitting(false)
    })
  }

  const checkDelivery = async () => {
    if (!pincode) {
      toast({ title: "Please enter pincode", variant: "destructive" })
      return
    }

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      const data = await response.json()

      if (data[0]?.Status === "Success") {
        toast({ title: "Delivery available in your area!" })
      } else if (data[0]?.Status === "Error") {
        toast({ title: "This pincode is invalid or doesn't exist in India.", variant: "destructive" })
      } else {
        toast({ title: "Currently out of stock in this area." })
      }
    } catch (error) {
      toast({ title: "Error checking pincode. Try again later.", variant: "destructive" })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[95vw] xl:max-w-[1200px] p-0">
        <div className="flex flex-col lg:flex-row max-h-[90vh]">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-[60%] xl:w-[50%] bg-white p-4 relative">
            {/* Thumbnails */}
            <div className="hidden lg:flex flex-col gap-3 w-[80px] absolute left-4 top-4 z-10">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-16 h-16 border-2 rounded overflow-hidden ${
                    idx === currentImageIndex ? "border-amber-500" : "border-gray-200"
                  }`}
                >
                  <img src={img || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative aspect-square w-full h-full flex items-center justify-center">
              <img
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={productDetails?.title}
                className="w-full h-full object-contain max-h-[80vh]"
              />
              <button
  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
  className="absolute left-2 top-[55%] -translate-y-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-800 border border-amber-300 shadow-lg rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
>
  <ChevronLeft className="w-6 h-6 text-amber-700" />
</button>

<button
  onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
  className="absolute right-2 top-[55%] -translate-y-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-800 border border-amber-300 shadow-lg rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
>
  <ChevronRight className="w-6 h-6 text-amber-700" />
</button>

            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              Home / Clothing / {productDetails?.category}
            </div>

            {/* Title, Description & Rating */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-amber-800 mb-2">{productDetails?.title}</h1>

              {/* Description with "Read More" */}
              {productDetails?.description && (
                <div className="text-amber-700 text-sm mt-2 relative">
                  {showFullDescription ? (
                    <p>{productDetails.description}</p>
                  ) : (
                    <p>
                      {productDetails.description.slice(0, 120)}...
                      <button
                        onClick={() => setShowFullDescription(true)}
                        className="text-amber-600 font-medium hover:underline ml-1"
                      >
                        Read More
                      </button>
                    </p>
                  )}
                </div>
              )}

              {/* Rating Section */}
              <div className="flex items-center gap-4 mt-2">
                <StarRating
                  rating={reviews?.reduce((acc, r) => acc + r.reviewValue, 0) / reviews?.length || 4}
                  showCount
                  count={reviews?.length || 570}
                />
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-6">
              <div className="text-amber-600 font-medium mb-1">Special Price</div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-amber-800">
                  ₹{productDetails?.salePrice || productDetails?.price}
                </span>
                {productDetails?.salePrice && (
                  <>
                    <span className="text-amber-500 line-through text-xl">₹{productDetails?.price}</span>
                    <span className="text-amber-700 font-medium text-lg">
                      {Math.round(((productDetails.price - productDetails.salePrice) / productDetails.price) * 100)}%
                      off
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Bank Offers */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-amber-800 mb-3">Available Offers</h3>
              <div className="space-y-3 bg-amber-100 border border-amber-300 rounded-lg p-4 shadow-md">
                <div className="flex gap-3 items-start border-b border-amber-300 pb-3">
                  <Tag className="w-5 h-5 text-amber-600" />
                  <div className="text-amber-700">
                    <span className="font-semibold text-amber-800">Limited Time Festival Deal: </span>
                    Get ₹250 cashback on your 10th order{" "}
                    <span className="text-amber-500">(Offer valid for VIP customers only).</span>
                  </div>
                </div>

                <div className="flex gap-3 items-start border-b border-amber-300 pb-3">
                  <Tag className="w-5 h-5 text-amber-600" />
                  <div className="text-amber-700">
                    <span className="font-semibold text-amber-800">Premium Member Bonus: </span>
                    Enroll in our <span className="text-amber-500">Gold Loyalty Program (₹999/year)</span> for access to
                    special offers.
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <Tag className="w-5 h-5 text-amber-600" />
                  <div className="text-amber-700">
                    <span className="font-semibold text-amber-800">Exclusive PayPal Offer: </span>
                    Pay securely via PayPal & get a <span className="text-amber-500">faster checkout experience.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Delivery</h3>
              <div className="flex gap-3">
                <Input
                  placeholder="Enter delivery pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="max-w-[200px]"
                />
                <Button onClick={checkDelivery}>Check</Button>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Select Size</h3>
                <Button variant="link" className="text-amber-600 p-0">
                  Size Chart
                </Button>
              </div>

              <div className="flex flex-wrap gap-3">
                {productDetails?.sizes?.map((sizeInfo) => (
                  <Button
                    key={sizeInfo.size}
                    variant={selectedSize === sizeInfo.size ? "default" : "outline"}
                    onClick={() => setSelectedSize(sizeInfo.size)}
                    disabled={sizeInfo.stock <= 0}
                    className={`h-12 min-w-[48px] border-2 border-amber-500`}
                  >
                    {sizeInfo.size}
                    {sizeInfo.stock <= 5 && sizeInfo.stock > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                        {sizeInfo.stock}
                      </span>
                    )}
                  </Button>
                ))}
              </div>

              {!selectedSize && (
                <p className="text-red-600 mt-2 text-sm font-semibold">Please select a size to add to the cart</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-5 mt-6">
              <Button
                className="flex-1 bg-[#ff9f00] hover:bg-[#ff9f00]/90 h-14 text-lg"
                onClick={handleAddToCart}
                disabled={!productDetails?.totalStock || !selectedSize}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                ADD TO CART
              </Button>

              <Button
                className="flex-1 bg-[#fb641b] hover:bg-[#fb641b]/90 h-14 text-lg"
                onClick={handleAddToCart}
                disabled={!productDetails?.totalStock || !selectedSize}
              >
                BUY NOW
              </Button>
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-amber-800 mb-3">Highlights</h3>
              <div className="border border-amber-300 rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200">
                <table className="w-full border-collapse">
                  <tbody>
                    {Object.entries(productDetails || {})
                      .filter(([key]) =>
                        ["material", "sleeveLength", "neck", "length", "occasion", "technique"].includes(key),
                      )
                      .map(([key, value], index) => (
                        <tr
                          key={key}
                          className={`text-amber-800 text-md transition-all duration-200 ${
                            index % 2 === 0 ? "bg-amber-100" : "bg-yellow-200"
                          }`}
                        >
                          <td className="px-4 py-3 font-semibold capitalize border-r border-amber-300 text-amber-700">
                            {key}
                          </td>
                          <td className="px-4 py-3 text-amber-600">{value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reviews */}
            <div>
              {/* Heading & Rate Product Button */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-amber-800">Ratings & Reviews</h3>
                <Button
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600"
                  onClick={() => document.getElementById("review-form").scrollIntoView()}
                >
                  Rate Product
                </Button>
              </div>

              <div className="space-y-4">
                {/* Reviews List */}
                {reviews?.map((review) => (
                  <ReviewItem key={review._id} review={review} />
                ))}

                {/* Review Form */}
                <form
                  id="review-form"
                  onSubmit={handleReviewSubmit}
                  className="bg-amber-100 p-4 rounded-lg border border-amber-300 space-y-4"
                >
                  <h4 className="font-medium text-amber-800">Write a Review</h4>

                  {/* Rating Selection */}
                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          type="button"
                          variant={star <= rating ? "default" : "outline"}
                          size="sm"
                          className={`border-amber-500 ${star <= rating ? "bg-amber-500 text-white" : "bg-white text-amber-700"}`}
                          onClick={() => setRating(star)}
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Review Input */}
                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-2">Review</label>
                    <Input
                      value={reviewMsg}
                      onChange={(e) => setReviewMsg(e.target.value)}
                      placeholder="Write your review here..."
                      className="border border-amber-300 placeholder-amber-400 text-amber-800"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsDialog


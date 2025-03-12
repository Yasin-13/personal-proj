"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingBag, CreditCard, Truck, CheckCircle, ShieldCheck, ArrowRight } from "lucide-react"

import Address from "@/components/shopping-view/address"
import UserCartItemsContent from "@/components/shopping-view/cart-items-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createNewOrder } from "@/store/shop/order-slice"

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart)
  const { user } = useSelector((state) => state.auth)
  const { approvalURL } = useSelector((state) => state.shopOrder)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const [isPaymentStart, setIsPaymentStart] = useState(false)
  const dispatch = useDispatch()
  const { toast } = useToast()

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum + (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity,
          0,
        )
      : 0

  const handleInitiatePaypalPayment = () => {
    if (!cartItems?.items?.length) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      })
      return
    }

    if (!currentSelectedAddress) {
      toast({
        title: "Please select an address to proceed.",
        variant: "destructive",
      })
      return
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    }

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true)
      } else {
        setIsPaymentStart(false)
      }
    })
  }

  // Redirect to Paypal if approval URL exists
  if (approvalURL) {
    window.location.href = approvalURL
    return null // Prevent component from rendering after redirect
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Header */}
      <div className="relative bg-gradient-to-r from-amber-900 to-amber-700 shadow-2xl py-12 px-8 rounded-b-3xl border-b-4 border-amber-500">
  <div className="container mx-auto max-w-6xl">
    <div className="flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide drop-shadow-lg">
      SECURE CHECKOUT
      </h1>
      {/* Checkout Steps */}
      <div className="w-full max-w-3xl mt-10">
        <div className="flex items-center justify-between relative">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 shadow-2xl border-4 border-amber-500 animate-pulse">
              <ShoppingBag className="h-8 w-8 text-amber-700 drop-shadow-md" />
            </div>
            <span className="text-lg font-semibold text-white">Cart</span>
          </div>
          {/* Connector */}
          <div className="absolute top-1/2 left-[18%] w-[32%] h-1 bg-white/60 rounded-full"></div>
          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 shadow-2xl border-4 border-amber-500/90 transition-all duration-300 ease-in-out hover:scale-110">
              <Truck className="h-8 w-8 text-amber-700 drop-shadow-md" />
            </div>
            <span className="text-lg font-semibold text-white">Shipping</span>
          </div>
          {/* Connector */}
          <div className="absolute top-1/2 right-[18%] w-[32%] h-1 bg-white/40 rounded-full"></div>
          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/40 flex items-center justify-center mb-3 shadow-2xl border-4 border-amber-500/70 transition-all duration-300 ease-in-out hover:scale-105">
              <CreditCard className="h-8 w-8 text-amber-600 drop-shadow-md" />
            </div>
            <span className="text-lg font-semibold text-white/90">Payment</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



      {/* Main Content */}
      <div className="container mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Address Section */}
          <div className="lg:col-span-7 space-y-8">
              <div className="p-0">
                <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
              </div>
            

            {/* Trust Badges */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg p-10 border border-amber-400/70">
  <h3 className="text-amber-900 font-serif font-bold mb-8 flex items-center text-xl tracking-wide">
    <ShieldCheck className="h-6 w-6 mr-3 text-amber-700 drop-shadow-md" />
    Secure Shopping Guarantee
  </h3>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
    {/* Feature 1 */}
    <div className="flex flex-col items-center text-center">
      <div className="bg-white rounded-full p-5 mb-3 shadow-lg border-2 border-amber-400/80 transition-all duration-300 ease-in-out hover:scale-110">
        <ShieldCheck className="h-8 w-8 text-amber-700" />
      </div>
      <span className="text-base font-semibold text-amber-800">Secure Payment</span>
    </div>
    {/* Feature 2 */}
    <div className="flex flex-col items-center text-center">
      <div className="bg-white rounded-full p-5 mb-3 shadow-lg border-2 border-amber-400/80 transition-all duration-300 ease-in-out hover:scale-110">
        <Truck className="h-8 w-8 text-amber-700" />
      </div>
      <span className="text-base font-semibold text-amber-800">Fast Delivery</span>
    </div>
    {/* Feature 3 */}
    <div className="flex flex-col items-center text-center">
      <div className="bg-white rounded-full p-5 mb-3 shadow-lg border-2 border-amber-400/80 transition-all duration-300 ease-in-out hover:scale-110">
        <CheckCircle className="h-8 w-8 text-amber-700" />
      </div>
      <span className="text-base font-semibold text-amber-800">Quality Products</span>
    </div>
    {/* Feature 4 */}
    <div className="flex flex-col items-center text-center">
      <div className="bg-white rounded-full p-5 mb-3 shadow-lg border-2 border-amber-400/80 transition-all duration-300 ease-in-out hover:scale-110">
        <CreditCard className="h-8 w-8 text-amber-700" />
      </div>
      <span className="text-base font-semibold text-amber-800">Easy Returns</span>
    </div>
  </div>
</div>

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
  <div className="sticky top-6">
    <Card className="border border-amber-300 shadow-lg overflow-hidden bg-white">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-yellow-500 py-6 px-8">
        <CardTitle className="text-white flex items-center gap-2 text-xl">
          <ShoppingBag className="h-5 w-5" /> Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[400px] overflow-y-auto p-8 space-y-6">
          {cartItems?.items?.length > 0 ? (
            cartItems.items.map((item) => <UserCartItemsContent key={item.productId} cartItem={item} />)
          ) : (
            <div className="text-center py-10 text-amber-500">Your cart is empty</div>
          )}
        </div>
        <div className="border-t border-amber-300 p-8 space-y-5 bg-gradient-to-br from-amber-50 to-amber-100">
          <div className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">Subtotal</span>
            <span className="text-amber-800 font-semibold">₹{totalCartAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-amber-700 font-medium">Shipping</span>
            <span className="text-green-600 font-semibold">Free</span>
          </div>
          <div className="pt-4 border-t border-amber-300 flex justify-between items-center">
            <span className="font-bold text-lg text-amber-800">Total</span>
            <div className="text-right">
              <span className="font-bold text-xl text-amber-800">₹{totalCartAmount.toFixed(2)}</span>
              <p className="text-xs text-amber-700">(Incl. of all taxes)</p>
            </div>
          </div>
          <Button
            onClick={handleInitiatePaypalPayment}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-medium py-6 text-base rounded-md shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            disabled={isPaymentStart || !cartItems?.items?.length}
          >
            {isPaymentStart ? (
              "Processing Payment..."
            ) : (
              <span className="flex items-center justify-center">
                Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
          <p className="text-xs text-center text-amber-700 mt-2">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</div>

        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout


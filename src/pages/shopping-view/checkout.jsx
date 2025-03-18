import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingBag, CreditCard, Truck, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react'

import Address from "@/components/shopping-view/address"
import UserCartItemsContent from "@/components/shopping-view/cart-items-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createNewOrder, capturePayment } from "@/store/shop/order-slice"

// Simple logging helper
const log = (message, data) => {
  console.log(`[${new Date().toISOString()}] ${message}`, data || "")
}

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart)
  const { user } = useSelector((state) => state.auth)
  const { isLoading } = useSelector((state) => state.shopOrder)
  const dispatch = useDispatch()
  const { toast } = useToast()

  // State management
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)

  // Load Razorpay script on component mount
  useEffect(() => {
    if (!razorpayLoaded) {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      script.onload = () => {
        log("Razorpay script loaded on page load")
        setRazorpayLoaded(true)
      }
      script.onerror = () => {
        log("Failed to load Razorpay script on page load")
        toast({
          title: "Warning",
          description: "Payment system is currently unavailable. Please try again later.",
          variant: "destructive",
        })
      }
      document.body.appendChild(script)
    }
    
    return () => {
      // Cleanup function to handle any pending payments if component unmounts
      if (isProcessing) {
        log("Component unmounting while payment was processing")
        setIsProcessing(false)
      }
    }
  }, [razorpayLoaded, toast, isProcessing])

  // Calculate total cart amount
  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, item) => sum + (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity,
          0,
        )
      : 0

  // Handle payment initiation
  const handlePayment = async () => {
    // Validate cart and address
    if (!cartItems?.items?.length) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items to proceed.",
        variant: "destructive",
      })
      return
    }

    if (!currentSelectedAddress) {
      toast({
        title: "Address Required",
        description: "Please select a delivery address to proceed.",
        variant: "destructive",
      })
      return
    }

    if (!razorpayLoaded) {
      toast({
        title: "Payment System Unavailable",
        description: "The payment system is currently loading. Please try again in a moment.",
        variant: "destructive",
      })
      return
    }

    // Set processing state
    setIsProcessing(true)
    log("Starting payment process")

    try {
      // Prepare order data
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
          name: currentSelectedAddress?.name,
          address: currentSelectedAddress?.address,
          city: currentSelectedAddress?.city,
          pincode: currentSelectedAddress?.pincode,
          phone: currentSelectedAddress?.phone,
          email: currentSelectedAddress?.email,
        },
        orderStatus: "pending",
        paymentMethod: "razorpay",
        paymentStatus: "pending",
        totalAmount: totalCartAmount,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
      }

      log("Creating order with data:", orderData)

      // Create order
      const result = await dispatch(createNewOrder(orderData)).unwrap()
      log("Order creation result:", result)

      if (!result?.success) {
        throw new Error(result?.message || "Failed to create order")
      }

      // Extract order data
      const { orderId, razorpayOrderId, amount, currency } = result
      log("Order created successfully:", { orderId, razorpayOrderId })

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK failed to load")
      }

      // Configure Razorpay options
      const options = {
        key: "rzp_test_RU5Isgnso9RSwv",
        amount,
        currency,
        name: "NITIN READYMADE",
        description: "Order Payment",
        order_id: razorpayOrderId,
        handler: function(response) {
          log("Payment successful, response:", response)
          handlePaymentSuccess(response, razorpayOrderId, orderId)
        },
        prefill: {
          name: user?.userName || "",
          email: user?.email || "",
          contact: currentSelectedAddress?.phone || "",
        },
        notes: {
          orderId,
        },
        theme: {
          color: "#B45309", // Amber-700
        },
        modal: {
          ondismiss: function() {
            log("Payment modal dismissed")
            setIsProcessing(false)
            toast({
              title: "Payment Cancelled",
              description: "You can try again when you're ready.",
              variant: "default",
            })
          },
        },
      }

      log("Opening Razorpay with options:", options)

      // Create Razorpay instance and open checkout
      const razorpayInstance = new window.Razorpay(options)

      // Handle payment failures
      razorpayInstance.on("payment.failed", function(response) {
        log("Payment failed:", response.error)
        setIsProcessing(false)
        toast({
          title: "Payment Failed",
          description: response.error.description || "Your payment couldn't be processed.",
          variant: "destructive",
        })
      })

      // Open checkout
      razorpayInstance.open()
    } catch (error) {
      log("Error in payment process:", error)
      setIsProcessing(false)
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initiate payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle successful payment verification
  const handlePaymentSuccess = async (response, razorpayOrderId, orderId) => {
    try {
      log("Verifying payment with server:", {
        razorpayOrderId,
        razorpayPaymentId: response.razorpay_payment_id,
        orderId,
      })

      // Use Redux thunk to capture payment
      const result = await dispatch(
        capturePayment({
          razorpayOrderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          orderId,
        })
      ).unwrap()

      log("Payment verification result:", result)
      
      setIsProcessing(false)

      if (result.success) {
        log("Payment verified successfully, redirecting to:", result.redirectUrl)
        toast({
          title: "Payment Successful",
          description: "Your order has been placed successfully!",
          variant: "default",
        })
        // Use the redirect URL from the server response
        window.location.href = result.redirectUrl || `/shop/payment-success?orderId=${orderId}`
      } else {
        log("Payment verification failed, redirecting to:", result.redirectUrl)
        toast({
          title: "Payment Failed",
          description: result.message || "Your payment couldn't be verified.",
          variant: "destructive",
        })
        window.location.href = result.redirectUrl || "/shop/paypal-return?status=failed"
      }
    } catch (error) {
      log("Error verifying payment:", error)
      setIsProcessing(false)
      toast({
        title: "Payment Error",
        description: "We couldn't verify your payment. Please contact support.",
        variant: "destructive",
      })
      window.location.href = "/shop/paypal-return?status=error"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Header */}
      <div className="relative bg-gradient-to-r from-amber-900 to-amber-700 shadow-2xl py-12 px-8 rounded-b-3xl border-b-4 border-amber-500">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide drop-shadow-lg">SECURE CHECKOUT</h1>
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
                      onClick={handlePayment}
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-medium py-6 text-base rounded-md shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      disabled={isProcessing || isLoading || !cartItems?.items?.length}
                    >
                      {isProcessing || isLoading ? (
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
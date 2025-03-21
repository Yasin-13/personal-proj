import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/components/ui/use-toast"
import {
  ShoppingBag,
  CreditCard,
  Truck,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  Lock,
  Clock,
  Package,
  ChevronRight,
} from "lucide-react"
import Razorpay from "@/assets/razorpay.png"

import Address from "@/components/shopping-view/address"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createNewOrder, capturePayment } from "@/store/shop/order-slice"
import CartItemDisplay from "@/components/shopping-view/cart-items-content"

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
  const [activeStep, setActiveStep] = useState(1)

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
          size: item?.size,
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
        handler: (response) => {
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
          ondismiss: () => {
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
      razorpayInstance.on("payment.failed", (response) => {
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
        }),
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

  // Handle step change
  const goToNextStep = () => {
    if (activeStep === 1 && !currentSelectedAddress) {
      toast({
        title: "Address Required",
        description: "Please select a delivery address to proceed.",
        variant: "destructive",
      })
      return
    }

    if (activeStep < 2) {
      setActiveStep(activeStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goToPreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-200 via-amber-100 to-yellow-200">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Checkout Progress Bar */}
        <div className="bg-white shadow-md rounded-xl mb-8 border border-amber-300">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-amber-700" />
                <span className="font-medium text-amber-800">Checkout</span>
              </div>

              <div className="hidden md:flex items-center w-1/2">
                <div className="w-full bg-amber-100 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${activeStep * 50}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-amber-700" />
                <span className="text-sm font-medium text-amber-800">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Steps */}
        <div className="flex justify-center mb-8 mt-4">
          <div className="hidden md:flex w-2/3 items-center justify-between">
            <div className={`flex flex-col items-center ${activeStep >= 1 ? "text-amber-800" : "text-amber-400"}`}>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  activeStep >= 1
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white"
                    : "bg-amber-100 text-amber-400"
                }`}
              >
                <Truck className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">Shipping</span>
            </div>

            <div
              className={`w-1/3 h-0.5 ${activeStep >= 2 ? "bg-gradient-to-r from-amber-500 to-yellow-500" : "bg-amber-100"}`}
            ></div>

            <div className={`flex flex-col items-center ${activeStep >= 2 ? "text-amber-800" : "text-amber-400"}`}>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  activeStep >= 2
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white"
                    : "bg-amber-100 text-amber-400"
                }`}
              >
                <CreditCard className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Shipping */}
            {activeStep === 1 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-300">
                <div className="bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 p-6 border-b border-amber-300">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 w-10 h-10 rounded-full flex items-center justify-center mr-4 shadow-md">
                      <Truck className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-serif font-semibold text-amber-800">Shipping Information</h2>
                  </div>
                </div>

                <div className="p-6">
                  <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />

                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={goToNextStep}
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-8 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      Continue to Payment
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {activeStep === 2 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-300">
                <div className="bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 p-6 border-b border-amber-300">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 w-10 h-10 rounded-full flex items-center justify-center mr-4 shadow-md">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-serif font-semibold text-amber-800">Payment Method</h2>
                  </div>
                </div>

                <div className="p-6">
                  {/* Shipping Address Summary */}
                  {currentSelectedAddress && (
                    <div className="mb-8 bg-gradient-to-br from-amber-200 via-amber-100 to-yellow-200 p-4 rounded-lg border border-amber-300">
                      <h3 className="text-sm font-medium text-amber-800 mb-2">Shipping to:</h3>
                      <div className="text-amber-700">
                        <p className="font-medium">{currentSelectedAddress.name}</p>
                        <p>{currentSelectedAddress.address}</p>
                        <p>
                          {currentSelectedAddress.city}, {currentSelectedAddress.pincode}
                        </p>
                        <p>Phone: {currentSelectedAddress.phone}</p>
                      </div>
                      <Button
                        variant="link"
                        onClick={goToPreviousStep}
                        className="text-amber-600 hover:text-amber-800 p-0 h-auto mt-2"
                      >
                        Change
                      </Button>
                    </div>
                  )}

                  {/* Payment Options */}
                  <div className="space-y-4">
                    <div className="border border-amber-300 rounded-lg p-4 bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200">
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center mr-3">
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-amber-800">Razorpay Payment Gateway</span>
                          <img src={Razorpay || "/placeholder.svg"} alt="Razorpay" className="h-6 w-auto" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={goToPreviousStep}
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-700 transition-all duration-200"
                    >
                      Back to Shipping
                    </Button>

                    <Button
                      onClick={handlePayment}
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      disabled={isProcessing || isLoading || !cartItems?.items?.length}
                    >
                      {isProcessing || isLoading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="text-center w-full">Pay Now</span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-300">
              <div className="bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 p-6 border-b border-amber-300">
                <h2 className="text-xl font-serif font-semibold text-amber-800">Delivery Information</h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-amber-200 via-amber-100 to-yellow-200 rounded-full p-3 mr-4">
                      <Truck className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-800 mb-1">Free Shipping</h3>
                      <p className="text-amber-600 text-sm">On all orders above ₹499</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-amber-200 via-amber-100 to-yellow-200 rounded-full p-3 mr-4">
                      <Clock className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-800 mb-1">Fast Delivery</h3>
                      <p className="text-amber-600 text-sm">6-7 business days</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-amber-200 via-amber-100 to-yellow-200 rounded-full p-3 mr-4">
                      <Package className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-800 mb-1">Secure Packaging</h3>
                      <p className="text-amber-600 text-sm">Safe and tamper-proof</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <Card className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-300">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-6">
                  <h2 className="text-xl font-serif font-semibold text-white flex items-center">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Order Summary
                  </h2>
                </div>

                <CardContent className="p-0">
                  <div className="max-h-[300px] overflow-y-auto p-6 space-y-4">
                    {cartItems?.items?.length > 0 ? (
                      cartItems.items.map((item) => <CartItemDisplay key={item.productId} cartItem={item} />)
                    ) : (
                      <div className="text-center py-8 text-amber-500">Your cart is empty</div>
                    )}
                  </div>

                  <div className="p-6 space-y-4 bg-gradient-to-br from-amber-200 via-amber-100 to-yellow-200">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-amber-700">Subtotal</span>
                      <span className="text-amber-800 font-medium">₹{totalCartAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-amber-700">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>

                    <Separator className="bg-amber-200" />

                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-amber-800">Total</span>
                      <div className="text-right">
                        <span className="font-bold text-xl text-amber-800">₹{totalCartAmount.toFixed(2)}</span>
                        <p className="text-xs text-amber-600">Incl. of all taxes</p>
                      </div>
                    </div>

                    {activeStep === 1 && (
                      <Button
                        onClick={goToNextStep}
                        className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        disabled={!cartItems?.items?.length}
                      >
                        Continue to Payment
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}

                    {activeStep === 2 && (
                      <Button
                        onClick={handlePayment}
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        disabled={isProcessing || isLoading || !cartItems?.items?.length}
                      >
                        {isProcessing || isLoading ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            Complete Payment <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="p-6 pt-0">
                    <div className="flex items-center justify-center space-x-3 mt-4">
                      <Lock className="h-4 w-4 text-amber-700" />
                      <span className="text-xs text-amber-700">Secure Payment</span>
                      <ShieldCheck className="h-4 w-4 text-amber-700" />
                      <span className="text-xs text-amber-700">Privacy Protected</span>
                    </div>

                    <div className="flex justify-center mt-4">
                      <img src={Razorpay || "/placeholder.svg"} alt="Payment Methods" className="h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-amber-300">
                <div className="flex items-center justify-center mb-4">
                  <ShieldCheck className="h-5 w-5 text-amber-700 mr-2" />
                  <h3 className="text-sm font-medium text-amber-800">Shop with Confidence</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-amber-200 via-amber-100 to-yellow-200 rounded-full p-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-amber-700" />
                    </div>
                    <span className="text-xs text-amber-700">Quality Guaranteed</span>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-amber-200 via-amber-100 to-yellow-200 rounded-full p-2 mb-2">
                      <Truck className="h-5 w-5 text-amber-700" />
                    </div>
                    <span className="text-xs text-amber-700">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout


"use client"

import { useSelector } from "react-redux"
import {
  FaBox,
  FaCalendarAlt,
  FaRupeeSign,
  FaCreditCard,
  FaTruck,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaCrown,
} from "react-icons/fa"
import { Badge } from "@/components/ui/badge"
import { DialogContent } from "@/components/ui/dialog"

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth)

  if (!orderDetails) {
    return (
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] p-0 overflow-hidden border-2 border-amber-400">
        <div className="flex items-center justify-center h-64">
          <p className="text-amber-800">Loading order details...</p>
        </div>
      </DialogContent>
    )
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[85vh] p-0 overflow-hidden border-2 border-amber-400">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 p-4 flex items-center gap-3">
        <FaCrown className="text-yellow-200 text-2xl" />
        <h1 className="text-xl font-bold text-white">Order Details</h1>
      </div>

      {/* Scrollable content area using standard CSS */}
      <div className="overflow-y-auto max-h-[calc(85vh-80px)] bg-gradient-to-b from-amber-50 to-yellow-50">
        <div className="p-6 space-y-6">
          {/* Order Information */}
          <div className="bg-white rounded-xl p-5 shadow-md border border-amber-200">
            <h2 className="text-lg font-bold text-amber-900 flex items-center gap-2 mb-4">
              <FaBox className="text-amber-600" /> Order Summary
            </h2>

            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-amber-800">Order ID:</span>
                <span className="text-amber-700 bg-amber-50 px-3 py-1 rounded-md font-mono text-sm">
                  {orderDetails._id}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium text-amber-800 flex items-center gap-1">
                  <FaCalendarAlt className="text-amber-600" /> Order Date:
                </span>
                <span className="text-amber-700 font-medium">{orderDetails.orderDate.split("T")[0]}</span>
              </div>

              <div className="flex justify-between items-center bg-amber-100 p-2 rounded-lg mt-2">
                <span className="font-medium text-amber-800 flex items-center gap-1">
                  <FaRupeeSign className="text-amber-600" /> Total Amount:
                </span>
                <span className="text-amber-900 font-bold text-lg">₹{orderDetails.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-xl p-5 shadow-md border border-amber-200">
            <h2 className="text-lg font-bold text-amber-900 flex items-center gap-2 mb-4">
              <FaCreditCard className="text-amber-600" /> Payment Information
            </h2>

            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-amber-800">Payment Method:</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300">
                  {orderDetails.paymentMethod}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
  <span className="font-medium">Payment Status:</span>
  <span>{orderDetails.paymentStatus}</span>
</div>

<div className="flex justify-between items-center mt-2">
  <span className="font-medium">Order Status:</span>
  <span>{orderDetails.orderStatus}</span>
</div>
            </div>
          </div>

          {/* Items Ordered */}
          <div className="bg-white rounded-xl p-5 shadow-md border border-amber-200">
            <h2 className="text-lg font-bold text-amber-900 flex items-center gap-2 mb-4">
              <FaBox className="text-amber-600" /> Ordered Items
            </h2>

            {orderDetails.cartItems && orderDetails.cartItems.length > 0 ? (
              <div className="bg-amber-50 rounded-lg overflow-hidden border border-amber-200">
                <div className="grid grid-cols-3 bg-amber-200 p-2 font-medium text-amber-900">
                  <div>Item</div>
                  <div className="text-center">Qty</div>
                  <div className="text-right">Price</div>
                </div>

                <div className="overflow-y-auto max-h-[200px]">
                  <ul className="divide-y divide-amber-100">
                    {orderDetails.cartItems.map((item, index) => (
                      <li key={index} className="grid grid-cols-3 p-3 hover:bg-amber-50 transition-colors">
                        <span className="font-medium text-amber-900 truncate" title={item.title}>
                          {item.title}
                        </span>
                        <span className="text-center text-amber-700">×{item.quantity}</span>
                        <span className="text-right font-medium text-amber-900">₹{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-amber-500 bg-amber-50 p-4 rounded-lg text-center">No items found</div>
            )}
          </div>

          {/* Shipping Details */}
          <div className="bg-white rounded-xl p-5 shadow-md border border-amber-200">
            <h2 className="text-lg font-bold text-amber-900 flex items-center gap-2 mb-4">
              <FaMapMarkerAlt className="text-amber-600" /> Shipping Information
            </h2>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
              <div className="space-y-2">
                <div className="font-bold text-amber-900">{user.userName}</div>
                <div className="text-amber-800">{orderDetails.addressInfo?.address}</div>
                <div className="text-amber-800">
                  {orderDetails.addressInfo?.city} - {orderDetails.addressInfo?.pincode}
                </div>
                <div className="text-amber-800">Phone: {orderDetails.addressInfo?.phone}</div>

                {orderDetails.addressInfo?.notes && (
                  <div className="mt-3 p-2 bg-amber-100 rounded border-l-4 border-amber-500 text-amber-700">
                    <span className="font-medium">Note:</span> {orderDetails.addressInfo.notes}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

export default ShoppingOrderDetailsView


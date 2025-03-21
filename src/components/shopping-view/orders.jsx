import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { format } from "date-fns"
import {
  Package,
  Clock,
  ChevronRight,
  ShoppingBag,
  CheckCircle,
  XCircle,
  Truck,
  AlertCircle,
  Search,
  Calendar,
  Filter,
  ArrowUpDown,
  Box,
  PackageCheck,
} from "lucide-react"

import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import ShoppingOrderDetailsView from "./order-details"
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice"

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder)

  function handleFetchOrderDetails(getId) {
    setCurrentOrderId(getId)
    dispatch(getOrderDetails(getId))
  }

  useEffect(() => {
    if (currentOrderId) {
      setOpenDetailsDialog(true)
    }
  }, [currentOrderId])

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id))
  }, [dispatch, user?.id])

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true)
  }, [orderDetails])

  const handleCloseDialog = () => {
    setOpenDetailsDialog(false)
    dispatch(resetOrderDetails())
  }

  // Filter and sort orders
  const filteredOrders = orderList
    ? orderList
        .filter((order) => {
          // Filter by search term
          const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase())

          // Filter by status
          const matchesStatus = statusFilter === "all" || order.orderStatus.toLowerCase() === statusFilter.toLowerCase()

          return matchesSearch && matchesStatus
        })
        .sort((a, b) => {
          // Sort by date
          const dateA = new Date(a.orderDate)
          const dateB = new Date(b.orderDate)

          return sortOrder === "newest" ? dateB - dateA : dateA - dateB
        })
    : []

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          color: "bg-green-500",
          textColor: "text-green-500",
          label: "Confirmed",
          step: 1,
        }
      case "in process":
        return {
          icon: <Box className="h-5 w-5" />,
          color: "bg-blue-500",
          textColor: "text-blue-500",
          label: "In Process",
          step: 2,
        }
      case "in shipping":
        return {
          icon: <Truck className="h-5 w-5" />,
          color: "bg-indigo-500",
          textColor: "text-indigo-500",
          label: "In Shipping",
          step: 3,
        }
      case "delivered":
        return {
          icon: <PackageCheck className="h-5 w-5" />,
          color: "bg-emerald-500",
          textColor: "text-emerald-500",
          label: "Delivered",
          step: 4,
        }
      case "rejected":
        return {
          icon: <XCircle className="h-5 w-5" />,
          color: "bg-red-600",
          textColor: "text-red-600",
          label: "Rejected",
          step: -1,
        }
      case "pending":
        return {
          icon: <Clock className="h-5 w-5" />,
          color: "bg-amber-500",
          textColor: "text-amber-500",
          label: "Pending",
          step: 0,
        }
      default:
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          color: "bg-gray-500",
          textColor: "text-gray-500",
          label: status.charAt(0).toUpperCase() + status.slice(1),
          step: 0,
        }
    }
  }

  // Format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return format(date, "MMM dd, yyyy")
    } catch (error) {
      return dateString.split("T")[0]
    }
  }

  // Render progress bar based on order status
  const renderProgressBar = (status) => {
    const statusInfo = getStatusInfo(status)
    const step = statusInfo.step

    // If rejected, show special progress bar
    if (step === -1) {
      return (
        <>
          <div className="flex items-center space-x-2 mb-4">
            <div className="h-3 w-3 rounded-full bg-red-600"></div>
            <div className="h-0.5 w-10 bg-red-600"></div>
            <div className="h-3 w-3 rounded-full bg-red-600"></div>
            <div className="h-0.5 w-10 bg-gray-300"></div>
            <div className="h-3 w-3 rounded-full bg-gray-300"></div>
            <div className="h-0.5 w-10 bg-gray-300"></div>
            <div className="h-3 w-3 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex justify-between text-xs text-amber-700">
            <span>Order Placed</span>
            <span className="text-red-600 font-medium">Rejected</span>
            <span className="invisible">Spacer</span>
            <span className="invisible">Spacer</span>
          </div>
        </>
      )
    }

    return (
      <>
        <div className="flex items-center space-x-2 mb-4">
          {/* Order Placed - Always completed */}
          <div className="h-3 w-3 rounded-full bg-amber-500"></div>
          <div className={`h-0.5 w-10 ${step >= 1 ? "bg-green-500" : "bg-gray-300"}`}></div>

          {/* Confirmed */}
          <div className={`h-3 w-3 rounded-full ${step >= 1 ? "bg-green-500" : "bg-gray-300"}`}></div>
          <div className={`h-0.5 w-10 ${step >= 2 ? "bg-blue-500" : "bg-gray-300"}`}></div>

          {/* In Process */}
          <div className={`h-3 w-3 rounded-full ${step >= 2 ? "bg-blue-500" : "bg-gray-300"}`}></div>
          <div className={`h-0.5 w-10 ${step >= 3 ? "bg-indigo-500" : "bg-gray-300"}`}></div>

          {/* In Shipping */}
          <div className={`h-3 w-3 rounded-full ${step >= 3 ? "bg-indigo-500" : "bg-gray-300"}`}></div>
          <div className={`h-0.5 w-10 ${step >= 4 ? "bg-emerald-500" : "bg-gray-300"}`}></div>

          {/* Delivered */}
          <div className={`h-3 w-3 rounded-full ${step >= 4 ? "bg-emerald-500" : "bg-gray-300"}`}></div>
        </div>

        {/* Mobile view - stacked labels */}
        <div className="md:hidden flex flex-wrap justify-between text-xs text-amber-700 gap-y-2">
          <div className="w-1/3 text-center">
            <span className="text-amber-500 block">Placed</span>
          </div>
          <div className="w-1/3 text-center">
            <span className={`block ${step >= 1 ? "text-green-500" : ""}`}>Confirmed</span>
          </div>
          <div className="w-1/3 text-center">
            <span className={`block ${step >= 2 ? "text-blue-500" : ""}`}>In Process</span>
          </div>
          <div className="w-1/3 text-center">
            <span className={`block ${step >= 3 ? "text-indigo-500" : ""}`}>Shipping</span>
          </div>
          <div className="w-1/3 text-center">
            <span className={`block ${step >= 4 ? "text-emerald-500" : ""}`}>Delivered</span>
          </div>
        </div>

        {/* Desktop view - horizontal labels */}
        <div className="hidden md:grid grid-cols-5 text-xs text-amber-700">
          <span className="text-amber-500">Placed</span>
          <span className={step >= 1 ? "text-green-500" : ""}>Confirmed</span>
          <span className={step >= 2 ? "text-blue-500" : ""}>In Process</span>
          <span className={step >= 3 ? "text-indigo-500" : ""}>Shipping</span>
          <span className={step >= 4 ? "text-emerald-500" : ""}>Delivered</span>
        </div>
      </>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 rounded-xl p-4 md:p-6 shadow-md border border-amber-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-amber-800 flex items-center">
              <ShoppingBag className="mr-2 h-5 md:h-6 w-5 md:w-6" />
              Your Orders
            </h1>
            <p className="text-amber-600 mt-1 text-sm md:text-base">Track, view and manage your purchase history</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 border-amber-300 focus:border-amber-500 focus:ring-amber-500 placeholder-amber-400 w-full"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px] border-amber-300 focus:border-amber-500 focus:ring-amber-500">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-amber-500" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full sm:w-[150px] border-amber-300 focus:border-amber-500 focus:ring-amber-500">
                <div className="flex items-center">
                  <ArrowUpDown className="mr-2 h-4 w-4 text-amber-500" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-amber-100 border border-amber-300 p-1 overflow-x-auto flex whitespace-nowrap w-full">
          <TabsTrigger value="all" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            All Orders
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            Recent Orders
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            Pending
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            Confirmed
          </TabsTrigger>
          <TabsTrigger value="delivered" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            Delivered
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {filteredOrders.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.orderStatus)

                return (
                  <Card
                    key={order._id}
                    className="overflow-hidden border border-amber-300 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Status indicator */}
                      <div className={`w-full md:w-2 ${statusInfo.color}`}></div>

                      <div className="flex-1 p-0">
                        <CardHeader className="bg-gradient-to-r from-amber-200/50 via-amber-100/50 to-yellow-200/50 border-b border-amber-300 p-4 md:p-6">
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                              <div className="flex items-center">
                                <Package className="h-5 w-5 text-amber-700 mr-2" />
                                <CardTitle className="text-amber-800 text-lg">
                                  Order #{order._id.substring(order._id.length - 8)}
                                </CardTitle>
                              </div>
                              <p className="text-amber-600 text-sm mt-1 flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(order.orderDate)}
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <Badge className={`py-1.5 px-3 flex items-center gap-1.5 ${statusInfo.color} text-white`}>
                                {statusInfo.icon}
                                {statusInfo.label}
                              </Badge>

                              <div className="text-right">
                                <p className="text-amber-600 text-sm">Total Amount</p>
                                <p className="text-amber-800 font-bold">₹{order.totalAmount.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="p-4 md:p-6">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="space-y-2 w-full md:w-3/4">
                              {/* Order progress indicator */}
                              {renderProgressBar(order.orderStatus)}
                            </div>

                            <Button
                              onClick={() => handleFetchOrderDetails(order._id)}
                              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full md:w-auto"
                            >
                              View Details
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-amber-50 rounded-lg border border-amber-200">
              <ShoppingBag className="h-12 w-12 text-amber-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-amber-800 mb-1">No orders found</h3>
              <p className="text-amber-600">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your filters to see more results"
                  : "You haven't placed any orders yet"}
              </p>
            </div>
          )}
        </TabsContent>

        {/* Recent Orders Tab */}
        <TabsContent value="recent" className="mt-6">
          {filteredOrders.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredOrders.slice(0, 3).map((order) => {
                const statusInfo = getStatusInfo(order.orderStatus)

                return (
                  <Card
                    key={order._id}
                    className="overflow-hidden border border-amber-300 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Status indicator */}
                      <div className={`w-full md:w-2 ${statusInfo.color}`}></div>

                      <div className="flex-1 p-0">
                        <CardHeader className="bg-gradient-to-r from-amber-200/50 via-amber-100/50 to-yellow-200/50 border-b border-amber-300 p-4 md:p-6">
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                              <div className="flex items-center">
                                <Package className="h-5 w-5 text-amber-700 mr-2" />
                                <CardTitle className="text-amber-800 text-lg">
                                  Order #{order._id.substring(order._id.length - 8)}
                                </CardTitle>
                              </div>
                              <p className="text-amber-600 text-sm mt-1 flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(order.orderDate)}
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <Badge className={`py-1.5 px-3 flex items-center gap-1.5 ${statusInfo.color} text-white`}>
                                {statusInfo.icon}
                                {statusInfo.label}
                              </Badge>

                              <div className="text-right">
                                <p className="text-amber-600 text-sm">Total Amount</p>
                                <p className="text-amber-800 font-bold">₹{order.totalAmount.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="p-4 md:p-6">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="space-y-2 w-full md:w-3/4">
                              {/* Order progress indicator */}
                              {renderProgressBar(order.orderStatus)}
                            </div>

                            <Button
                              onClick={() => handleFetchOrderDetails(order._id)}
                              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full md:w-auto"
                            >
                              View Details
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-amber-50 rounded-lg border border-amber-200">
              <ShoppingBag className="h-12 w-12 text-amber-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-amber-800 mb-1">No recent orders found</h3>
              <p className="text-amber-600">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your filters to see more results"
                  : "You haven't placed any orders recently"}
              </p>
            </div>
          )}
        </TabsContent>

        {/* Status-specific tabs */}
        {["pending", "confirmed", "in process", "in shipping", "delivered", "rejected"].map((status) => (
          <TabsContent key={status} value={status} className="mt-6">
            {filteredOrders.filter((order) => order.orderStatus.toLowerCase() === status).length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredOrders
                  .filter((order) => order.orderStatus.toLowerCase() === status)
                  .map((order) => {
                    const statusInfo = getStatusInfo(order.orderStatus)

                    return (
                      <Card
                        key={order._id}
                        className="overflow-hidden border border-amber-300 hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Status indicator */}
                          <div className={`w-full md:w-2 ${statusInfo.color}`}></div>

                          <div className="flex-1 p-0">
                            <CardHeader className="bg-gradient-to-r from-amber-200/50 via-amber-100/50 to-yellow-200/50 border-b border-amber-300 p-4 md:p-6">
                              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                <div>
                                  <div className="flex items-center">
                                    <Package className="h-5 w-5 text-amber-700 mr-2" />
                                    <CardTitle className="text-amber-800 text-lg">
                                      Order #{order._id.substring(order._id.length - 8)}
                                    </CardTitle>
                                  </div>
                                  <p className="text-amber-600 text-sm mt-1 flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {formatDate(order.orderDate)}
                                  </p>
                                </div>

                                <div className="flex items-center gap-3">
                                  <Badge
                                    className={`py-1.5 px-3 flex items-center gap-1.5 ${statusInfo.color} text-white`}
                                  >
                                    {statusInfo.icon}
                                    {statusInfo.label}
                                  </Badge>

                                  <div className="text-right">
                                    <p className="text-amber-600 text-sm">Total Amount</p>
                                    <p className="text-amber-800 font-bold">₹{order.totalAmount.toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>

                            <CardContent className="p-4 md:p-6">
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="space-y-2 w-full md:w-3/4">
                                  {/* Order progress indicator */}
                                  {renderProgressBar(order.orderStatus)}
                                </div>

                                <Button
                                  onClick={() => handleFetchOrderDetails(order._id)}
                                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full md:w-auto"
                                >
                                  View Details
                                  <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
              </div>
            ) : (
              <div className="text-center py-12 bg-amber-50 rounded-lg border border-amber-200">
                {status === "pending" && <Clock className="h-12 w-12 text-amber-300 mx-auto mb-4" />}
                {status === "confirmed" && <CheckCircle className="h-12 w-12 text-green-300 mx-auto mb-4" />}
                {status === "in process" && <Box className="h-12 w-12 text-blue-300 mx-auto mb-4" />}
                {status === "in shipping" && <Truck className="h-12 w-12 text-indigo-300 mx-auto mb-4" />}
                {status === "delivered" && <PackageCheck className="h-12 w-12 text-emerald-300 mx-auto mb-4" />}
                {status === "rejected" && <XCircle className="h-12 w-12 text-red-300 mx-auto mb-4" />}

                <h3 className="text-lg font-medium text-amber-800 mb-1">
                  No {status.charAt(0).toUpperCase() + status.slice(1)} orders
                </h3>
                <p className="text-amber-600">You don't have any {status} orders at the moment</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Dialog to show order details */}
      {orderDetails && (
        <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
          <ShoppingOrderDetailsView orderDetails={orderDetails} />
        </Dialog>
      )}
    </div>
  )
}

export default ShoppingOrders


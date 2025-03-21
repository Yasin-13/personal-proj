"use client"

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import AdminOrderDetailsView from "./order-details"
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")

  const { orderList, orderDetails } = useSelector((state) => state.adminOrder)
  const dispatch = useDispatch()

  function handleFetchOrderDetails(getId) {
    setCurrentOrderId(getId)
    dispatch(getOrderDetailsForAdmin(getId))
  }

  useEffect(() => {
    if (currentOrderId) {
      setOpenDetailsDialog(true)
    }
  }, [currentOrderId])

  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])

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
        }
      case "inprocess":
        return {
          icon: <Box className="h-5 w-5" />,
          color: "bg-blue-500",
          textColor: "text-blue-500",
          label: "InProcess",
        }
      case "inshipping":
        return {
          icon: <Truck className="h-5 w-5" />,
          color: "bg-indigo-500",
          textColor: "text-indigo-500",
          label: "InShipping",
        }
      case "delivered":
        return {
          icon: <PackageCheck className="h-5 w-5" />,
          color: "bg-emerald-500",
          textColor: "text-emerald-500",
          label: "Delivered",
        }
      case "rejected":
        return {
          icon: <XCircle className="h-5 w-5" />,
          color: "bg-red-600",
          textColor: "text-red-600",
          label: "Rejected",
        }
      case "pending":
        return {
          icon: <Clock className="h-5 w-5" />,
          color: "bg-amber-500",
          textColor: "text-amber-500",
          label: "Pending",
        }
      default:
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          color: "bg-gray-500",
          textColor: "text-gray-500",
          label: status.charAt(0).toUpperCase() + status.slice(1),
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

  // Render order card for mobile view
  const renderOrderCard = (order, index, totalOrders) => {
    const statusInfo = getStatusInfo(order.orderStatus)
    // Calculate reverse index (newest = 1)
    const reverseIndex = totalOrders - index

    return (
      <Card key={order._id} className="mb-4 border-amber-300">
        <div className={`w-full h-2 ${statusInfo.color}`}></div>
        <CardHeader className="p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                #{reverseIndex}
              </Badge>
              <Package className="h-5 w-5 text-amber-700" />
              <CardTitle className="text-base text-amber-800">#{order._id.substring(order._id.length - 8)}</CardTitle>
            </div>
            <Badge className={`py-1 px-2 flex items-center gap-1 ${statusInfo.color} text-white`}>
              {statusInfo.icon}
              <span className="text-xs">{statusInfo.label}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <div>
              <p className="text-amber-600">Date</p>
              <p className="font-medium flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-amber-500" />
                {formatDate(order.orderDate)}
              </p>
            </div>
            <div>
              <p className="text-amber-600">Amount</p>
              <p className="font-medium">₹{order.totalAmount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-amber-600">Items</p>
              <p className="font-medium">{order.items?.length || 0} items</p>
            </div>
          </div>
          <Button
            onClick={() => handleFetchOrderDetails(order._id)}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
          >
            Manage Order
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 max-w-[100vw]">
      <div className="bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 rounded-xl p-4 shadow-md border border-amber-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-amber-800 flex items-center">
              <ShoppingBag className="mr-2 h-5 md:h-6 w-5 md:w-6" />
              Order Management
            </h1>
            <p className="text-amber-600 mt-1 text-sm md:text-base">View, update and manage all customer orders</p>
          </div>

          {/* Mobile filter button */}
          <div className="md:hidden w-full">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full border-amber-300 text-amber-800">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters & Search
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh] rounded-t-xl">
                <div className="py-6 space-y-4">
                  <h3 className="text-lg font-medium text-amber-800 mb-4">Search & Filter Orders</h3>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-700">Search by Order ID</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500" />
                      <Input
                        placeholder="Search order ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 border-amber-300 focus:border-amber-500 focus:ring-amber-500 placeholder-amber-400 w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-700">Filter by Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full border-amber-300 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="inprocess">In Process</SelectItem>
                        <SelectItem value="inshipping">In Shipping</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-700">Sort Orders</label>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                      <SelectTrigger className="w-full border-amber-300 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop filters */}
          <div className="hidden md:flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500" />
              <Input
                placeholder="Search order ID..."
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
                <SelectItem value="inprocess">In Process</SelectItem>
                <SelectItem value="inshipping">In Shipping</SelectItem>
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

      <div className="w-full overflow-x-auto pb-2">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-amber-100 border border-amber-300 p-1 flex w-max min-w-full">
            <TabsTrigger value="all" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              All Orders
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Pending
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Confirmed
            </TabsTrigger>
            <TabsTrigger value="inprocess" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              In Process
            </TabsTrigger>
            <TabsTrigger
              value="inshipping"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              In Shipping
            </TabsTrigger>
            <TabsTrigger value="delivered" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Delivered
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Rejected
            </TabsTrigger>
          </TabsList>

          {/* All Orders Tab */}
          <TabsContent value="all" className="mt-4">
            <Card className="border-amber-300">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
                <CardTitle className="text-amber-800">All Orders</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {filteredOrders.length > 0 ? (
                  <>
                    {/* Mobile view - cards */}
                    <div className="md:hidden p-4 space-y-4">
                      {filteredOrders.map((order, index) => renderOrderCard(order, index, filteredOrders.length))}
                    </div>

                    {/* Desktop view - table */}
                    <div className="hidden md:block overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-amber-50">
                          <TableRow>
                            <TableHead className="w-[80px]">#</TableHead>
                            <TableHead className="w-[180px]">Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredOrders.map((order, index) => {
                            const statusInfo = getStatusInfo(order.orderStatus)
                            // Calculate reverse index (newest = 1)
                            const reverseIndex = filteredOrders.length - index

                            return (
                              <TableRow key={order._id} className="hover:bg-amber-50">
                                <TableCell className="font-medium">{reverseIndex}</TableCell>
                                <TableCell className="font-medium">
                                  #{order._id.substring(order._id.length - 8)}
                                </TableCell>
                                <TableCell>{formatDate(order.orderDate)}</TableCell>
                                <TableCell>
                                  <Badge
                                    className={`py-1 px-3 flex items-center gap-1.5 ${statusInfo.color} text-white`}
                                  >
                                    {statusInfo.icon}
                                    {statusInfo.label}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                  ₹{order.totalAmount.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    onClick={() => handleFetchOrderDetails(order._id)}
                                    className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                                  >
                                    Manage
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 bg-amber-50">
                    <ShoppingBag className="h-12 w-12 text-amber-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-amber-800 mb-1">No orders found</h3>
                    <p className="text-amber-600">
                      {searchTerm || statusFilter !== "all"
                        ? "Try adjusting your filters to see more results"
                        : "There are no orders in the system yet"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Status-specific tabs */}
          {["pending", "confirmed", "inprocess", "inshipping", "delivered", "rejected"].map((status) => (
            <TabsContent key={status} value={status} className="mt-4">
              <Card className="border-amber-300">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
                  <CardTitle className="text-amber-800">
                    {status.charAt(0).toUpperCase() + status.slice(1)} Orders
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredOrders.filter((order) => order.orderStatus.toLowerCase() === status).length > 0 ? (
                    <>
                      {/* Mobile view - cards */}
                      <div className="md:hidden p-4 space-y-4">
                        {filteredOrders
                          .filter((order) => order.orderStatus.toLowerCase() === status)
                          .map((order, index, filteredStatusOrders) =>
                            renderOrderCard(order, index, filteredStatusOrders.length),
                          )}
                      </div>

                      {/* Desktop view - table */}
                      <div className="hidden md:block overflow-x-auto">
                        <Table>
                          <TableHeader className="bg-amber-50">
                            <TableRow>
                              <TableHead className="w-[80px]">#</TableHead>
                              <TableHead className="w-[180px]">Order ID</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredOrders
                              .filter((order) => order.orderStatus.toLowerCase() === status)
                              .map((order, index, filteredStatusOrders) => {
                                const statusInfo = getStatusInfo(order.orderStatus)
                                // Calculate reverse index (newest = 1)
                                const reverseIndex = filteredStatusOrders.length - index

                                return (
                                  <TableRow key={order._id} className="hover:bg-amber-50">
                                    <TableCell className="font-medium">{reverseIndex}</TableCell>
                                    <TableCell className="font-medium">
                                      #{order._id.substring(order._id.length - 8)}
                                    </TableCell>
                                    <TableCell>{formatDate(order.orderDate)}</TableCell>
                                    <TableCell>
                                      <Badge
                                        className={`py-1 px-3 flex items-center gap-1.5 ${statusInfo.color} text-white`}
                                      >
                                        {statusInfo.icon}
                                        {statusInfo.label}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                      ₹{order.totalAmount.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button
                                        onClick={() => handleFetchOrderDetails(order._id)}
                                        className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                                      >
                                        Manage
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                          </TableBody>
                        </Table>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12 bg-amber-50">
                      {status === "pending" && <Clock className="h-12 w-12 text-amber-300 mx-auto mb-4" />}
                      {status === "confirmed" && <CheckCircle className="h-12 w-12 text-green-300 mx-auto mb-4" />}
                      {status === "inprocess" && <Box className="h-12 w-12 text-blue-300 mx-auto mb-4" />}
                      {status === "inshipping" && <Truck className="h-12 w-12 text-indigo-300 mx-auto mb-4" />}
                      {status === "delivered" && <PackageCheck className="h-12 w-12 text-emerald-300 mx-auto mb-4" />}
                      {status === "rejected" && <XCircle className="h-12 w-12 text-red-300 mx-auto mb-4" />}

                      <h3 className="text-lg font-medium text-amber-800 mb-1">
                        No {status.charAt(0).toUpperCase() + status.slice(1)} orders
                      </h3>
                      <p className="text-amber-600">There are no orders with this status at the moment</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Dialog to show order details */}
      {orderDetails && (
        <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
          <AdminOrderDetailsView orderDetails={orderDetails} />
        </Dialog>
      )}
    </div>
  )
}

export default AdminOrdersView


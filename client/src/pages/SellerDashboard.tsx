'use client'

import React, { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Label } from "@/components/ui/label";
import * as z from 'zod'
import { BarChart, Users, Package, DollarSign, ImageIcon, Bell, LogOut, Car } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { 
  useSellerInfo, 
  useUpdateSellerInfo, 
  useChangePassword, 
  useWalletBalance, 
  useRevenueSummary, 
  useOrders, 
  useOrderCounts, 
  useActiveProductCount,
  useProductReviews,
  useRecentOrders
} from '@/hooks/useSellerDashboard'
import { 
  OrderItemPayload, 
  OrderItemStateEnum, 
  Review,
  WalletBalanceResponse,
  RevenueSummaryResponse,
  OrderCountResponse,
  ProductCountResponse
} from '@/types/sellerdashboard'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Toaster, toast } from 'sonner'
// Mock data (unchanged)
const recentOrders = [
  { id: '001', amount: 120.50, customerName: 'John Doe' },
  { id: '002', amount: 85.75, customerName: 'Jane Smith' },
  { id: '003', amount: 200.00, customerName: 'Bob Johnson' },
  { id: '004', amount: 150.25, customerName: 'Alice Brown' },
  { id: '005', amount: 95.00, customerName: 'Charlie Davis' },
]

const orderDetails = {
  products: ['Product A', 'Product B'],
  orderValue: 120.50,
  status: 'Shipped',
  address: '123 Main St, City, Country',
  customerName: 'John Doe',
}

const mockReviews = Array.from({ length: 50 }, (_, i) => ({
  id: `ORD${String(i + 1).padStart(3, '0')}`,
  productName: `Product ${i + 1}`,
  rating: Math.floor(Math.random() * 5) + 1,
  review: `This is a review for Product ${i + 1}. It's a ${['great', 'good', 'average', 'poor'][Math.floor(Math.random() * 4)]} product.`,
}))

const mockRequests = [
  { id: 'REQ001', orderId: 'ORD001', productName: 'Product A', status: 'Pending', reason: 'Item not as described' },
  { id: 'REQ002', orderId: 'ORD002', productName: 'Product B', status: 'Approved', reason: 'Defective product' },
  { id: 'REQ003', orderId: 'ORD003', productName: 'Product C', status: 'Rejected', reason: 'Changed mind' },
  { id: 'REQ004', orderId: 'ORD004', productName: 'Product D', status: 'Pending', reason: 'Wrong size' },
  { id: 'REQ005', orderId: 'ORD005', productName: 'Product E', status: 'Pending', reason: 'Late delivery' },
]

const mockOrders = Array.from({ length: 20 }, (_, i) => ({
  id: `ORD${String(i + 1).padStart(3, '0')}`,
  value: Math.floor(Math.random() * 1000) + 50,
  customerName: `Customer ${i + 1}`,
  status: ['Pending', 'Shipped', 'Delivered'][Math.floor(Math.random() * 3)],
  date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
  products: ['Product A', 'Product B', 'Product C'].slice(0, Math.floor(Math.random() * 3) + 1),
  address: '123 Main St, City, Country',
}))

const mockProducts = Array.from({ length: 20 }, (_, i) => ({
  id: `PROD${String(i + 1).padStart(3, '0')}`,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 1000) + 50,
  stock: Math.floor(Math.random() * 100),
  category: ['Electronics', 'Clothing', 'Books', 'Home Appliances'][Math.floor(Math.random() * 4)],
  image: `/placeholder.svg?height=100&width=100`,
  description: `This is description for PROD ${i + 1}`,
}))

// Mock notifications




const productSchema = z.object({
  name: z.string().min(3, { message: 'Product name must be at least 3 characters' }),
  price: z.number().min(0.01, { message: 'Price must be greater than 0' }),
  stock: z.number().int().min(0, { message: 'Stock cannot be negative' }),
  category: z.string().min(1, { message: 'Category is required' }),
  image: z.instanceof(File).optional().refine((file) => {
    if (file) {
      return file.size <= 5 * 1024 * 1024; // 5MB limit
    }
    return true;
  }, 'Image must be 5MB or less'),
  description: z.string().min(1, { message: 'Product description can not be empty' }),
})

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [isEditing, setIsEditing] = useState(false)
  const [currentReviewPage, setCurrentReviewPage] = useState(1)
  const [refundFilter, setRefundFilter] = useState('All')
  const [requests, setRequests] = useState(mockRequests)
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingProduct, setEditingProduct] = useState<typeof mockProducts[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<typeof mockRequests[0] | null>(null)
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

  const reviewsPerPage = 10




  const productForm = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      stock: 0,
      category: '',
      description: '',
    },
  })


  const filteredRequests = refundFilter === 'All' ? requests : requests.filter(req => req.status === refundFilter)

  const handleRefundAction = (id: string, action: 'Approve' | 'Reject') => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === id ? { ...req, status: action === 'Approve' ? 'Approved' : 'Rejected' } : req
      )
    )
    toast.success(`Request ${action}${action.endsWith('e') ? 'd' : 'ed'}`)
    setIsDialogOpen(false)
    setSelectedRequest(null)
  }

  const sortedOrders = [...mockOrders].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
    } else if (sortBy === 'value') {
      return sortOrder === 'asc' ? a.value - b.value : b.value - a.value
    } else {
      return 0
    }
  })

  const handleSort = (newSortBy: string) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortOrder('asc')
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function onProductSubmit(values: z.infer<typeof productSchema>) {
    if (editingProduct) {
      setProducts(prevProducts =>
        prevProducts.map(p => p.id === editingProduct.id ? { ...p, ...values, image: values.image ? URL.createObjectURL(values.image) : p.image } : p)
      )
      toast.success('Product Updated successfully')
    } else {
      const newProduct = {
        id: `PROD${String(products.length + 1).padStart(3, '0')}`,
        ...values,
        image: values.image ? URL.createObjectURL(values.image) : '/placeholder.svg?height=100&width=100',
      }
      setProducts(prevProducts => [...prevProducts, newProduct])
      toast.success('Product Added successfully')
    }
    setEditingProduct(null)
    productForm.reset()
    setIsDialogOpen(false)
  }

  const handleEditProduct = (product: typeof mockProducts[0]) => {
    setEditingProduct(product)
    productForm.reset({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id))
    toast.success('Product Deleted successfully')
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Personal Information':
        return <PersonalInformationSection />
      case 'Product Reviews & Ratings':
        return (
          <Card className="shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Product Reviews & Ratings</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Review</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReviews.slice(
                    (currentReviewPage - 1) * reviewsPerPage,
                    currentReviewPage * reviewsPerPage
                  ).map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>{review.id}</TableCell>
                      <TableCell>{review.productName}</TableCell>
                      <TableCell>{review.rating} / 5</TableCell>
                      <TableCell>{review.review}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentReviewPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentReviewPage === 1}
                  />
                </PaginationItem>
                {[...Array(Math.ceil(mockReviews.length / reviewsPerPage))].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentReviewPage(i + 1)}
                      isActive={currentReviewPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentReviewPage(prev => Math.min(prev + 1, Math.ceil(mockReviews.length / reviewsPerPage)))}
                    disabled={currentReviewPage === Math.ceil(mockReviews.length / reviewsPerPage)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Card>
        )
      case 'Order Refund & Exchange':
        return (
          <Card className="shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Order Refund & Exchange</h2>
            <Select onValueChange={setRefundFilter} defaultValue={refundFilter}>
              <SelectTrigger className="w-[180px] mb-4">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.orderId}</TableCell>
                      <TableCell>{request.productName}</TableCell>
                      <TableCell>{request.status}</TableCell>
                      <TableCell>
                        <Dialog open={isDialogOpen && selectedRequest?.id === request.id} onOpenChange={(open) => {
                          setIsDialogOpen(open)
                          if (!open) setSelectedRequest(null)
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => setSelectedRequest(request)}>Review</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Request Details</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <p><strong>Order ID:</strong> {request.orderId}</p>
                              <p><strong>Product:</strong> {request.productName}</p>
                              <p><strong>Status:</strong> {request.status}</p>
                              <p><strong>Reason:</strong> {request.reason}</p>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                              <Button
                                onClick={() => handleRefundAction(request.id, 'Approve')}
                                disabled={request.status !== 'Pending'}
                              >
                                Approve
                              </Button>
                              <Button
                                onClick={() => handleRefundAction(request.id, 'Reject')}
                                disabled={request.status !== 'Pending'}
                                variant="destructive"
                              >
                                Reject
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )
      case 'Order History':
        return (
          <Card className="shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            <div className="mb-4">
              <Select onValueChange={handleSort} defaultValue={sortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="value">Order Value</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Order Value</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>${order.value.toFixed(2)}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">Details</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <p><strong>Order ID:</strong> {order.id}</p>
                              <p><strong>Customer:</strong> {order.customerName}</p>
                              <p><strong>Products:</strong> {order.products.join(', ')}</p>
                              <p><strong>Order Value:</strong> ${order.value.toFixed(2)}</p>
                              <p><strong>Status:</strong> {order.status}</p>
                              <p><strong>Date:</strong> {order.date}</p>
                              <p><strong>Address:</strong> {order.address}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )
      case 'Product Listing':
        return (
          <Card className="shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Product Listing</h2>
            <div className="flex justify-between mb-4">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingProduct(null)
                    productForm.reset({
                      name: '',
                      price: 0,
                      stock: 0,
                      category: '',
                      description: '',
                    })
                  }}>
                    Add New Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                  </DialogHeader>
                  <Form {...productForm}>
                    <form onSubmit={productForm.handleSubmit(onProductSubmit)} className="space-y-8">
                      <FormField
                        control={productForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Electronics">Electronics</SelectItem>
                                  <SelectItem value="Home Appliances">Home Appliances</SelectItem>
                                  <SelectItem value="Sports">Sports</SelectItem>
                                  <SelectItem value="Toys">Toys</SelectItem>
                                  <SelectItem value="Books">Books</SelectItem>
                                  <SelectItem value="Clothing">Clothing</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Description</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={productForm.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Image</FormLabel>
                            <FormControl>
                              <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => handleEditProduct(product)}>Edit</Button>
                          <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )
      default:
       <OverviewSection/>
    }
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="shadow-sm border-b-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">HawkTU</h1>
          <div className="flex items-center space-x-4">
            {/* Logout Button */}
            <Button
              variant="outline"
              onClick={() => setIsLogoutPopupOpen(true)} // Open the logout popup
              className="border-gray-500"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1 ">
        <div className="w-64 shadow-md p-4 border-r-2">
          <h2 className="text-xl font-bold mb-6 text-center">Seller Dashboard</h2>
          <nav>
            {['Overview', 'Personal Information', 'Product Reviews & Ratings', 'Order Refund & Exchange', 'Order History', 'Product Listing'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`block w-full text-left py-2 px-4 rounded transition-colors duration-200 ${activeTab === item
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <main className="flex-1 p-8 bg-gray-100/40 p-6 dark:bg-gray-800/40 overflow-auto">
          {renderContent()}
        </main>
      </div>

      <footer className="py-4 text-center border-t-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>&copy; 2024 HawkTU. All rights reserved.</p>
          <div className="mt-2">
            <a className="text-blue-600 hover:underline mr-4">Privacy Policy</a>
            <a className="text-blue-600 hover:underline mr-4">Terms of Service</a>
            <a className="text-blue-600 hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>

      {/* Logout Confirmation Popup */}
      {isLogoutPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold">Are you sure you want to logout?</h2>
            <div className="mt-4 flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsLogoutPopupOpen(false)} // Close the popup if cancelled
                className="border-gray-400 text-gray-600"
              >
                Cancel
              </Button>
              <Link to="/">
                <Button
                  variant="outline"
                  onClick={() => localStorage.clear()}
                  className="bg-red-500 text-white border-red-500"
                >
                  Logout
                </Button>

              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Toaster for notifications */}
      <Toaster />
    </div>
  );
}
const OverviewSection = () => {
  const { walletBalance, loading: walletLoading, error: walletError } = useWalletBalance()
  const { revenueSummary, loading: revenueLoading, error: revenueError } = useRevenueSummary()
  const { orderCounts, loading: orderCountsLoading, error: orderCountsError } = useOrderCounts()
  const { productCount, loading: productCountLoading, error: productCountError } = useActiveProductCount()
  const { recentOrders, loading: recentOrdersLoading, error: recentOrdersError } = useRecentOrders()

  if (walletLoading || revenueLoading || orderCountsLoading || productCountLoading || recentOrdersLoading) {
    return <p>Loading overview data...</p>
  }

  if (walletError || revenueError || orderCountsError || productCountError || recentOrdersError) {
    return <p>Error loading overview data. Please try again later.</p>
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Overview</h1>
      <div className="mb-5 text-5xl font-bold">
        <label>Welcome back, Seller</label>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenueSummary?.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +{((revenueSummary?.thisMonthRevenue || 0) / (revenueSummary?.lastMonthRevenue || 1) * 100 - 100).toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderCounts?.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +{((orderCounts?.thisMonthOrders || 0) / (orderCounts?.lastMonthOrders || 1) * 100 - 100).toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${walletBalance?.walletBalance.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productCount?.totalProductCount}</div>
            <p className="text-xs text-muted-foreground">
              +{((productCount?.thisMonthProductCount || 0) / (productCount?.lastMonthProductCount || 1) * 100 - 100).toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className='mt-8'>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="shadow-md rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders?.orders.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.state}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
function PersonalInformationSection() {
  const { sellerInfo, loading, error } = useSellerInfo()
  const { updateInfo, loading: updateLoading, error: updateError } = useUpdateSellerInfo()
  const [isEditing, setIsEditing] = useState(false)
  const [isAddressEditing, setIsAddressEditing] = useState(false)
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    businessName: "",
    address: {
      country: "",
      city: "",
      district: "",
      addressLineOne: "",
      addressLineTwo: "",
      additionalInfo: "",
    },
  })

  const email = localStorage.getItem('email')

  useEffect(() => {
    if (sellerInfo) {
      setUser({
        firstName: sellerInfo.firstName,
        lastName: sellerInfo.lastName,
        phoneNumber: sellerInfo.phoneNumber,
        businessName: sellerInfo.businessName,
        address: sellerInfo.address,
      })
    }
  }, [sellerInfo])

  const handleEditPersonalInfo = () => setIsEditing(true)
  const handleEditAddress = () => setIsAddressEditing(true)

  const handleSavePersonalInfo = async (e) => {
    e.preventDefault()
    try {
      await updateInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        businessName: user.businessName,
        address: user.address,
      })
      setIsEditing(false)
      toast.success("Personal information updated successfully")
    } catch (error) {
      toast.error("Failed to update personal information")
    }
  }

  const handleSaveAddressInfo = async (e) => {
    e.preventDefault()
    try {
      await updateInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        businessName: user.businessName,
        address: user.address,
      })
      setIsAddressEditing(false)
      toast.success("Address information updated successfully")
    } catch (error) {
      toast.error("Failed to update address information")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1]
      setUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [addressField]: value,
        },
      }))
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }))
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <Card className="shadow-md rounded-lg p-6">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-2">
              <p><strong>First Name:</strong> {user.firstName}</p>
              <p><strong>Last Name:</strong> {user.lastName}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Phone:</strong> {user.phoneNumber}</p>
              <p><strong>Business Name:</strong> {user.businessName}</p>
              <Button onClick={handleEditPersonalInfo} className="mt-4">Edit Profile</Button>
            </div>
          ) : (
            <form onSubmit={handleSavePersonalInfo} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={user.firstName} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={user.lastName} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" value={email} disabled className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone</Label>
                <Input id="phoneNumber" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" name="businessName" value={user.businessName} onChange={handleChange} className="w-full" />
              </div>
              <Button type="submit" className="mt-4" disabled={updateLoading}>
                {updateLoading ? "Saving..." : "Save Changes"}
              </Button>
              {updateError && <p className="text-red-500">{updateError}</p>}
            </form>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-md rounded-lg p-6">
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
        </CardHeader>
        <CardContent>
          {!isAddressEditing ? (
            <div className="space-y-2">
              <p><strong>Address Line 1:</strong> {user.address.addressLineOne}</p>
              <p><strong>Address Line 2:</strong> {user.address.addressLineTwo}</p>
              <p><strong>City:</strong> {user.address.city}</p>
              <p><strong>District:</strong> {user.address.district}</p>
              <p><strong>Country:</strong> {user.address.country}</p>
              <p><strong>Additional Info:</strong> {user.address.additionalInfo}</p>
              <Button onClick={handleEditAddress} className="mt-4">Edit Address</Button>
            </div>
          ) : (
            <form onSubmit={handleSaveAddressInfo} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address.addressLineOne">Address Line 1</Label>
                <Input id="address.addressLineOne" name="address.addressLineOne" value={user.address.addressLineOne} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.addressLineTwo">Address Line 2 (Optional)</Label>
                <Input id="address.addressLineTwo" name="address.addressLineTwo" value={user.address.addressLineTwo} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.city">City</Label>
                <Input id="address.city" name="address.city" value={user.address.city} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.district">District</Label>
                <Input id="address.district" name="address.district" value={user.address.district} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.country">Country</Label>
                <Input id="address.country" name="address.country" value={user.address.country} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.additionalInfo">Additional Info (Optional)</Label>
                <Input id="address.additionalInfo" name="address.additionalInfo" value={user.address.additionalInfo} onChange={handleChange} className="w-full" />
              </div>
              <Button type="submit" className="mt-4" disabled={updateLoading}>
                {updateLoading ? "Saving..." : "Save Address Changes"}
              </Button>
              {updateError && <p className="text-red-500">{updateError}</p>}
            </form>
          )}
        </CardContent>
      </Card>

      <ChangePasswordSection />
    </div>
  )
}

function ChangePasswordSection() {
  const { changePwd, loading, error } = useChangePassword()
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("New passwords do not match.")
      return
    }

    const changePasswordPayload = {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    }

    try {
      await changePwd(changePasswordPayload)
      toast.success("Password changed successfully")
      setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" })
    } catch (error) {
      toast.error(error || "Failed to change password.")
    }
  }

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  return (
    <Card className="shadow-md rounded-lg p-6">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">Re-enter New Password</Label>
            <Input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </CardContent>
    </Card>
  )
}
'use client'

import React, { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { BarChart, Users, Package, DollarSign, ImageIcon, Bell, LogOut } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
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
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
const mockNotifications = [
  { id: 1, title: 'New Order', description: 'You have received a new order', time: '5 min ago', read: false },
  { id: 2, title: 'Product Review', description: 'A new review has been posted for Product A', time: '1 hour ago', read: false },
  { id: 3, title: 'Low Stock Alert', description: 'Product B is running low on stock', time: '2 hours ago', read: true },
]

// Schemas (unchanged)
const userInfoSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  newPassword: z.string().min(8, { message: 'Password must be at least 8 characters' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

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
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isNotificationSheetOpen, setIsNotificationSheetOpen] = useState(false)
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

  const reviewsPerPage = 10

  const userInfoForm = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      username: 'johndoe',
      email: 'john@example.com',
      phone: '+1234567890',
      address: '123 Main St, City, Country',
    },
  })

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

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

  const handleLogout = () => {
    setIsLogoutPopupOpen(false); // Close the popup
  };
  useEffect(() => {
    // Simulate receiving a new notification
    const timer = setTimeout(() => {
      const newNotification = {
        id: notifications.length + 1,
        title: 'New Notification',
        description: 'This is a new notification',
        time: 'Just now',
        read: false,
      }
      setNotifications(prev => [newNotification, ...prev])
      toast.success('New notification received!')
    }, 10000) // 10 seconds after component mount

    return () => clearTimeout(timer)
  }, [])

  function onUserInfoSubmit(values: z.infer<typeof userInfoSchema>) {
    console.log(values)
    setIsEditing(false)
    toast.success('User information updated successfully')
  }

  function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    console.log(values)
    passwordForm.reset()
    toast.success('Password updated successfully')
  }

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

  const unreadNotificationsCount = notifications.filter(n => !n.read).length

  const markNotificationAsRead = (id: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    )
  }
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(n => ({ ...n, read: true }))
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Personal Information':
        return (
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
              <Form {...userInfoForm}>
                <form onSubmit={userInfoForm.handleSubmit(onUserInfoSubmit)} className="space-y-4">
                  <FormField
                    control={userInfoForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={userInfoForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={userInfoForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={userInfoForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {isEditing ? (
                    <div className="flex space-x-4">
                      <Button type="submit" className="w-full">
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  )}
                </form>
              </Form>
            </div>

            <div className="shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Change Password</h2>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" className="" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" className="" />
                        </FormControl>
                        <FormDescription>
                          Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" className="" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">Update Password</Button>
                </form>
              </Form>
            </div>
          </div>
        )
      case 'Product Reviews & Ratings':
        return (
          <div className="shadow-md rounded-lg p-6">
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
          </div>
        )
      case 'Order Refund & Exchange':
        return (
          <div className="shadow-md rounded-lg p-6">
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
          </div>
        )
      case 'Order History':
        return (
          <div className="shadow-md rounded-lg p-6">
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
          </div>
        )
      case 'Product Listing':
        return (
          <div className="shadow-md rounded-lg p-6">
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
          </div>
        )
      default:
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">Overview</h1>
            <div className="mb-5 text-5xl font-bold">
              <label>Welcome back HawkTU</label>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground">+201 since last week</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Recent Orders</h2>
            <div className="shadow-md rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>${order.amount.toFixed(2)}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
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
                              <p><strong>Products:</strong> {orderDetails.products.join(', ')}</p>
                              <p><strong>Order Value:</strong> ${orderDetails.orderValue.toFixed(2)}</p>
                              <p><strong>Status:</strong> {orderDetails.status}</p>
                              <p><strong>Address:</strong> {orderDetails.address}</p>
                              <p><strong>Customer Name:</strong> {orderDetails.customerName}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )
    }
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">HawkTU</h1>
          <div className="flex items-center space-x-4">
            {/* Notification Button */}
            <Sheet open={isNotificationSheetOpen} onOpenChange={setIsNotificationSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative border-gray-500">
                  <Bell className="h-5 w-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="h-full overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Notifications</SheetTitle>
                  <SheetDescription>You have {unreadNotificationsCount} unread notifications</SheetDescription>
                  {/* Mark All as Read Button */}
                  {unreadNotificationsCount > 0 && (
                    <Button
                      variant="outline"
                      onClick={markAllAsRead}
                      className="mt-4 w-full border-gray-500 text-gray-700"
                    >
                      Mark All as Read
                    </Button>
                  )}
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg ${notification.read ? 'bg-gray-500' : 'bg-blue-500'}`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="text-sm text-gray-700">{notification.description}</p>
                      <p className="text-xs text-white-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
  
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
  
      <div className="flex flex-1">
        <div className="w-64 shadow-md p-4">
          <h2 className="text-xl font-bold mb-6 text-center">Seller Dashboard</h2>
          <nav>
            {['Overview', 'Personal Information', 'Product Reviews & Ratings', 'Order Refund & Exchange', 'Order History', 'Product Listing'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`block w-full text-left py-2 px-4 rounded transition-colors duration-200 ${
                  activeTab === item
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
  
        <main className="flex-1 p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>
  
      <footer className="py-4 text-center">
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
              <Link to="/landing">
                <a>
                  <Button
                    variant="outline"
                    onClick={handleLogout} // Optional, since redirection is handled by Link
                    className="bg-red-500 text-white border-red-500"
                  >
                    Logout
                  </Button>
                </a>
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
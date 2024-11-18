'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { BarChart, Users, Package, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
import { toast } from 'sonner'

// Mock data for recent orders
const recentOrders = [
  { id: '001', amount: 120.50, customerName: 'John Doe' },
  { id: '002', amount: 85.75, customerName: 'Jane Smith' },
  { id: '003', amount: 200.00, customerName: 'Bob Johnson' },
  { id: '004', amount: 150.25, customerName: 'Alice Brown' },
  { id: '005', amount: 95.00, customerName: 'Charlie Davis' },
]

// Mock data for order details
const orderDetails = {
  products: ['Product A', 'Product B'],
  orderValue: 120.50,
  status: 'Shipped',
  address: '123 Main St, City, Country',
  customerName: 'John Doe',
}

// Mock data for product reviews
const mockReviews = Array.from({ length: 50 }, (_, i) => ({
  id: `ORD${String(i + 1).padStart(3, '0')}`,
  productName: `Product ${i + 1}`,
  rating: Math.floor(Math.random() * 5) + 1,
  review: `This is a review for Product ${i + 1}. It's a ${['great', 'good', 'average', 'poor'][Math.floor(Math.random() * 4)]} product.`,
}))

// Mock data for refund/exchange requests
const mockRequests = [
  { id: 'REQ001', orderId: 'ORD001', productName: 'Product A', status: 'Pending', reason: 'Item not as described' },
  { id: 'REQ002', orderId: 'ORD002', productName: 'Product B', status: 'Approved', reason: 'Defective product' },
  { id: 'REQ003', orderId: 'ORD003', productName: 'Product C', status: 'Rejected', reason: 'Changed mind' },
  { id: 'REQ004', orderId: 'ORD004', productName: 'Product D', status: 'Pending', reason: 'Wrong size' },
  { id: 'REQ005', orderId: 'ORD005', productName: 'Product E', status: 'Pending', reason: 'Late delivery' },
]

// Mock data for orders
const mockOrders = Array.from({ length: 20 }, (_, i) => ({
  id: `ORD${String(i + 1).padStart(3, '0')}`,
  value: Math.floor(Math.random() * 1000) + 50,
  customerName: `Customer ${i + 1}`,
  status: ['Pending', 'Shipped', 'Delivered'][Math.floor(Math.random() * 3)],
  date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
  products: ['Product A', 'Product B', 'Product C'].slice(0, Math.floor(Math.random() * 3) + 1),
  address: '123 Main St, City, Country',
}))

// Mock data for products
const mockProducts = Array.from({ length: 20 }, (_, i) => ({
  id: `PROD${String(i + 1).padStart(3, '0')}`,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 1000) + 50,
  stock: Math.floor(Math.random() * 100),
  category: ['Electronics', 'Clothing', 'Books', 'Home & Garden'][Math.floor(Math.random() * 4)],
}))

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
})

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('Overview')

  // Personal Information Page state
  const [isEditing, setIsEditing] = useState(false)
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

  // Product Reviews Page state
  const [currentReviewPage, setCurrentReviewPage] = useState(1)
  const reviewsPerPage = 10

  // Order Refund & Exchange Page state
  const [refundFilter, setRefundFilter] = useState('All')
  const [requests, setRequests] = useState(mockRequests)

  // Order History Page state
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Product Listing Page state
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingProduct, setEditingProduct] = useState<typeof mockProducts[0] | null>(null)
  const productForm = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      stock: 0,
      category: '',
    },
  })

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
    toast.success(`Request ${action.toLowerCase()}d`)
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
        prevProducts.map(p => p.id === editingProduct.id ? { ...p, ...values } : p)
      )
      toast.success('Product updated successfully')
    } else {
      const newProduct = {
        id: `PROD${String(products.length + 1).padStart(3, '0')}`,
        ...values,
      }
      setProducts(prevProducts => [...prevProducts, newProduct])
      toast.success('Product added successfully')
    }
    setEditingProduct(null)
    productForm.reset()
  }

  const handleEditProduct = (product: typeof mockProducts[0]) => {
    setEditingProduct(product)
    productForm.reset(product)
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id))
    toast.success('Product deleted successfully')
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Personal Information':
        return (
          <div className="space-y-8">
            <div>
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
                    <Button type="submit">Save Changes</Button>
                  ) : (
                    <Button type="button" onClick={() => setIsEditing(true)}>Edit</Button>
                  )}
                </form>
              </Form>
            </div>

            <div>
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
                          <Input {...field} type="password" />
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
                          <Input {...field} type="password" />
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
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Update Password</Button>
                </form>
              </Form>
            </div>
          </div>
        )
      case 'Product Reviews & Ratings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Product Reviews & Ratings</h2>
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
          <div>
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Review</Button>
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
        )
      case 'Order History':
        return (
          <div>
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
        )
      case 'Product Listing':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Product Listing</h2>
            <div className="flex justify-between mb-4">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingProduct(null)
                    productForm.reset({
                      name: '',
                      price: 0,
                      stock: 0,
                      category: '',
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
                              <Input {...field} />
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
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
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => handleEditProduct(product)}>Edit</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
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
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button type="submit">Update Product</Button>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      default:
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">Overview</h1>
            
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
          </>
        )
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 p-4">
        <h2 className="text-xl font-bold mb-4">Seller Dashboard</h2>
        <nav>
          {['Overview', 'Personal Information', 'Product Reviews & Ratings', 'Order Refund & Exchange', 'Order History', 'Product Listing'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`block w-full text-left py-2 px-4 rounded ${activeTab === item ? 'bg-blue-500 text-white' : 'hover:bg-white-200'}`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  )
}
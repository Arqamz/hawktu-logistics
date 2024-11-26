"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
interface OrderDetails {
  id: string
  status: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  shippingAddress: string
  estimatedDelivery: string
}

const mockOrders = {
  '12345': {
    id: '12345',
    status: 'Shipped',
    items: [
      { name: 'Product A', quantity: 2, price: 19.99 },
      { name: 'Product B', quantity: 1, price: 29.99 },
    ],
    total: 69.97,
    shippingAddress: '123 Main St, Anytown, AN 12345',
    estimatedDelivery: '2023-06-15',
  },
  '67890': {
    id: '67890',
    status: 'Processing',
    items: [
      { name: 'Product C', quantity: 1, price: 49.99 },
    ],
    total: 49.99,
    shippingAddress: '456 Elm St, Othertown, OT 67890',
    estimatedDelivery: '2023-06-20',
  },
}

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('')
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleTrackOrder = () => {
    setIsLoading(true)
    setError('')
    
    // Simulate API call delay for tracking order
    setTimeout(() => {
      if (mockOrders[orderId as keyof typeof mockOrders]) {
        setOrderDetails(mockOrders[orderId as keyof typeof mockOrders])
        setIsDialogOpen(true)
      } else {
        setError('Order not found')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className=" shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link to="/landing">
          <h1 className="text-2xl font-bold text-primary">HawkTU</h1>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8 justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Order Tracking</CardTitle>
            <CardDescription className="text-center">Enter your order ID to track your package</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID"
                />
              </div>
              <Button onClick={handleTrackOrder} disabled={isLoading} className="w-full">
                {isLoading ? 'Tracking...' : 'Track Order'}
              </Button>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Dialog to show order details */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                Here are the details for your order:
              </DialogDescription>
            </DialogHeader>
            {orderDetails && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <Package className="text-primary" />
                  <div>
                    <p className="font-semibold">Order ID: {orderDetails.id}</p>
                    <p className="text-sm text-gray-500">Status: {orderDetails.status}</p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-2">Items:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {orderDetails.items.map((item, index) => (
                      <li key={index} className="text-sm">
                        {item.name} - Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-semibold">Total: ${orderDetails.total.toFixed(2)}</p>
                <div className="flex items-center space-x-2">
                  <Truck className="text-primary" />
                  <p className="text-sm">Shipping to: {orderDetails.shippingAddress}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-primary" />
                  <p className="text-sm">Estimated Delivery: {orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 HawkTU, All rights reserved.</p>
            <nav className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                <li><a href="#" className="hover:text-primary-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-foreground">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-foreground">Contact Us</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}


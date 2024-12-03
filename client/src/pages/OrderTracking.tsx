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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import useOrderStatus from '@/hooks/useOrderStatus'
import { OrderStatusDTO } from '@/types/shop'

const OrderTracking = () => {
  const [orderId, setOrderId] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { getOrderStatus, orderStatus, loading, error } = useOrderStatus()

  const handleTrackOrder = async () => {
    if (!orderId.trim() || isNaN(Number(orderId))) {
      return
    }

    const status = await getOrderStatus(Number(orderId))
    if (status) {
      setIsDialogOpen(true)
    }
  }

  const calculateOrderStatus = (orderItems: OrderStatusDTO['orderItems']) => {
    const allDelivered = orderItems.every(item => item.state === 'DELIVERED' || item.state === 'REFUND_ACCEPTED' || item.state === 'REFUND_REQUESTED')
    const allCancelled = orderItems.every(item => item.state === 'CANCELLED')
    const anyProcessingOrShipped = orderItems.some(item => item.state === 'PROCESSING' || item.state === 'SHIPPED')

    if (allDelivered) return 'Delivered'
    if (allCancelled) return 'Cancelled'
    if (anyProcessingOrShipped) return 'Processing'
    return 'Unknown'
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/landing">
            <h1 className="text-2xl font-bold text-primary">HawkTU</h1>
          </Link>
        </div>
      </header>

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
              <Button
                onClick={handleTrackOrder}
                disabled={!orderId.trim() || isNaN(Number(orderId)) || loading}
                className="w-full"
              >
                {loading ? 'Tracking...' : 'Track Order'}
              </Button>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                Here are the details for your order:
              </DialogDescription>
            </DialogHeader>
            {orderStatus && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <Package className="text-primary" />
                  <div>
                    <p className="font-semibold">Order ID: {orderId}</p>
                    <p className="text-sm text-gray-500">Status: {calculateOrderStatus(orderStatus.orderItems)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Truck className="text-primary" />
                  <p className="text-sm">
                    Shipping to: {orderStatus.orderItems[0]?.deliveryAddressString?.addressLineOne || ''} 
                    {orderStatus.orderItems[0]?.deliveryAddressString?.addressLineTwo || ''},
                    {orderStatus.orderItems[0]?.deliveryAddressString?.city || 'N/A'},
                    {orderStatus.orderItems[0]?.deliveryAddressString?.district || 'N/A'},
                    {orderStatus.orderItems[0]?.deliveryAddressString?.country || 'N/A'}                     
                    {orderStatus.orderItems[0]?.deliveryAddressString?.additionalInfo || ''}
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-2">Items:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {orderStatus.orderItems.map((item, index) => (
                      <li key={index} className="text-sm">
                        <p>{item.productName} - Quantity: {item.quantity}, Product ID: {item.productId}</p>
                        <p className="text-gray-500">Price: ${item.totalPrice.toFixed(2)}</p>
                        <p className="font-semibold">State: {item.state}</p>

                        {(item.state === 'REFUND_REQUESTED' || item.state === 'REFUND_ACCEPTED' || item.state === 'REFUND_DENIED') && (
                          <div>
                            <p className="font-semibold">Refund Message:</p>
                            <p>{item.refundMessage || 'No refund message'}</p>
                            <p className="font-semibold">Refund Response:</p>
                            <p>{item.refundResponse || 'No refund response'}</p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="font-semibold">Total: ${orderStatus.orderItems.reduce((total, item) => total + parseFloat(item.totalPrice.toString()), 0).toFixed(2)}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 HawkTU, All rights reserved.</p>
            <nav className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                <li><a href="/" className="text-white hover:text-primary">Home</a></li>
                <li><a href="/shop" className="text-white hover:text-primary">Shop</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default OrderTracking


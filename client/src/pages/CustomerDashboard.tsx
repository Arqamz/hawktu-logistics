import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Store, Bell, LogOut, Home, Star, Wallet, ClipboardList, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import useCustomerDashboard from '@/hooks/useCustomerDashboard'

export default function CustomerDashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false)
  const [rechargeAmount, setRechargeAmount] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [redeemCode, setRedeemCode] = useState('')

  const {
    loyaltyPoints,
    walletBalance,
    loading,
    error,
    fetchLoyaltyPoints,
    fetchWalletBalance,
    addWalletFunds,
  } = useCustomerDashboard()

  useEffect(() => {
    if (!loading && !loyaltyPoints && !walletBalance) {
      fetchLoyaltyPoints();
      fetchWalletBalance();
    }
  }, [loyaltyPoints, walletBalance, loading, fetchLoyaltyPoints, fetchWalletBalance]);

  const handleRecharge = async (e) => {
    e.preventDefault()
    if (rechargeAmount && cardNumber && expiryDate && cvv) {
      try {
        await addWalletFunds(parseFloat(rechargeAmount))
        setRechargeAmount('')
        setCardNumber('')
        setExpiryDate('')
        setCvv('')
        alert('Wallet recharged successfully!')
      } catch (error) {
        alert('Failed to recharge wallet. Please try again.')
      }
    } else {
      alert('Please fill in all fields')
    }
  }

  const coupons = [
    { id: 1, name: '10% Off', points: 500 },
    { id: 2, name: '20% Off', points: 1000 },
    { id: 3, name: 'Free Shipping', points: 750 },
    { id: 4, name: '$5 Off', points: 250 },
    { id: 5, name: '$10 Off', points: 500 },
  ]

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const handleRedeem = async (couponPoints) => {
    if (loyaltyPoints?.points >= couponPoints) {
      try {
        await fetchLoyaltyPoints()
        setRedeemCode(generateCode())
      } catch (error) {
        alert('Failed to redeem points. Please try again.')
      }
    } else {
      alert('Not enough loyalty points')
    }
  }

  const recentOrders = [
    {
      orderId: "12345",
      date: "2023-05-15",
      products: [
        { name: "Product A", status: "Delivered" },
        { name: "Product B", status: "Shipping" },
      ],
    },
    {
      orderId: "12346",
      date: "2023-06-01",
      products: [{ name: "Product C", status: "Processing" }],
    },
    {
      orderId: "12347",
      date: "2023-06-10",
      products: [
        { name: "Product D", status: "Delivered" },
        { name: "Product E", status: "Delivered" },
        { name: "Product F", status: "Cancelled" },
      ],
    },
  ]

  const allOrders = [
    ...recentOrders,
    {
      orderId: "12348",
      date: "2023-02-20",
      products: [
        { name: "Product G", status: "Delivered" },
        { name: "Product H", status: "Delivered" },
      ]
    },
    {
      orderId: "12349",
      date: "2023-01-05",
      products: [
        { name: "Product I", status: "Shipping" },
      ]
    },
  ]

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">${walletBalance || '0.00'}</p>
                  <Button
                    className="mt-4"
                    onClick={() => setCurrentPage("wallet-recharge")}
                  >
                    Recharge Wallet
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Loyalty Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{loyaltyPoints || 0} pts</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentOrders.map((order) => (
                    <OrderItem key={order.orderId} order={order} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'loyalty-points':
        return (
          <div className="mx-auto max-w-2xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loyalty Points</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{loyaltyPoints || 0} pts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Redeem Coupons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coupons.map((coupon) => (
                    <div key={coupon.id} className="flex justify-between items-center">
                      <span>{coupon.name} ({coupon.points} pts)</span>
                      <Button onClick={() => handleRedeem(coupon.points)}>Redeem</Button>
                    </div>
                  ))}
                </div>
                {redeemCode && (
                  <div className="mt-6 p-4 bg-gray-100 rounded border-2">
                    <p className="font-bold">Your coupon code:</p>
                    <p className="text-2xl font-mono">{redeemCode}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )
      case 'wallet-recharge':
        return (
          <div className="mx-auto max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Recharge Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRecharge} className="space-y-4">
                  <div>
                    <Label htmlFor="recharge-amount">Recharge Amount</Label>
                    <Input
                      id="recharge-amount"
                      type="number"
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <Input
                        id="expiry-date"
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Recharge</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )
      case 'order-history':
        return (
          <div className="mx-auto max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {allOrders.map((order) => (
                    <OrderItem key={order.orderId} order={order} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="shadow-sm border-b-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">HawkTU</h1>
          <div className="flex items-center space-x-4">
            <Link to="/shop">
              <Button
                variant="outline"
                className="border-gray-500"
              >
                <Store className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/customer-info">
              <Button
                variant="outline"
                className="border-gray-500"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => setIsLogoutPopupOpen(true)}
              className="border-gray-500"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <div className='flex flex-1'>
        <nav className="w-64 shrink-0 border-r bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
          <div className="space-y-6">
            <NavItem icon={<Home />} label="Dashboard" onClick={() => setCurrentPage('dashboard')} active={currentPage === 'dashboard'} />
            <NavItem icon={<Star />} label="Loyalty Points" onClick={() => setCurrentPage('loyalty-points')} active={currentPage === 'loyalty-points'} />
            <NavItem icon={<Wallet />} label="Wallet Recharge" onClick={() => setCurrentPage('wallet-recharge')} active={currentPage === 'wallet-recharge'} />
            <NavItem icon={<ClipboardList />} label="Order History" onClick={() => setCurrentPage('order-history')} active={currentPage === 'order-history'} />
          </div>
        </nav>
        <main className="flex-1 bg-gray-100/40 p-6 dark:bg-gray-800/40 md:p-10">
          {renderContent()}
        </main>
      </div>
      {isLogoutPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsLogoutPopupOpen(false)}
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
    </div>
  )
}

function NavItem({ icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 font-medium w-full text-left px-2 py-1 rounded ${active ? 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/40' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'}`}
    >
      {icon}
      {label}
    </button>
  )
}

function OrderItem({ order }) {
  const isCompleted = order.products.every(product => product.status === 'Delivered')

  return (
    <div className="border-b pb-4 last:border-b-0 last:pb-0">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Order ID: {order.orderId}</h3>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">{order.date}</span>
          {isCompleted && (
            <Badge variant="success" className="flex items-center">
              <Check className="w-3 h-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
      </div>
      {order.products.map((product, index) => (
        <div key={index} className="flex items-center justify-between mb-2 last:mb-0">
          <span>{product.name}</span>
          <div className="space-x-2 flex items-center">
            <Badge>{product.status}</Badge>
            <Button variant="outline" size="sm" disabled={['Delivered', 'Cancelled'].includes(product.status)}>Cancel</Button>
            <Button variant="outline" size="sm" disabled={['Processing', 'Shipping', 'Cancelled'].includes(product.status)}>Refund</Button>
            <Button variant="outline" size="sm" disabled={['Delivered', 'Cancelled'].includes(product.status)}>Track</Button>
            <Button variant="outline" size="sm" disabled={['Processing', 'Shipping', 'Cancelled'].includes(product.status)}>Review</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

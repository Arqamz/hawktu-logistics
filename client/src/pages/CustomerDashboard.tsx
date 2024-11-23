import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Store, Bell, LogOut } from 'lucide-react'
import { NotificationButton, useNotifications } from '@/components/notification-system'
import { Link } from 'react-router-dom'

export default function CustomerDashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [walletBalance, setWalletBalance] = useState(250)
  const [loyaltyPoints, setLoyaltyPoints] = useState(1250)
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false)
  const { addNotification } = useNotifications();
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage walletBalance={walletBalance} loyaltyPoints={loyaltyPoints} setCurrentPage={setCurrentPage} />
      case 'loyalty-points':
        return <LoyaltyPointsPage loyaltyPoints={loyaltyPoints} setLoyaltyPoints={setLoyaltyPoints} />
      case 'wallet-recharge':
        return <WalletRechargePage walletBalance={walletBalance} setWalletBalance={setWalletBalance} />
      case 'order-history':
        return <OrderHistoryPage />
      default:
        return <DashboardPage walletBalance={walletBalance} loyaltyPoints={loyaltyPoints} />
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
              </Button></Link>
            <Link to="/customer-info">
              <Button
                variant="outline"
                className="border-gray-500"
              >
                <User className="h-5 w-5" />
              </Button></Link>
            <NotificationButton />
            <Button
              variant="outline"
              onClick={() => setIsLogoutPopupOpen(true)}
              className="border-gray-500"
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <Button onClick={() => addNotification({
              title: 'Action Completed',
              description: 'Your action has been successfully completed.',
              time: new Date().toLocaleTimeString(),
            })}>Noti</Button>
          </div>
        </div>
      </header>
      <div className='flex flex-1'>
        <nav className="w-64 shrink-0 border-r bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
          <div className="space-y-6">
            <NavItem icon={<HomeIcon />} label="Dashboard" onClick={() => setCurrentPage('dashboard')} active={currentPage === 'dashboard'} />
            <NavItem icon={<StarIcon />} label="Loyalty Points" onClick={() => setCurrentPage('loyalty-points')} active={currentPage === 'loyalty-points'} />
            <NavItem icon={<WalletIcon />} label="Wallet Recharge" onClick={() => setCurrentPage('wallet-recharge')} active={currentPage === 'wallet-recharge'} />
            <NavItem icon={<ClipboardListIcon />} label="Order History" onClick={() => setCurrentPage('order-history')} active={currentPage === 'order-history'} />
          </div>
        </nav>
        <main className="flex-1 bg-gray-100/40 p-6 dark:bg-gray-800/40 md:p-10">

          {renderPage()}
        </main>
      </div>
      {
        isLogoutPopupOpen && (
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
                <Link to="/landing">
                  <Button
                    variant="outline"
                    className="bg-red-500 text-white border-red-500"
                  >
                    Logout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

function NavItem({ icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 font-medium w-full text-left px-2 py-1 rounded ${active ? 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/40' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
        }`}
    >
      {icon}
      {label}
    </button>
  )
}

function DashboardPage({ walletBalance, loyaltyPoints, setCurrentPage }) {
  const recentOrders = [
    {
      orderId: "12345",
      date: "2023-05-15",
      products: [
        { name: "Product A", status: "Delivered" },
        { name: "Product B", status: "Shipped" },
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
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${walletBalance.toFixed(2)}</p>
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
            <p className="text-3xl font-bold">{loyaltyPoints} pts</p>
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
  );
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
              <CheckIcon className="w-3 h-3 mr-1" />
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

function WalletRechargePage({ walletBalance, setWalletBalance }) {
  const [rechargeAmount, setRechargeAmount] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  const handleRecharge = (e) => {
    e.preventDefault()
    if (rechargeAmount && cardNumber && expiryDate && cvv) {
      setWalletBalance(prevBalance => prevBalance + parseFloat(rechargeAmount))
      setRechargeAmount('')
      setCardNumber('')
      setExpiryDate('')
      setCvv('')
      alert('Wallet recharged successfully!')
    } else {
      alert('Please fill in all fields')
    }
  }

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
}

function LoyaltyPointsPage({ loyaltyPoints, setLoyaltyPoints }) {
  const [redeemCode, setRedeemCode] = useState('')

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

  const handleRedeem = (couponPoints) => {
    if (loyaltyPoints >= couponPoints) {
      setLoyaltyPoints(prevPoints => prevPoints - couponPoints)
      setRedeemCode(generateCode())
    } else {
      alert('Not enough loyalty points')
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Loyalty Points</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{loyaltyPoints} pts</p>
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
            <div className="mt-6 p-4 bg-rgb(31 41 55 / 0.4)-100 rounded border-2">
              <p className="font-bold">Your coupon code:</p>
              <p className="text-2xl font-mono">{redeemCode}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function OrderHistoryPage() {
  const allOrders = [
    {
      orderId: "12345",
      date: "2023-05-15",
      products: [
        { name: "Product A", status: "Delivered" },
        { name: "Product B", status: "Delivered" },
      ]
    },
    {
      orderId: "12346",
      date: "2023-06-01",
      products: [
        { name: "Product C", status: "Processing" },
      ]
    },
    {
      orderId: "12347",
      date: "2023-06-10",
      products: [
        { name: "Product D", status: "Delivered" },
        { name: "Product E", status: "Delivered" },
        { name: "Product F", status: "Cancelled" },
      ]
    },
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
        { name: "Product I", status: "Delivered" },
      ]
    },
  ]

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
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}

function ClipboardListIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
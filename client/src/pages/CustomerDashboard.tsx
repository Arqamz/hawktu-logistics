"use client"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock data for demonstration
const initialPersonalInfo = {
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
}

const mockOrders = [
  { id: 1, date: "2023-05-15", total: 99.99, status: "Delivered", items: ["Product A", "Product B"] },
  { id: 2, date: "2023-06-01", total: 149.99, status: "Processing", items: ["Product C"] },
  { id: 3, date: "2023-06-10", total: 79.99, status: "Shipped", items: ["Product D", "Product E"] },
  { id: 4, date: "2023-06-20", total: 199.99, status: "Delivered", items: ["Product F", "Product G", "Product H"] },
]

export default function CustomerDashboard() {
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo)
  const [isEditing, setIsEditing] = useState(false)
  const [personalInfoError, setPersonalInfoError] = useState<string | null>(null)
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" })
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [orders, setOrders] = useState(mockOrders)

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }

  const savePersonalInfo = () => {
    // Personal Info validation
    if (!personalInfo.name || !personalInfo.email || !personalInfo.phone ) {
      setPersonalInfoError("All fields are required.")
      return
    }

    // Email validation (basic)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(personalInfo.email)) {
      setPersonalInfoError("Please enter a valid email address.")
      return
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
    if (!phoneRegex.test(personalInfo.phone)) {
      setPersonalInfoError("Please enter a valid phone number (e.g., 123-456-7890).")
      return
    }

    // Reset error and save the updated information (here you would typically send it to your backend)
    setPersonalInfoError(null)
    setIsEditing(false)
  }

  const savePassword = () => {
    // Password validation
    if (!password.current || !password.new || !password.confirm) {
      setPasswordError("All password fields are required.")
      return
    }
    if (password.new !== password.confirm) {
      setPasswordError("New password and confirmation must match.")
      return
    }

    // Reset error and save the updated password (this should send the updated password to your backend)
    setPasswordError(null)
    // Here you would typically update the password via a backend API
  }

  const cancelOrder = (orderId: number) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: "Cancelled" } : order
    ))
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
        <header className="w-full px-4 lg:px-6 h-20 flex items-center justify-between border-b border-border bg-background">
        <div className="container mx-auto flex items-center space-x-4">
          <Link to="/Landing" className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold text-primary dark:text-primary-dark">
              HawkTU
            </span>
          </Link>
        </div>
      </header>
      <h1 className="text-3xl font-bold text-center">Customer Dashboard</h1>
      
      {/* Personal Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Manage your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={personalInfo.email} onChange={handlePersonalInfoChange} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} />
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              <p><strong>Name:</strong> {personalInfo.name}</p>
              <p><strong>Email:</strong> {personalInfo.email}</p>
              <p><strong>Phone:</strong> {personalInfo.phone}</p>
            </div>
          )}
          {personalInfoError && <p className="text-red-600">{personalInfoError}</p>}
        </CardContent>
        <CardFooter>
          {isEditing ? (
            <>
              <Button onClick={savePersonalInfo}>Save</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="ml-2">Cancel</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </CardFooter>
      </Card>

      {/* Change Password Section */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="current">Current Password</Label>
              <Input
                id="current"
                name="current"
                type="password"
                value={password.current}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <Label htmlFor="new">New Password</Label>
              <Input
                id="new"
                name="new"
                type="password"
                value={password.new}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                value={password.confirm}
                onChange={handlePasswordChange}
              />
            </div>
          </form>
          {passwordError && <p className="text-red-600">{passwordError}</p>}
        </CardContent>
        <CardFooter>
          <Button onClick={savePassword}>Save</Button>
        </CardFooter>
      </Card>

      {/* Order History Section */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and manage your orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="non-delivered">Non-Delivered</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <OrderTable orders={orders} onCancelOrder={cancelOrder} />
            </TabsContent>
            <TabsContent value="delivered">
              <OrderTable 
                orders={orders.filter(order => order.status === "Delivered")} 
                onCancelOrder={cancelOrder} 
              />
            </TabsContent>
            <TabsContent value="non-delivered">
              <OrderTable 
                orders={orders.filter(order => order.status !== "Delivered")} 
                onCancelOrder={cancelOrder} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function OrderTable({ orders, onCancelOrder }: { orders: typeof mockOrders, onCancelOrder: (id: number) => void }) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">View Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Order Details</DialogTitle>
                      <DialogDescription>Order ID: {order.id}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p><strong>Date:</strong> {order.date}</p>
                      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                      <p><strong>Status:</strong> {order.status}</p>
                      <p><strong>Items:</strong></p>
                      <ul className="list-disc pl-5">
                        {order.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => onCancelOrder(order.id)}>
                        Cancel Order
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}

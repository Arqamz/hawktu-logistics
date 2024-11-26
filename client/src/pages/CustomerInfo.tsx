"use client"

import React, { useState, useEffect } from 'react'
import { LayoutDashboard,Store,Bell, Globe, HelpCircle, User, LogOut } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { NotificationButton, useNotifications } from '@/components/notification-system'
import { Link } from 'react-router-dom'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try refreshing the page.</h1>
    }

    return this.props.children
  }
}

const navItems = [
  { name: "Edit Profile", icon: User },
  { name: "Help & Support", icon: HelpCircle },
]

export default function UserDashboard() {
  const [activePage, setActivePage] = useState("Edit Profile")
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false)
  const { addNotification } = useNotifications();
  useEffect(() => {
    console.log('UserDashboard mounted')
  }, [])

  const renderPageContent = () => {
    switch (activePage) {
      case "Edit Profile":
        return <EditProfilePage />
      case "Help & Support":
        return <HelpSupportPage />
      default:
        return <EditProfilePage />
    }
  }

  const handleLogout = () => {
    setIsLogoutPopupOpen(false)
    // Add logout logic here
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <Toaster />
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
              <Link to="/customer-dashboard">
              <Button
                variant="outline"
                className="border-gray-500"
              >
                <LayoutDashboard className="h-5 w-5" />
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

        <div className="flex flex-1">
          <nav className="w-64 shrink-0 border-r  p-6  ">
            <div className="space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className={`flex items-center gap-2 font-medium w-full text-left px-2 py-1 rounded ${activePage === item.name ? 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/40' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                    }`}
                  onClick={() => setActivePage(item.name)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </nav>
          <main className="flex-1 bg-gray-100/40 p-6 dark:bg-gray-800/40 md:p-10">
            <h1 className="text-2xl font-bold mb-6">{activePage}</h1>
            {renderPageContent()}
          </main>
        </div>

        <footer className=" py-4 text-center border-t-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p>&copy; 2024 HawkTU. All rights reserved.</p>
            <div className="mt-2">
              <a className="text-blue-600 hover:underline mr-4">Privacy Policy</a>
              <a className="text-blue-600 hover:underline mr-4">Terms of Service</a>
              <a className="text-blue-600 hover:underline">Contact Us</a>
            </div>
          </div>
        </footer>

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
      </div >
    </ErrorBoundary >
  )
}

function EditProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  })
  const [errors, setErrors] = useState({})

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (user.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long"
    }
    if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(user.phone)) {
      newErrors.phone = "Invalid phone number format"
    }

    if (Object.keys(newErrors).length === 0) {
      setIsEditing(false)
      toast.success("Profile updated successfully")
    } else {
      setErrors(newErrors)
    }
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-2">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <Button onClick={handleEdit} className="mt-4">Edit Profile</Button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}

function ChangePasswordForm() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (passwords.currentPassword.length < 8) {
      newErrors.currentPassword = "Password must be at least 8 characters long"
    }
    if (passwords.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters long"
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(newErrors).length === 0) {
      // Here you would typically send a request to your backend to change the password
      toast.success("Password changed successfully")
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="current-password">Current Password</Label>
        <Input
          id="current-password"
          name="currentPassword"
          type="password"
          value={passwords.currentPassword}
          onChange={handleChange}
        />
        {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <Input
          id="new-password"
          name="newPassword"
          type="password"
          value={passwords.newPassword}
          onChange={handleChange}
        />
        {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          value={passwords.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
      </div>
      <Button type="submit">Change Password</Button>
    </form>
  )
}

function HelpSupportPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>Email: support@example.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Hours: Monday - Friday, 9am - 5pm EST</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">How do I track my order?</h3>
              <p className="text-sm text-gray-500">You can track your order by logging into your account and visiting the Order History page.</p>
            </div>
            <div>
              <h3 className="font-medium">What is your return policy?</h3>
              <p className="text-sm text-gray-500">We offer a 30-day return policy for most items. Please check our Returns page for more details.</p>
            </div>
            <div>
              <h3 className="font-medium">How do I redeem my loyalty points?</h3>
              <p className="text-sm text-gray-500">You can redeem your loyalty points during checkout or on the Loyalty Points page in your account settings.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
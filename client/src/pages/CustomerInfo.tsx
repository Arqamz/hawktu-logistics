"use client"

import React, { useState, useEffect } from 'react'
import { Bell, Globe, HelpCircle, User } from 'lucide-react'
import { Toaster, toast } from 'sonner'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

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
  { name: "Notifications", icon: Bell },
  { name: "Language & Region", icon: Globe },
  { name: "Help & Support", icon: HelpCircle },
]

export default function UserDashboard() {
  const [activePage, setActivePage] = useState("Edit Profile")

  useEffect(() => {
    console.log('UserDashboard mounted')
  }, [])

  const renderPageContent = () => {
    switch (activePage) {
      case "Edit Profile":
        return <EditProfilePage />
      case "Notifications":
        return <NotificationsPage />
      case "Language & Region":
        return <LanguageRegionPage />
      case "Help & Support":
        return <HelpSupportPage />
      default:
        return <EditProfilePage />
    }
  }

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen">
        <Toaster />
        <nav className="w-64 shrink-0 border-r bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
          <div className="space-y-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center gap-2 font-medium w-full text-left px-2 py-1 rounded ${
                  activePage === item.name ? 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/40' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
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
    </ErrorBoundary>
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

function NotificationsPage() {
  const [notificationStates, setNotificationStates] = useState({
    "Loyalty Points Updates": false,
    "Wallet Recharges": false,
    "Order Confirmations": false
  })

  const handleToggle = (notificationType) => {
    setNotificationStates(prevStates => ({
      ...prevStates,
      [notificationType]: !prevStates[notificationType]
    }))

    const action = notificationStates[notificationType] ? "disabled" : "enabled"
    toast.success(`Notifications ${action} for ${notificationType}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(notificationStates).map(([notificationType, isEnabled]) => (
            <div key={notificationType} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{notificationType}</h3>
                <p className="text-sm text-gray-500">
                  {notificationType === "Loyalty Points Updates" && "Receive notifications about your loyalty points balance."}
                  {notificationType === "Wallet Recharges" && "Get notified when your wallet is recharged."}
                  {notificationType === "Order Confirmations" && "Receive notifications for order confirmations and updates."}
                </p>
              </div>
              <Button 
                variant={isEnabled ? "destructive" : "outline"} 
                onClick={() => handleToggle(notificationType)}
              >
                {isEnabled ? "Disable" : "Enable"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function LanguageRegionPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Language and Region Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select onValueChange={(value) => toast.success(`Language changed to ${value}`)}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select onValueChange={(value) => toast.success(`Region changed to ${value}`)}>
                <SelectTrigger id="region">
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="eu">European Union</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={() => toast.success('Preferences saved')}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
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
"use client"

import React, { useState } from 'react'
import {
  Bell,
  Globe,
  HelpCircle,
  User,
} from "lucide-react"
import { Toaster, toast } from 'sonner'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { name: "Edit Profile", icon: User },
  { name: "Notifications", icon: Bell },
  { name: "Language & Region", icon: Globe },
  { name: "Help & Support", icon: HelpCircle },
]

export default function UserDashboard() {
  const [activePage, setActivePage] = useState("Edit Profile")

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
    <div className="flex h-screen bg-gray-100">
      <Toaster />
      <SidebarProvider>
        <Sidebar className="w-64 bg-white">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.name === activePage}
                        onClick={() => setActivePage(item.name)}
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2">
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-y-auto p-8">
          <h1 className="text-2xl font-bold mb-6">{activePage}</h1>
          {renderPageContent()}
        </main>
      </SidebarProvider>
    </div>
  )
}

function EditProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        )}
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
            />
          </div>
          <Button type="submit">Change Password</Button>
        </form>
      </div>
    </div>
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
    <div className="space-y-6 max-w-2xl">
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
    </div>
  )
}

function LanguageRegionPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select>
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
          <Select>
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
      <Button>Save Preferences</Button>
    </div>
  )
}

function HelpSupportPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <p>Email: support@example.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Hours: Monday - Friday, 9am - 5pm EST</p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
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
    </div>
  )
}
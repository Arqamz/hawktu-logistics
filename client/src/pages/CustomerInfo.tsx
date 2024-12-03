
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Store, Bell, Globe, HelpCircle, User, LogOut } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NotificationButton, useNotifications } from '@/components/notification-system';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCustomerInfo, useUpdateCustomerInfo, useChangePassword } from '@/hooks/useCustomerInfo';  // Ensure to import hooks correctly

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try refreshing the page.</h1>;
    }
    return this.props.children;
  }
}

const navItems = [
  { name: "Edit Profile", icon: User },
  { name: "Change Password", icon: Globe },
  { name: "Help & Support", icon: HelpCircle },
];

export default function UserDashboard() {
  const [activePage, setActivePage] = useState("Edit Profile");
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const renderPageContent = () => {
    switch (activePage) {
      case "Edit Profile":
        return <EditProfilePage />;
      case "Change Password":
        return <ChangePasswordPage />;
      case "Help & Support":
        return <HelpSupportPage />;
      default:
        return <EditProfilePage />;
    }
  };

  const handleLogout = () => {
    setIsLogoutPopupOpen(false);
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <Toaster />
        <header className="shadow-sm border-b-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">HawkTU</h1>
            <div className="flex items-center space-x-4">
              <Link to="/shop">
                <Button variant="outline" className="border-gray-500">
                  <Store className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/customer-dashboard">
                <Button variant="outline" className="border-gray-500">
                  <LayoutDashboard className="h-5 w-5" />
                </Button>
              </Link>
              <NotificationButton />
              <Button variant="outline" onClick={() => setIsLogoutPopupOpen(true)} className="border-gray-500">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          <nav className="w-64 shrink-0 border-r p-6">
            <div className="space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className={`flex items-center gap-2 font-medium w-full text-left px-2 py-1 rounded ${activePage === item.name ? 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/40' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'}`}
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

        <footer className="py-4 text-center border-t-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p>&copy; 2024 HawkTU. All rights reserved.</p>
            <div className="mt-2">
              <a className="text-blue-600 hover:underline mr-4">Privacy Policy</a>
              <a className="text-blue-600 hover:underline mr-4">Terms of Service</a>
              <a className="text-blue-600 hover:underline">Contact Us</a>
            </div>
          </div>
        </footer>

        {isLogoutPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setIsLogoutPopupOpen(false)} className="border-gray-400 text-gray-600">
                  Cancel
                </Button>
                <Link to="/landing">
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
    </ErrorBoundary>
  );
}

function EditProfilePage() {
  const { customerInfo, loading, error } = useCustomerInfo();
  const { updateInfo, loading: updateLoading, error: updateError } = useUpdateCustomerInfo();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: {
      country: "",
      city: "",
      district: "",
      addressLineOne: "",
      addressLineTwo: "",
      additionalInfo: "",
    },
  });

  // Retrieve email from localStorage
  const email = localStorage.getItem('email');

  useEffect(() => {
    if (customerInfo) {
      setUser({
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        phoneNumber: customerInfo.phoneNumber,
        address: customerInfo.address,
      });
    }
  }, [customerInfo]);

  const handleEditPersonalInfo = () => setIsEditing(true);
  const handleEditAddress = () => setIsAddressEditing(true);

  const handleSavePersonalInfo = async (e) => {
    e.preventDefault();
    try {
      await updateInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
      });
      setIsEditing(false);
      toast.success("Personal information updated successfully");
    } catch (error) {
      toast.error("Failed to update personal information");
    }
  };

  const handleSaveAddressInfo = async (e) => {
    e.preventDefault();
    try {
      await updateInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
      });
      setIsAddressEditing(false);
      toast.success("Address information updated successfully");
    } catch (error) {
      toast.error("Failed to update address information");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [addressField]: value,
        },
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Profile Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-2">
              <p><strong>First Name:</strong> {user.firstName}</p>
              <p><strong>Last Name:</strong> {user.lastName}</p>
              <p><strong>Email:</strong> {email}</p> {/* Display the email, not editable */}
              <p><strong>Phone:</strong> {user.phoneNumber}</p>
              <Button onClick={handleEditPersonalInfo} className="mt-4">Edit Profile</Button>
            </div>
          ) : (
            <form onSubmit={handleSavePersonalInfo} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={user.firstName} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={user.lastName} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" value={email} disabled className="w-full" /> {/* Non-editable Email */}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone</Label>
                <Input id="phoneNumber" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} className="w-full" />
              </div>
              <Button type="submit" className="mt-4" disabled={updateLoading}>
                {updateLoading ? "Saving..." : "Save Changes"}
              </Button>
              {updateError && <p className="text-red-500">{updateError}</p>}
            </form>
          )}
        </CardContent>
      </Card>

      {/* Address Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
        </CardHeader>
        <CardContent>
          {!isAddressEditing ? (
            <div className="space-y-2">
              <p><strong>Address Line 1:</strong> {user.address.addressLineOne}</p>
              <p><strong>Address Line 2:</strong> {user.address.addressLineTwo}</p>
              <p><strong>City:</strong> {user.address.city}</p>
              <p><strong>District:</strong> {user.address.district}</p>
              <p><strong>Country:</strong> {user.address.country}</p>
              <p><strong>Additional Info:</strong> {user.address.additionalInfo}</p>
              <Button onClick={handleEditAddress} className="mt-4">Edit Address</Button>
            </div>
          ) : (
            <form onSubmit={handleSaveAddressInfo} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address.addressLineOne">Address Line 1</Label>
                <Input id="address.addressLineOne" name="address.addressLineOne" value={user.address.addressLineOne} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.addressLineTwo">Address Line 2 (Optional)</Label>
                <Input id="address.addressLineTwo" name="address.addressLineTwo" value={user.address.addressLineTwo} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.city">City</Label>
                <Input id="address.city" name="address.city" value={user.address.city} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.district">District</Label>
                <Input id="address.district" name="address.district" value={user.address.district} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.country">Country</Label>
                <Input id="address.country" name="address.country" value={user.address.country} onChange={handleChange} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.additionalInfo">Additional Info (Optional)</Label>
                <Input id="address.additionalInfo" name="address.additionalInfo" value={user.address.additionalInfo} onChange={handleChange} className="w-full" />
              </div>
              <Button type="submit" className="mt-4" disabled={updateLoading}>
                {updateLoading ? "Saving..." : "Save Address Changes"}
              </Button>
              {updateError && <p className="text-red-500">{updateError}</p>}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}



function ChangePasswordPage() {
  const { changePwd, loading, error } = useChangePassword();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "", // New field for re-entering the password
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that new password and confirm new password match
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    // If passwords match, proceed to change password
    const changePasswordPayload = {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    };

    try {
      await changePwd(changePasswordPayload);
      toast.success("Password changed successfully");
    } catch (error) {
      // If there is an error, display the error message
      toast.error(error || "Failed to change password.");
    }
  };

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword">Re-enter New Password</Label>
              <Input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Changing..." : "Change Password"}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
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
            <p>Email: support@hawktu.com</p>
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

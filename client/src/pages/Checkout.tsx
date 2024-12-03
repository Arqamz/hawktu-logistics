import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Wallet } from 'lucide-react';
import { useLocation } from "react-router-dom";
import { useCustomerInfo } from '@/hooks/useCustomerInfo'; // Import the custom hook
import { useOrder } from "@/hooks/useOrder"; // Import the useOrder hook

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [showRechargePopup, setShowRechargePopup] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Fetch customer info using the custom hook
  const { customerInfo, loading, error } = useCustomerInfo();

  const { placeOrder, loading: orderLoading, error: orderError, order } = useOrder(); // Using the useOrder hook

  const [deliveryAddress, setDeliveryAddress] = useState({
    country: '',
    city: '',
    district: '',
    addressLineOne: '',
    addressLineTwo: '',
    additionalInfo: ''
  });

  const [walletBalance, setWalletBalance] = useState(0);
  const [useCurrentAddress, setUseCurrentAddress] = useState(true); // State to toggle between current and new address form

  useEffect(() => {
    if (customerInfo) {
      setWalletBalance(customerInfo.wallet);
      setDeliveryAddress(customerInfo.address);
    }
  }, [customerInfo]);

  const handlePayment = async () => {
    // Validate the address form before proceeding with payment
    const { addressLineOne, city, district, country } = deliveryAddress;
    
    if (!addressLineOne || !city || !district || !country) {
      alert('Please fill in all required fields (Address Line 1, City, District, and Country).');
      return;
    }

    const email = localStorage.getItem('email'); // Get email from localStorage

    if (!email) {
      alert('Please log in to proceed with the checkout.');
      return;
    }

    // Prepare the payload for the order
    const cartDTO = {
      email: email,
      cartProducts: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      })),
      deliveryAddress: deliveryAddress
    };

    try {
      const response = await placeOrder(cartDTO); // Create the order
      if (response) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          localStorage.removeItem("cartItems")
          setShowSuccessPopup(false);
          navigate('/shop');
        }, 3000);
      }
    } catch (error) {
      console.error('Error during order creation:', error);
      alert('An error occurred while placing the order. Please try again.');
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRechargeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amount = parseFloat(rechargeAmount);

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }

    setWalletBalance(walletBalance + amount);
    setShowRechargePopup(false);
    alert('Wallet recharged successfully!');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleSwitchAddress = (useCurrent: boolean) => {
    setUseCurrentAddress(useCurrent);
    if (useCurrent) {
      // Reset to the current address fetched from the backend when switching to current address
      setDeliveryAddress(customerInfo?.address || {});
    } else {
      // Clear the address fields when switching to new address
      setDeliveryAddress({
        country: '',
        city: '',
        district: '',
        addressLineOne: '',
        addressLineTwo: '',
        additionalInfo: ''
      });
    }
  };

  return (
    <div className="container mx-auto px-20 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between items-center font-bold">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <h2 className="text-xl font-semibold mt-8">Payment Method</h2>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wallet">
                <div className="flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  Wallet (Balance: ${walletBalance.toFixed(2)})
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="mt-4">
            {walletBalance >= totalAmount ? (
              <p>Your wallet balance is sufficient for this purchase.</p>
            ) : (
              <p className="text-red-500">Insufficient wallet balance. Please recharge.</p>
            )}
          </div>

          {/* Show either Pay button or Recharge Wallet button based on wallet balance */}
          {walletBalance >= totalAmount ? (
            <Button
              className="mt-6 w-full"
              onClick={handlePayment}
            >
              Pay ${totalAmount.toFixed(2)}
            </Button>
          ) : (
            <Button
              className="mt-6 w-full"
              onClick={() => setShowRechargePopup(true)}
            >
              Recharge Wallet
            </Button>
          )}
        </div>

        {/* Delivery Address Card */}
        <div className="card p-6 border rounded-md shadow-md w-full">
          <h2 className="text-xl font-semibold text-center mb-4">Delivery Address</h2>

          <div className="flex justify-evenly tabs mb-4">
            <Button
              variant={useCurrentAddress ? 'default' : 'outline'}
              onClick={() => handleSwitchAddress(true)}
            >
              Use Current Address
            </Button>
            <Button
              variant={!useCurrentAddress ? 'default' : 'outline'}
              onClick={() => handleSwitchAddress(false)}
            >
              Use New Address
            </Button>
          </div>

          {/* Address Form */}
          {useCurrentAddress ? ( // If using current address
            <div className="space-y-4">
              <div>
                <Label htmlFor="address-line-one">Address Line 1</Label>
                <Input
                  id="address-line-one"
                  name="addressLineOne"
                  value={deliveryAddress.addressLineOne}
                  onChange={handleAddressChange}
                  disabled
                  placeholder="Current address line 1"
                />
              </div>
              <div>
                <Label htmlFor="address-line-two">Address Line 2</Label>
                <Input
                  id="address-line-two"
                  name="addressLineTwo"
                  value={deliveryAddress.addressLineTwo}
                  onChange={handleAddressChange}
                  disabled
                  placeholder="Current address line 2"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={deliveryAddress.city}
                  onChange={handleAddressChange}
                  disabled
                  placeholder="Current city"
                />
              </div>
              <div>
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  name="district"
                  value={deliveryAddress.district}
                  onChange={handleAddressChange}
                  disabled
                  placeholder="Current district"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={deliveryAddress.country}
                  onChange={handleAddressChange}
                  disabled
                  placeholder="Current country"
                />
              </div>
            </div>
          ) : ( // If using a new address
            <div className="space-y-4">
              <div>
                <Label htmlFor="address-line-one">Address Line 1</Label>
                <Input
                  id="address-line-one"
                  name="addressLineOne"
                  value={deliveryAddress.addressLineOne}
                  onChange={handleAddressChange}
                  placeholder="Enter address line 1"
                />
              </div>
              <div>
                <Label htmlFor="address-line-two">Address Line 2</Label>
                <Input
                  id="address-line-two"
                  name="addressLineTwo"
                  value={deliveryAddress.addressLineTwo}
                  onChange={handleAddressChange}
                  placeholder="Enter address line 2"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={deliveryAddress.city}
                  onChange={handleAddressChange}
                  placeholder="Enter city"
                />
              </div>
              <div>
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  name="district"
                  value={deliveryAddress.district}
                  onChange={handleAddressChange}
                  placeholder="Enter district"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={deliveryAddress.country}
                  onChange={handleAddressChange}
                  placeholder="Enter country"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recharge Popup */}
      <Dialog open={showRechargePopup} onOpenChange={setShowRechargePopup}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Recharge Your Wallet</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRechargeSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="recharge-amount">Recharge Amount</Label>
                <Input
                  id="recharge-amount"
                  type="number"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  placeholder="Enter amount to recharge"
                />
              </div>
              <Button className="w-full mt-4" type="submit">
                Recharge
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Popup */}
      <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your order has been placed successfully!</DialogTitle>
          </DialogHeader>
          <Button onClick={() => navigate('/shop')} className="w-full">
            Continue Shopping
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

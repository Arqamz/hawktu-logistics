'use client'

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLocation } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CreditCard, Wallet, ShoppingCartIcon as PaypalIcon } from 'lucide-react'

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState('credit-card')
    const [walletBalance, setWalletBalance] = useState(500) // Mock wallet balance
    const [cardNumber, setCardNumber] = useState('')
    const [cardName, setCardName] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [cvv, setCvv] = useState('')
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [deliveryAddress, setDeliveryAddress] = useState('') // Delivery address state
    const navigate = useNavigate()
    const location = useLocation()
    const cartItems = location.state?.cartItems || []

    const taxAmount = (cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1)
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + taxAmount

    const handlePayment = () => {
        // Implement payment logic here
        setShowSuccessPopup(true)
        setTimeout(() => {
            setShowSuccessPopup(false)
            navigate('/')
        }, 3000)
    }

    return (
        <div className="container mx-auto px-20 py-10">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center mb-2">
                            <span>{item.name}x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between items-center font-bold">
                            <span>Tax:</span>
                            <span>${taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center font-bold">
                            <span>Total:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="flex mt-4 items-center">
                        <div className="mr-3 font-extrabold">Delivery Address</div>
                        <Input className="flex-1"
                            id="delivery-address"
                            placeholder="Enter your Delivery Address"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                        />
                    </div>
                </div>
                

                <div>
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="credit-card">
                                <div className="flex items-center">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Credit Card
                                </div>
                            </SelectItem>
                            <SelectItem value="paypal">
                                <div className="flex items-center">
                                    <PaypalIcon className="mr-2 h-4 w-4" />
                                    PayPal
                                </div>
                            </SelectItem>
                            <SelectItem value="wallet">
                                <div className="flex items-center">
                                    <Wallet className="mr-2 h-4 w-4" />
                                    Wallet (Balance: ${walletBalance.toFixed(2)})
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {paymentMethod === 'credit-card' && (
                        <div className="mt-4 space-y-4">
                            <div>
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input
                                    id="card-number"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="card-name">Name on Card</Label>
                                <Input
                                    id="card-name"
                                    placeholder="John Doe"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                />
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <Label htmlFor="expiry-date">Expiry Date</Label>
                                    <Input
                                        id="expiry-date"
                                        placeholder="MM/YY"
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input
                                        id="cvv"
                                        placeholder="123"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'paypal' && (
                        <div className="mt-4">
                            <p>You will be redirected to PayPal to complete your payment.</p>
                        </div>
                    )}

                    {paymentMethod === 'wallet' && (
                        <div className="mt-4">
                            {walletBalance >= totalAmount ? (
                                <p>Your wallet balance is sufficient for this purchase.</p>
                            ) : (
                                <p className="text-red-500">Insufficient wallet balance. Please choose another payment method.</p>
                            )}
                        </div>
                    )}

                    

                    <Button 
                        className="mt-6 w-full" 
                        onClick={handlePayment} 
                        disabled={
                            (paymentMethod === 'wallet' && walletBalance < totalAmount) ||
                            (paymentMethod === 'credit-card' && (!cardNumber || !cardName || !expiryDate || !cvv)) ||
                            !deliveryAddress
                        }
                    >
                        Pay ${totalAmount.toFixed(2)}
                    </Button>
                </div>
            </div>

            <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Payment Successful!</DialogTitle>
                    </DialogHeader>
                    <p>Your payment has been processed successfully. Thank you for your purchase!</p>
                </DialogContent>
            </Dialog>
        </div>
    )
}

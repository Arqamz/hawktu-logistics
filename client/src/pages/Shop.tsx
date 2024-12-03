'use client'

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Plus, Minus, MessageSquare } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NotificationButton, useNotifications } from '@/components/notification-system'
import { LayoutDashboard, Bell, User, LogOut } from 'lucide-react'
import { Link } from "react-router-dom"
import { Toaster, toast } from 'sonner'
import { useProducts } from '../hooks/useProducts'
import { Product, ProductFilterRequest, Review } from '../types/shop'


export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<ProductFilterRequest['sortBy']>('DEFAULT')
  const [searchTerm, setSearchTerm] = useState("")
  const [cartItems, setCartItems] = useState<(Product & { quantity: number })[]>([])
  const [selectedItem, setSelectedItem] = useState<Product | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [ratingRange, setRatingRange] = useState<[number, number]>([1, 5])
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(false)
  const [isReviewSheetOpen, setIsReviewSheetOpen] = useState(false)
  const { addNotification } = useNotifications();
  const navigate = useNavigate()

  const initialFilter: ProductFilterRequest = {
    page: currentPage - 1,
    sortBy: sortBy,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    minRating: ratingRange[0],
    maxRating: ratingRange[1],
  }

  const { products, categories, loading, error, setFilter, totalPages, totalProducts, getReviews } = useProducts(initialFilter)
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems")
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems)) 
    }
  }, [])

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems)) 
    }
  }, [cartItems])
  useEffect(() => {
    setFilter({
      page: currentPage - 1,
      sortBy: sortBy,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minRating: ratingRange[0],
      maxRating: ratingRange[1],
      categoryId: selectedCategory ? parseInt(selectedCategory) : undefined,
    })
  }, [currentPage, sortBy, priceRange, ratingRange, selectedCategory, setFilter])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const addToCart = (item: Product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
        )
      } else {
        return [...prevItems, { ...item, quantity }]
      }
    })
  }

  const removeFromCart = (item: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id)
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
      } else {
        return prevItems.filter(cartItem => cartItem.id !== item.id)
      }
    })
  }

  const updateCartItemQuantity = (item: Product, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== item.id))
    } else {
      setCartItems(prevItems =>
        prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
        )
      )
    }
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty.", {
        className: "bg-red-600",
      });
      return;
    }

    navigate('/checkout', { state: { cartItems } });
  };

  const loadReviews = async (productId: number) => {
    setIsLoadingReviews(true);
    try {
      const fetchedReviews = await getReviews(productId);
      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      toast.error('Failed to load reviews. Please try again.');
    } finally {
      setIsLoadingReviews(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-red-500">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="shadow-sm border-b-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">HawkTU</h1>
          <div className="flex items-center space-x-4">
            <Link to="/customer-dashboard">
              <Button
                variant="outline"
                className="border-gray-500"
              >
                <LayoutDashboard className="h-5 w-5" />
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
            <NotificationButton />
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

      <div className="flex flex-1">
        <div className="w-64 p-4 border-r">
          <h2 className="text-lg font-semibold mb-4">Filter</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              <Select onValueChange={setSelectedCategory} value={selectedCategory || undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>

              </Select>
            </div>

            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="flex justify-between mt-2">
                <Input
                  type="number"
                  min="0"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-20"
                />
                <Input
                  type="number"
                  min="0"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-20"
                />
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Rating</h3>
              <div className="flex justify-between mt-2">
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={ratingRange[0]}
                  onChange={(e) => setRatingRange([Number(e.target.value), ratingRange[1]])}
                  className="w-20"
                />
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={ratingRange[1]}
                  onChange={(e) => setRatingRange([ratingRange[0], Number(e.target.value)])}
                  className="w-20"
                />
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Sort By</h3>
              <Select onValueChange={(value) => setSortBy(value as ProductFilterRequest['sortBy'])} value={sortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DEFAULT">Default</SelectItem>
                  <SelectItem value="PRICE_LOW_TO_HIGH">Price: Low to High</SelectItem>
                  <SelectItem value="PRICE_HIGH_TO_LOW">Price: High to Low</SelectItem>
                  <SelectItem value="RATING_HIGH_TO_LOW">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64 flex flex-grow mr-4">
              <Input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[80vw] max-w-[800px]">
                  <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y">
                    <div className="flex-1">
                      <table className="w-full text-sm lg:text-base" cellSpacing="0">
                        <thead>
                          <tr className="h-12 uppercase">
                            <th className="hidden md:table-cell" />
                            <th className="text-left">Product</th>
                            <th className="text-center">Quantity</th>
                            <th className="hidden text-right md:table-cell">Unit price</th>
                            <th className="text-right">Total price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-100">
                              <td className="hidden pb-4 md:table-cell">
                                <img
                                  src={'https://api.imgbb.com/1/upload' || "/placeholder.svg"}
                                  className="w-20 rounded"
                                  alt="Thumbnail"
                                />
                              </td>
                              <td>
                                <p className="mb-2 md:ml-4">{item.name}</p>
                              </td>
                              <td className="text-center">
                                <div className="flex items-center justify-center">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updateCartItemQuantity(item, item.quantity - 1)}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="mx-2">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updateCartItemQuantity(item, item.quantity + 1)}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                              <td className="hidden text-right md:table-cell">
                                <span className="text-sm lg:text-base font-medium">
                                  ${item.price.toFixed(2)}
                                </span>
                              </td>
                              <td className="text-right">
                                <span className="text-sm lg:text-base font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <hr className="pb-6 mt-6" />
                      <div className="my-4 mt-6 -mx-2 lg:flex">
                        <div className="lg:px-2 lg:w-1/2">
                          <div className="p-4 mt-6 bg-gray-100 rounded-full">
                            <h1 className="ml-2 font-bold uppercase">Loyalty Points Earned</h1>
                          </div>
                          <div className="p-4">
                            <p className="mb-4 italic">
                              You've earned {Math.floor(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 10)} loyalty points from this order!
                            </p>
                          </div>
                        </div>
                        <div className="lg:px-2 lg:w-1/2">
                          <div className="p-4">
                            <div className="flex justify-between pt-4 border-b">
                              <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                Total
                              </div>
                              <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                ${(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)).toFixed(2)}
                              </div>
                            </div>
                            <Button className="w-full mt-4" onClick={handleCheckout}>
                              Proceed to Checkout
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={`` || `/placeholder.svg?height=200&width=300`}
                    alt={item.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${index < (item.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => {
                        setSelectedItem(item);
                        loadReviews(item.id);
                      }}>View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{selectedItem?.name}</DialogTitle>
                        <DialogDescription>Product Details</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative h-64">
                          <img
                            src={selectedItem?.image || `/placeholder.svg?height=300&width=400`}
                            alt={selectedItem?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-lg mb-2">{selectedItem?.description}</p>
                          <p className="text-2xl font-bold mb-2">${selectedItem?.price.toFixed(2)}</p>
                          <div className="flex items-center mb-4">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star
                                key={index}
                                className={`h-5 w-5 ${index < (selectedItem?.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <div className="mb-4">
                            {cartItems.find(cartItem => cartItem.id === selectedItem?.id) ? (
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateCartItemQuantity(selectedItem!, Math.max(0, cartItems.find(cartItem => cartItem.id === selectedItem!.id)!.quantity - 1))}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="mx-2">
                                  {cartItems.find(cartItem => cartItem.id === selectedItem!.id)!.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateCartItemQuantity(selectedItem!, cartItems.find(cartItem => cartItem.id === selectedItem!.id)!.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <Button onClick={() => addToCart(selectedItem!)}>Add to Cart</Button>
                            )}
                          </div>
                          <Button
                            onClick={() => {
                              setIsReviewSheetOpen(true);
                              loadReviews(selectedItem!.id);
                            }}
                            className="flex items-center"
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Reviews and Ratings
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {cartItems.find(cartItem => cartItem.id === item.id) ? (
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromCart(item)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2">
                        {cartItems.find(cartItem => cartItem.id === item.id)?.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => addToCart(item)}>Add to Cart</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => {
                setCurrentPage(Math.min(currentPage + 1, totalPages));
                scrollToTop();
              }}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
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
      )}
      <Sheet open={isReviewSheetOpen} onOpenChange={setIsReviewSheetOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Reviews and Ratings</SheetTitle>
            <SheetDescription>
              See what others are saying about this product
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            {isLoadingReviews ? (
              <p>Loading reviews...</p>
            ) : reviews.length > 0 ? (
              <ul className="space-y-4">
                {reviews.map((review) => (
                  <li key={review.id} className="border-b pb-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{review.userName}</p>
                      <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${index < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Toaster position="bottom-right" />
    </div>
  )
}


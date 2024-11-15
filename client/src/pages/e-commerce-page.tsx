import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Star, ShoppingCart, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

// Mock data
const categories = ["All", "Electronics", "Clothing", "Books", "Home & Garden"]
const mockItems = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  category: categories[Math.floor(Math.random() * categories.length)],
  price: Math.floor(Math.random() * 100) + 1,
  rating: Math.floor(Math.random() * 5) + 1,
  description: `This is a description for Item ${i + 1}. It's a great product that you'll love!`,
  sellerName: `Seller ${Math.floor(Math.random() * 10) + 1}`,
  reviews: Array.from({ length: Math.floor(Math.random() * 20) + 1 }, (_, j) => ({
    id: j + 1,
    user: `User ${j + 1}`,
    rating: Math.floor(Math.random() * 5) + 1,
    comment: `This is a review for Item ${i + 1}. It's ${['great', 'good', 'okay', 'not bad', 'excellent'][Math.floor(Math.random() * 5)]}.`
  })),
}))

export default function AppComponent() {
  const [items, setItems] = useState(mockItems)
  const [filteredItems, setFilteredItems] = useState(mockItems)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("default")
  const [searchTerm, setSearchTerm] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [priceRange, setPriceRange] = useState([0, 100])
  const [ratingRange, setRatingRange] = useState([1, 5])
  const itemsPerPage = 20

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    let result = items

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter(item => item.category === selectedCategory)
    }

    // Filter by Search Term
    if (searchTerm) {
      result = result.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by Price Range
    result = result.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1])

    // Filter by Rating Range
    result = result.filter(item => item.rating >= ratingRange[0] && item.rating <= ratingRange[1])

    // Sort items
    switch (sortBy) {
      case "priceAsc":
        result.sort((a, b) => a.price - b.price)
        break
      case "priceDesc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    setFilteredItems(result)
  }, [items, selectedCategory, sortBy, searchTerm, priceRange, ratingRange])

  const addToCart = (item) => {
    setCartItems([...cartItems, item])
  }

  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Logo and Nav Bar */}
      <header className="flex justify-center items-center p-4 border-b">
        <img src="/placeholder.svg" alt="Logo" className="w-24 h-12" />
        <nav className="ml-8">
          <Button variant="link">Home</Button>
          <Button variant="link">Products</Button>
          <Button variant="link">About</Button>
          <Button variant="link">Contact</Button>
        </nav>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 p-4 border-r">
          <h2 className="text-lg font-semibold mb-4">Filter</h2>
          <div className="space-y-4">
            {/* Categories Filter */}
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              {categories.map(category => (
                <button
                  key={category}
                  className={`block w-full text-left px-2 py-1 rounded ${selectedCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Price Range Inputs (without Slider) */}
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

            {/* Rating Range Inputs (without Slider) */}
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

            {/* Sort By */}
            <div>
              <h3 className="font-medium mb-2">Sort By</h3>
              <Select onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
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
                    Cart ({cartItems.length})
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
                            <th className="lg:text-right text-left pl-5 lg:pl-0">
                              <span className="lg:hidden" title="Quantity">Qtd</span>
                              <span className="hidden lg:inline">Quantity</span>
                            </th>
                            <th className="hidden text-right md:table-cell">Unit price</th>
                            <th className="text-right">Total price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                              <td className="hidden pb-4 md:table-cell">
                                <img
                                  src="/placeholder.svg"
                                  className="w-20 rounded"
                                  alt="Thumbnail"
                                />
                              </td>
                              <td>
                                <div className="flex justify-between">
                                  <p className="mb-2 md:ml-4">{item.name}</p>
                                  <Badge variant="secondary" className="text-xs md:text-base mt-2 md:mt-0 md:ml-4">
                                    In stock
                                  </Badge>
                                </div>
                              </td>
                              <td className="justify-center md:justify-end md:flex mt-6">
                                <div className="w-20 h-10">
                                  <div className="relative flex flex-row w-full h-8">
                                    <input
                                      type="number"
                                      defaultValue="1"
                                      className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="hidden text-right md:table-cell">
                                <span className="text-sm lg:text-base font-medium">${item.price.toFixed(2)}</span>
                              </td>
                              <td className="text-right">
                                <span className="text-sm lg:text-base font-medium">${item.price.toFixed(2)}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <hr className="pb-6 mt-6" />
                      <div className="my-4 mt-6 -mx-2 lg:flex">
                        <div className="lg:px-2 lg:w-1/2">
                          <div className="p-4 bg-gray-100 rounded-full">
                            <h1 className="ml-2 font-bold uppercase">Coupon Code</h1>
                          </div>
                          <div className="p-4">
                            <p className="mb-4 italic">If you have a coupon code, please enter it in the box below</p>
                            <div className="justify-center md:flex">
                              <form action="" method="POST">
                                <div className="flex items-center w-full h-13 pl-3 bg-white bg-gray-100 border rounded-full">
                                  <input
                                    type="coupon"
                                    name="code"
                                    id="coupon"
                                    placeholder="Apply coupon"
                                    value="90off"
                                    className="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none"
                                  />
                                  <Button className="text-sm">Apply</Button>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="p-4 mt-6 bg-gray-100 rounded-full">
                            <h1 className="ml-2 font-bold uppercase">Loyalty Points Earned</h1>
                          </div>
                          <div className="p-4">
                            <p className="mb-4 italic">
                              You've earned {Math.floor(cartItems.reduce((sum, item) => sum + item.price, 0) * 10)} loyalty points from this order!
                            </p>
                          </div>
                        </div>
                        <div className="lg:px-2 lg:w-1/2">
                          <div className="p-4 bg-gray-100 rounded-full">
                            <h1 className="ml-2 font-bold uppercase">Order Details</h1>
                          </div>
                          <div className="p-4">
                            <p className="mb-6 italic">Shipping and additional costs are calculated based on values you have entered</p>
                            <div className="flex justify-between border-b">
                              <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                Subtotal
                              </div>
                              <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                              </div>
                            </div>
                            <div className="flex justify-between pt-4 border-b">
                              <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                Tax
                              </div>
                              <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                ${(cartItems.reduce((sum, item) => sum + item.price, 0) * 0.1).toFixed(2)}
                              </div>
                            </div>
                            <div className="flex justify-between pt-4 border-b">
                              <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                Total
                              </div>
                              <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                ${(cartItems.reduce((sum, item) => sum + item.price, 0) * 1.1).toFixed(2)}
                              </div>
                            </div>
                            <Button className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                              <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path
                                  fill="currentColor"
                                  d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                                />
                              </svg>
                              <span className="ml-2 mt-5px">Procceed to checkout</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="outline">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </div>
          </div>

          {/* Item Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={`/placeholder.svg?height=200&width=300`}
                    alt={item.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <p className="text-2xl font-bold">${item.price}</p>
                  <div className="flex items-center mt-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${index < item.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({item.reviews.length} reviews)</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedItem(item)}>View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{item.name}</DialogTitle>
                        <DialogDescription>By {item.sellerName}</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative h-64">
                          <img
                            src={`/placeholder.svg?height=300&width=400`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <Button className="absolute top-1/2 left-2 transform -translate-y-1/2">
                            <ChevronLeft className="h-6 w-6" />
                          </Button>
                          <Button className="absolute top-1/2 right-2 transform -translate-y-1/2">
                            <ChevronRight className="h-6 w-6" />
                          </Button>
                        </div>
                        <div>
                          <p className="text-lg mb-2">{item.description}</p>
                          <p className="text-2xl font-bold mb-2">${item.price}</p>
                          <div className="flex items-center mb-4">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star
                                key={index}
                                className={`h-5 w-5 ${index < item.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">({item.reviews.length} reviews)</span>
                          </div>
                          <div className="mb-4">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Select defaultValue="1">
                              <SelectTrigger id="quantity">
                                <SelectValue placeholder="Select quantity" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5].map(num => (
                                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={() => addToCart(item)}>Add to Cart</Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline">View All Reviews</Button>
                          </SheetTrigger>
                          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                            <SheetHeader>
                              <SheetTitle>Customer Reviews for {item.name}</SheetTitle>
                              <SheetDescription>
                                {item.reviews.length} reviews in total
                              </SheetDescription>
                            </SheetHeader>
                            <div className="mt-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                              {item.reviews.map((review) => (
                                <div key={review.id} className="border-b pb-4">
                                  <div className="flex items-center mb-2">
                                    <span className="font-bold mr-2">{review.user}</span>
                                    <div className="flex">
                                      {Array.from({ length: 5 }).map((_, index) => (
                                        <Star
                                          key={index}
                                          className={`h-4 w-4 ${index < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                            }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p>{review.comment}</p>
                                </div>
                              ))}
                            </div>
                          </SheetContent>
                        </Sheet>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="mx-4">
              Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
            </span>
            <Button
              onClick={() => handlePageChange(Math.min(currentPage + 1, Math.ceil(filteredItems.length / itemsPerPage)))}
              disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
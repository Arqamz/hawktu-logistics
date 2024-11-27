import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Truck, Box, ShoppingBag,Locate } from "lucide-react"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="w-full px-4 lg:px-6 h-20 flex items-center border-b border-border">
        <div className="container mx-auto flex  items-center">
          <Link to="/landing" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">HawkTU</span>
          </Link>
        </div>
        <Link to="/order-tracking">
        <button>
          <Locate/>
        </button>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to HawkTU
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join our community of buyers and sellers. Register now and start your journey with HawkTU!
                </p>
              </div>
              <div className="space-x-4">
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
                <Link to="/registration">
                  <Button variant="outline">Register</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose HawkTU?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Fleet Management</h3>
              </div>
              <div className="flex flex-col items-center text-center">
                <Box className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Inventory Management</h3>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShoppingBag className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">E-Commerce Centre</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-secondary">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; 2024 HawkTU. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

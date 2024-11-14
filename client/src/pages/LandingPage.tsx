import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"

export default function Component(): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="w-full px-4 py-6 flex items-center justify-between">
          <Link to="/Landing" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">HawkTU</span>
          </Link>
        </div>
      <div className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to HawkTU
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The best app for Inventory and Logistics Management.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  to="/Login"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-focus disabled:pointer-events-none disabled:opacity-50"
                >
                  Login
                </Link>
                <Link
                  to="/Registration"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border disabled:pointer-events-none disabled:opacity-50"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full h-20 flex items-center justify-center border-t border-border">
        <p>&copy; 2024 HawkTU. All rights reserved.</p>
      </div>
    </div>
  )
}

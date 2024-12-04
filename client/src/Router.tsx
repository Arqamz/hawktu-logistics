import { createBrowserRouter } from "react-router-dom";
import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import CustomerInformation from "./pages/CustomerInfo";
import Landing from "./pages/Landing";
import Shopping from "./pages/Shop";
import CustomerDashboard from "./pages/CustomerDashboard";
import SellerDashboard from "./pages/SellerDashboard"
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Landing />, // Set Landing page as the home page
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/customer-info",
      element: <CustomerInformation />,
    },
    {
      path: "*",
      element: <NoMatch />,
    },
    {
      path: "/shop",
      element: <Shopping />,
    },
    {
      path: "/customer-dashboard",
      element: <CustomerDashboard />,
    },
    {
      path: "/seller-dashboard",
      element: <SellerDashboard />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/order-tracking",
      element: <OrderTracking />,
    },
  ],
  {
    basename: global?.basename || "/",
  }
);

import { createBrowserRouter } from "react-router-dom";
import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";
import Login from "./pages/Login";
import ClientRegistration from "./pages/ClientRegistration";
import SellerRegistration from "./pages/SellerRegistration";
import Landing from "./pages/LandingPage";
import CustomerInformation from "./pages/CustomerInfo";
import Registration from "./pages/RegisterLanding";
import Shopping from "./pages/Shop";
import CustomerDashboard from "./pages/CustomerDashboard";
import Checkout from "./pages/Checkout";
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "/dddashboard",
          element: <Dashboard />,
        },
        {
          path: "sample",
          element: <Sample />,
        },
        {
          path: "empty",
          element: <Empty />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
        path: "/client-registration",
        element: <ClientRegistration />,
      },{
        path: "/seller-registration",
        element: <SellerRegistration />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "",
        element: <Landing />,
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
        path: "/checkout",
        element: <Checkout />,
      },
  ],
  {
    basename: global?.basename || "/",
  }
);

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
import CustomerInformation from "./pages/customer-info";
import Registration from "./pages/RegisterLanding";
import Shopping from "./pages/e-commerce-page";
import CustomerDashboard from "./pages/customer-dashboard";
import Checkout from "./pages/checkout";
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "",
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
        path: "/ClientRegistration",
        element: <ClientRegistration />,
      },{
        path: "/SellerRegistration",
        element: <SellerRegistration />,
      },
      {
        path: "/Registration",
        element: <Registration />,
      },
      {
        path: "/Landing",
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

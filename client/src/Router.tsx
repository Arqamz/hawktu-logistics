import { createBrowserRouter } from "react-router-dom";
import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import CustomerInformation from "./pages/CustomerInfo";
import Landing from "./pages/Landing";
import Shopping from "./pages/Shop";
import CustomerDashboard from "./pages/CustomerDashboard";
import SellerDashboard from "./pages/SellerDashboard"
import Checkout from "./pages/Checkout";
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "/dashboard",
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
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/landing",
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
        path: "/seller-dashboard",
        element:<SellerDashboard/>,
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

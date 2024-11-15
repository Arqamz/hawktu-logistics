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
import CustomerDashboard from "./pages/CustomerDashboard";
import Registration from "./pages/RegisterLanding";
import Shopping from "./pages/e-commerce-page";

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
        path: "/customerDashboard",
        element: <CustomerDashboard />,
      },
      {
        path: "*",
        element: <NoMatch />,
      },
      {
        path: "/shop",
        element: <Shopping />,
      },
  ],
  {
    basename: global?.basename || "/",
  }
);

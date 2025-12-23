import { createBrowserRouter } from "react-router";
import LogIn from "../components/LogIn&Register/LogIn";
import Register from "../components/LogIn&Register/Register";
import App from "../App";
import Booking from "../components/booking/Booking";
import Layout from "./Layout";
import Section1 from "../components/section/Section1";
import AdminDashboard from "../components/dashboard/Dashboard";
import Products from "../components/products/Products";
import ProductPage from "../components/products/ProductPage";
import Cart from "../components/cart/Cart";

export let routes = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Section1 />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      { path: "products/:id", element: <ProductPage /> },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/Login",
    element: <LogIn />,
  },
  {
    path: "Register",
    element: <Register />,
  },
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },

  // errorElement: <Error404 />,
]);

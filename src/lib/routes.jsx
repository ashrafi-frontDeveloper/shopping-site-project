/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import AboutUSPage from "../Pages/AboutUS.jsx";
import AuthPage from "../Pages/Auth.jsx";
import BlogPage from "../Pages/Blog.jsx";
import CartPage from "../Pages/Cart.jsx";
import ContactUSPage from "../Pages/ContactUS.jsx";
import HomePage from "../Pages/HomePage.jsx";
import ProductPage from "../Pages/Product.jsx";
import Forbidden from "../Pages/Forbidden.jsx";

import { redirect } from "react-router";
import AppLayout from "../Components/Layouts/AppLayout.jsx";
import AuthLayout from "../Components/Layouts/AuthLayout.jsx";
import CMSLayout from "../Components/Layouts/CMSLayout.jsx";

import * as AuthService from "../services/auth.service.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about-us", element: <AboutUSPage /> },
      { path: "contact-us", element: <ContactUSPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "product/:productID", element: <ProductPage /> },
      { path: "blog/:blogID", element: <BlogPage /> },

      {
        path: "auth",
        element: <AuthLayout />,
        children: [{ index: true, element: <AuthPage /> }],
      },

      { path: "forbidden", element: <Forbidden /> },

    ],
  },

  {
    path: "/dashboard",
    element: <CMSLayout />,
    children: [
      {
        path: "moderator",
        loader: async () => {
          try {
            const {data} = await AuthService.getMe();
            if (!data.user.roles.includes("ADMIN")) {
              return redirect('/forbidden')
            } 
            return data.user
          } catch (error) {
            return redirect('/auth')
          }
        },
        children: [
          { index: true, loader: () => redirect("home") },
          { path: "home", element: <div>Home Page</div> },
          { path: "orders", element: <div>Orders Page</div> },
          { path: "products", element: <div>Products Page</div> },
          { path: "tickets", element: <div>Tickets Page</div> },
          { path: "sellers", element: <div>Sellers Page</div> },
          { path: "offs", element: <div>Offs Page</div> },
        ],
      },
    ],
  },
]);

export default router;

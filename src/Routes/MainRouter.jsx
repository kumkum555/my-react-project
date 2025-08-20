import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Products from "../Pages/Products";
import Category from "../Pages/Categories";
import Wishlist from "../Pages/Wishlist";
import NotFound404 from "../Pages/NotFound404";
import Cart from "../Pages/Cart";
import Home from "../Layouts/Home";
import CategoryLayout from "../Layouts/CategoryLayout";

const MainRouter = createBrowserRouter([

  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "cart", element: <Cart /> },
      {
        path: "/products",
        element: <CategoryLayout />,
        children: [
          { index: true, element: <Products /> },
          { path: "category/:slug", element: <Category /> },
        ],
      },
    ],
  },

]);

export default MainRouter;

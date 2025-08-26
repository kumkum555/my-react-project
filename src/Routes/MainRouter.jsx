import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Products from "../Pages/Products";
import Category from "../Pages/Categories";
import Wishlist from "../Pages/Wishlist";
import Login from "../Pages/Login";
import Account from "../Pages/Account";
import ProductDetail from "../Pages/Productdetail";
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
      { path: "wishlist", element: <Wishlist /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },      
      { path: "account", element: <Account /> },   
      {
        path: "products",
        element: <CategoryLayout />,
        children: [
          { index: true, element: <Products /> },
          { path: "category/:slug", element: <Category /> },
           { path: ":id", element: <ProductDetail /> }, 
        ],
      },
      { path: "*", element: <NotFound404 /> },      
    ],
  },
]);

export default MainRouter;

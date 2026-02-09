import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ResetPassword from "../Pages/Auth/ResetPassword";
import Books from "../Pages/Books/Books";
import DashboardLayout from "../Layouts/DashboardLayout";

import PrivateRoute from "./PrivateRoute";
import BookDetails from "../Pages/Books/BookDetails";
import MyOrder from "../Pages/Dashboard/MyOrder";

import MyProfile from "../Pages/Dashboard/MyProfile";
import MyInvoice from "../Pages/Dashboard/MyInvoice";
import AddBooks from "../Pages/Dashboard/Librarian/AddBooks";
import MyBook from "../Pages/Dashboard/Librarian/MyBook";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "reset",
        Component: ResetPassword,
      },
      {
        path: "books",
        Component: Books,
      },
      {
        path: "/book-details/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
        hydrateFallbackElement: (
          <div className=" min-h-[calc(100vh-285px)] flex items-center justify-center">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        ),
      },
    ],
  },

  {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      element: (
        <PrivateRoute>
          <MyProfile />
        </PrivateRoute>
      ),
    },
    {
      path: "my-order",
      element: (
        <PrivateRoute>
          <MyOrder />
        </PrivateRoute>
      ),
    },
    {
      path: "my-invoice",
      element: (
        <PrivateRoute>
          <MyInvoice />
        </PrivateRoute>
      ),
    },
    {
      path: "add-book",
      element: (
        <PrivateRoute>
          <AddBooks></AddBooks>
        </PrivateRoute>
      ),
    },
    {
      path: "my-book",
      element: (
        <PrivateRoute>
          <MyBook></MyBook>
        </PrivateRoute>
      ),
    },
  ],
}
]);

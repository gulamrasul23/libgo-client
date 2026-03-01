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
import UpdateBook from "../Pages/Dashboard/Librarian/UpdateBook";
import Orders from "../Pages/Dashboard/Librarian/Orders";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import ManageBooks from "../Pages/Dashboard/Admin/ManageBooks";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import MyWishList from "../Pages/Dashboard/MywishList";
import NotFound from "../Components/NotFound";
import About from "../Pages/About/About";
import Blog from "../Pages/Blog/Blog";
import AdminOverview from "../Pages/Dashboard/Admin/AdminOverview";
import Contact from "../Pages/Contact/Contact";

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
        path: "blog",
        element: (
          <PrivateRoute>
            <Blog></Blog>
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "book-details/:id",
        element: <BookDetails></BookDetails>,
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
        path: "my-wishlist",
        element: (
          <PrivateRoute>
            <MyWishList></MyWishList>
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
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <Orders></Orders>
          </PrivateRoute>
        ),
      },
      {
        path: "update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook></UpdateBook>
          </PrivateRoute>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminProfile></AdminProfile>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin-overview",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminOverview></AdminOverview>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers></AllUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageBooks></ManageBooks>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { GoGift } from "react-icons/go";
import { FaFileInvoice } from "react-icons/fa";
import { BiBookAdd } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { TiHomeOutline } from "react-icons/ti";
import { GoSidebarCollapse } from "react-icons/go";
import { PiListHeartFill } from "react-icons/pi";
import { LuSwatchBook } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { RiKanbanView } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import useRole from "../hooks/useRole";
import ScrollToTop from "../Components/ScrollToTop";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {

  const { role } = useRole();
  const location = useLocation();

  const { logOutUser } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out !"
    }).then((result) => {
      if (result.isConfirmed) {
        logOutUser()

          .then(() => {
            window.location.href = '/login';
            Swal.fire({
              title: "Logout..!",
              text: "You logged out successfully.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          });
      }
    })
      .catch((error) => {
        Swal.fire({
          title: "Something Went Wrong...!",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  const getTitle = (pathname) => {
    const pageTitles = {
      "/dashboard": "My Profile",
      "/dashboard/my-order": "My Order",
      "/dashboard/my-invoice": "My Invoice",
      "/dashboard/my-wishlist": "My Wishlist",
      "/dashboard/add-book": "Add Books",
      "/dashboard/my-book": "My Books",
      "/dashboard/orders": "Orders",
      "/dashboard/users": "Manage Users",
      "/dashboard/manage-books": "Manage Books",
      "/dashboard/admin-profile": "My Profile",
      "/dashboard/admin-overview": "Overview"
    };

    if (/^\/dashboard\/update-book\/.+/.test(pathname)) {
      return "Update Book";
    }

    return pageTitles[pathname] || "Dashboard";
  };

  let currentTitle = getTitle(location.pathname);

  return (
    <div className="drawer md:drawer-open max-w-7xl  mx-auto">
      <title>LibGo_Dashboard</title>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">

        <nav className="navbar w-full bg-base-200">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost flex justify-center"
          >

            <GoSidebarCollapse size={25} />
          </label>
          <div className="flex justify-between w-full">
            <div className="px-4 ">{currentTitle}</div>
            <div>
              <div className="cursor-pointer px-3 gap-2 block sm:hidden navbar-end">
                <label className="toggle text-base-content ">
                  <input
                    type="checkbox"
                    value="dark"
                    onChange={handleToggle}
                    checked={theme === "dark"}
                    className=" theme-controller"
                  />

                  <svg
                    aria-label="sun"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="4"></circle>
                      <path d="M12 2v2"></path>
                      <path d="M12 20v2"></path>
                      <path d="m4.93 4.93 1.41 1.41"></path>
                      <path d="m17.66 17.66 1.41 1.41"></path>
                      <path d="M2 12h2"></path>
                      <path d="M20 12h2"></path>
                      <path d="m6.34 17.66-1.41 1.41"></path>
                      <path d="m19.07 4.93-1.41 1.41"></path>
                    </g>
                  </svg>

                  <svg
                    aria-label="moon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    </g>
                  </svg>
                </label>
              </div>
              <div className="hidden sm:block">
                <label className="flex cursor-pointer pl-2 gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                  <input
                    type="checkbox"
                    value="dark"
                    onChange={handleToggle}
                    checked={theme === "dark"}
                    className="toggle theme-controller"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </nav>

        <div>
          <ScrollToTop></ScrollToTop>
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-300 is-drawer-close:w-14 is-drawer-open:w-50">
          <ul className="menu w-full grow gap-2">
            <li>
              <NavLink
                to="/"
                data-tip="Homepage"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 pt-3.5"
              >
                <TiHomeOutline size={22} />
                <span className="is-drawer-close:hidden font-bold">Homepage</span>
              </NavLink>
            </li>

            {(role === "customer" || role === "librarian") && <li>
              <NavLink
                to="/dashboard"
                end
                data-tip="My Profile"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                }
              >
                <MdManageAccounts size={22} />
                <span className="is-drawer-close:hidden font-bold">My Profile</span>
              </NavLink>
            </li>}

            {role === "customer" && <>
              <li>
                <NavLink
                  to="/dashboard/my-order"
                  data-tip="My Order"
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                  }
                >
                  <GoGift size={20} />
                  <span className="is-drawer-close:hidden font-bold">My Orders</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-invoice"
                  data-tip="My Invoice"
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                  }
                >
                  <FaFileInvoice size={22} />
                  <span className="is-drawer-close:hidden font-bold">My Invoice</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-wishlist"
                  data-tip="My Wishlist"
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                  }
                >
                  <PiListHeartFill size={24} />
                  <span className="is-drawer-close:hidden font-bold">My Wishlist</span>
                </NavLink>
              </li>
            </>}
            {role === 'librarian' && <>
              <li>
                <NavLink
                  to="/dashboard/add-book"
                  data-tip="Add Books"
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                  }
                >
                  <BiBookAdd size={22} />
                  <span className="is-drawer-close:hidden font-bold">Add Books</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-book"
                  data-tip="My Books"
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                  }
                >
                  <FaBook size={20} />
                  <span className="is-drawer-close:hidden font-bold">My Books</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/orders"
                  data-tip="Orders"
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                  }
                >
                  <FaShopify size={20} />
                  <span className="is-drawer-close:hidden font-bold">Orders</span>
                </NavLink>
              </li>

            </>}
            {role === 'admin' && <>
              <li>
                <NavLink
                  to="/dashboard/admin-profile"
                  end
                  data-tip="My Profile"
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                  }
                >
                  <MdManageAccounts size={22} />
                  <span className="is-drawer-close:hidden font-bold ">My Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin-overview"
                  data-tip="Overview"
                  end
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                  }
                >
                  <RiKanbanView size={20} />
                  <span className="is-drawer-close:hidden font-bold">Overview</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/users"
                  data-tip="Manage Users"
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                  }
                >
                  <FaUsers size={20} />
                  <span className="is-drawer-close:hidden font-bold">Manage Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-books"
                  data-tip="Manage Books"
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                  }
                >
                  <LuSwatchBook size={20} />
                  <span className="is-drawer-close:hidden font-bold">Manage Books</span>
                </NavLink>
              </li>
            </>}
            <li>
              <button
                onClick={handleLogOut}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Log Out"
              >
                <IoIosLogOut size={22} />
                <span className="is-drawer-close:hidden font-bold">Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

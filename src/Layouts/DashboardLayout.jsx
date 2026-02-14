import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { GoGift } from "react-icons/go";
import { FaFileInvoice } from "react-icons/fa";
import { BiBookAdd } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineSettings } from "react-icons/md";
import { GoSidebarCollapse } from "react-icons/go";
import { PiListHeartFill } from "react-icons/pi";
import { LuSwatchBook } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import useRole from "../hooks/useRole";
import ScrollToTop from "../Components/ScrollToTop";

const DashboardLayout = () => {

  const { role } = useRole();
  const location = useLocation();
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

  const getTitle = (pathname) => {
    const pageTitles = {
      "/dashboard": "My Profile",
      "/dashboard/my-order": "My Order",
      "/dashboard/my-invoice": "My Invoice",
      "/dashboard/my-wishlist": "My Wishlist",
      "/dashboard/add-book": "Add Books",
      "/dashboard/my-book": "My Books",
      "/dashboard/orders": "Orders",
      "/dashboard/users": "All Users",
      "/dashboard/manage-books": "Manage Books",
      "/dashboard/admin-profile": "My Profile",
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
            className="btn btn-square btn-ghost flex justify-between"
          >

            <GoSidebarCollapse size={22} />
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
          <ul className="menu w-full grow">
            <li>
              <NavLink
                to="/"
                data-tip="Homepage"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10"
              >
                <TiHomeOutline size={22} />
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                end
                data-tip="My Profile"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                }
              >
                <MdManageAccounts size={22} />
                <span className="is-drawer-close:hidden ">My Profile</span>
              </NavLink>
            </li>

            {<>
              <li>
                <NavLink
                  to="/dashboard/my-order"
                  data-tip="My Order"
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                  }
                >
                  <GoGift size={20} />
                  <span className="is-drawer-close:hidden">My Orders</span>
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
                  <span className="is-drawer-close:hidden">My Invoice</span>
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
                  <span className="is-drawer-close:hidden">My Wishlist</span>
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
                  <span className="is-drawer-close:hidden">Add Books</span>
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
                  <span className="is-drawer-close:hidden">My Books</span>
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
                  <span className="is-drawer-close:hidden">Orders</span>
                </NavLink>
              </li>

            </>}
            {role === 'admin' && <>
              <li>
                <NavLink
                  to="/dashboard/users"
                  data-tip="All Users"
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-content/10 ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : ""}`
                  }
                >
                  <FaUsers size={20} />
                  <span className="is-drawer-close:hidden">All Users</span>
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
                  <span className="is-drawer-close:hidden">Manage Books</span>
                </NavLink>
              </li>
            </>}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <MdOutlineSettings size={22} />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

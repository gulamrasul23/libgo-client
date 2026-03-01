import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../../Components/Logo";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    logOutUser()
      .then(() => {
        Swal.fire({
          title: "Logout..!",
          text: "You logged out successfully.",
          icon: "info",
        });
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

  const links = (
    <>
      {user ? (
        <>
          <li onClick={() => setDropdownOpen(false)}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:bg-base-content/10 font-semibold ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : " bg-base-100"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li onClick={() => setDropdownOpen(false)}>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                `hover:bg-base-content/10 font-semibold ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : " bg-base-100"}`
              }
            >
              Books
            </NavLink>
          </li>{" "}
          <li onClick={() => setDropdownOpen(false)}>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `hover:bg-base-content/10 font-semibold ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : " bg-base-100"}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li onClick={() => setDropdownOpen(false)}>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `hover:bg-base-content/10 font-semibold ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : " bg-base-100"}`
              }
            >
              Blog
            </NavLink>
          </li>
          <li onClick={() => setDropdownOpen(false)}>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:bg-base-content/10 font-semibold ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : " bg-base-100"}`
              }
            >
              About
            </NavLink>
          </li>
          <li onClick={() => setDropdownOpen(false)}>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:bg-base-content/10 font-semibold ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : " bg-base-100"}`
              }
            >
              Contact
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li onClick={() => setDropdownOpen(false)}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:bg-base-content/10 font-semibold ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : " bg-base-100"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li onClick={() => setDropdownOpen(false)}>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                `hover:bg-base-content/10 font-semibold ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : " bg-base-100"}`
              }
            >
              Books
            </NavLink>
          </li>
          <li onClick={() => setDropdownOpen(false)}>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:bg-base-content/10 font-semibold ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : " bg-base-100"}`
              }
            >
              About
            </NavLink>
          </li>
          <li onClick={() => setDropdownOpen(false)}>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:bg-base-content/10 font-semibold ${isActive ? "underline decoration-2 underline-offset-3 text-primary" : " bg-base-100"}`
              }
            >
              Contact
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div>
      <div className="navbar max-w-7xl z-50 bg-base-100 fixed top-0 left-1/2 transform -translate-x-1/2 shadow-sm">
        <div className="navbar-start">
          <div className={"dropdown "}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="btn btn-ghost btn-sm p-1 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </button>

            {dropdownOpen && (
              <ul className="menu menu-md absolute -translate-x-2 dropdown-content bg-base-100 rounded-box z-10 mt-3 w-35 p-2 shadow font-medium">
                {links}
              </ul>
            )}
          </div>
          <div className="flex items-center">
            <Link
              to="/"
              className="btn hover:bg-transparent hover:border-transparent btn-ghost hover:shadow-none px-1 text-[18px] sm:text-xl"
            >
              <div className="w-12">
                <Logo></Logo>
              </div>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="dropdown dropdown-bottom dropdown-end sm:dropdown-center ">
                <div
                  tabIndex={0}
                  role="button"
                  className="h-9 w-9 ring ring-primary ring-offset-primary ring-offset-1 rounded-full"
                >
                  {/* <Link
                    to="/"
                    className="cursor-pointer"
                    data-tip={user.displayName}
                  > */}
                  {user?.photoURL ? (
                    <img
                      src={user?.photoURL}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.src = "/user-icon.png";
                      }}
                      className=" h-9 w-9 object-cover rounded-full cursor-pointer"
                    ></img>
                  ) : (
                    <img
                      src="/user-icon.png"
                      className=" object-cover rounded-full  "
                    ></img>
                  )}
                  {/* </Link> */}
                </div>
                <div className="relative">
                  <div
                    tabIndex={0}
                    className="dropdown-content absolute top-2 card-sm  bg-base-100 rounded-box z-1 w-56 shadow-2xl"
                  >
                    <div className="card-body font-medium">
                      <p className="text-[14px]">{user.displayName}</p>
                      <p>{user.email}</p>
                      <Link
                        onClick={handleLogOut}
                        className="btn btn-primary hover:btn-secondary"
                        to="/"
                      >
                        Log Out
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                onClick={handleLogOut}
                className="btn btn-sm sm:btn-md btn-primary hover:btn-secondary ml-2 sm:ml-4"
                to="/"
              >
                Log Out
              </Link>
            </>
          ) : (
            <>
              <Link
                className=" btn btn-primary btn-sm sm:btn-md mr-2 hover:btn-secondary hover:text-white "
                to="/login"
              >
                Login
              </Link>
              <Link
                className=" btn btn-primary btn-sm sm:btn-md hover:btn-secondary hover:text-white "
                to="/register"
              >
                Register
              </Link>
            </>
          )}
          <div className="cursor-pointer px-3 gap-2 block sm:hidden">
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
    </div>
  );
};

export default Navbar;

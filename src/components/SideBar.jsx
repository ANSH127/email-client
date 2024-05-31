import { InboxIcon, Bars3Icon } from "@heroicons/react/20/solid";
import {
  PaperAirplaneIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
export default function Sidebar() {
  const user = localStorage.getItem("user");
  const location = useLocation();


  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-md">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="w-6 h-6" />
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-black">
                  Email
                </span>
              </a>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ms-3 gap-2">
                {!user ? (
                  <>
                    <Link
                      to={"/login"}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Login
                    </Link>

                    <Link
                      to={"/signup"}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 shadow-md"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium text-black">
            <li>
              <Link
                to="/compose"
                className={`flex items-center p-2 group hover:text-blue-500 ${
                  location.pathname === "/compose" ? "text-blue-500" : ""
                }`}
              >
                <PencilSquareIcon className="w-6 h-6" />

                <span className="ms-3">Compose</span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`flex items-center p-2 group hover:text-blue-500 ${
                  location.pathname === "/" ? "text-blue-500" : ""
                }`}
              >
                <InboxIcon className="w-6 h-6" />

                <span className="ms-3">Inbox</span>
              </Link>
            </li>
            <li>
              <Link
                to="/sent"
                className={`flex items-center p-2 group hover:text-blue-500 ${
                  location.pathname === "/sent" ? "text-blue-500" : ""
                }`}
              >
                <PaperAirplaneIcon className="w-6 h-6" />

                <span className="ms-3">Sent</span>
              </Link>
            </li>
            <li>
              <Link
                to="/trash"
                className={`flex items-center p-2 group hover:text-blue-500 ${
                  location.pathname === "/trash" ? "text-blue-500" : ""
                }`}
              >
                <TrashIcon className="w-6 h-6" />

                <span className="ms-3">Trash</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

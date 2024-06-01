import { InboxIcon, Bars3Icon } from "@heroicons/react/20/solid";
import {
  PaperAirplaneIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import { Link,useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

import Avatar from "../assets/images/Avatar.jpg";
import SadFace from "../assets/images/sad-face2.png";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    signOut(auth);
    navigate("/login");
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
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 "
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user ? Avatar : SadFace}
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-black divide-y divide-gray-100 rounded shadow"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {user?.displayName}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {user?.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    { !user ?
                      <>
                        <li>
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/signup"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            SignUp
                          </Link>
                        </li>
                      </>
                      :
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </button>
                      </li>
                    }
                  </ul>
                </div>
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

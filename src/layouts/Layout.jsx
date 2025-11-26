import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SidebarAdmin from "../components/layout/SidebarAdmin";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useAuth } from "../contexts/AuthContext";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function Layout() {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isUserPanelRoute = location.pathname.startsWith("/layout/user-panel");
  const isDashboardRoute = location.pathname.startsWith("/layout/dashboard");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Navbar */}
      <div className="flex px-7 bg-white dark:bg-gray-800 border-2 dark:border-gray-700 py-2 justify-between items-center flex-shrink-0">
        <div className="flex gap-8 items-center">
          <img
            className="h-[16px] w-[40px] dark:brightness-0 dark:invert"
            src="/menu.png"
            alt="img"
          />
          <img
            className="h-[46px] w-[50px] dark:brightness-0 dark:invert"
            src="/logo.png"
            alt="img"
          />
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow dark:shadow-gray-900 w-[386px] rounded-full"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          
          
          {/* User Info Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <FaUserCircle className="text-gray-600 dark:text-gray-300" />
              <div className="text-sm">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role || "Role"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-lg transition-colors"
              title="Logout"
            >
              <FaSignOutAlt />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 bg-slate-100 dark:bg-gray-900 overflow-x-visible overflow-y-hidden relative">
        {/* Sidebar (always visible on the left) */}
        <SidebarAdmin />

        {/* Main Section */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main Content changes here */}
          <main className="p-4 flex gap-6 flex-wrap overflow-y-auto flex-1">
            <Outlet />
          </main>
        </div>

        {/* Right Sidebar (Activity summary etc.) */}
        {isUserPanelRoute ? (
          // Show task-focused sidebar only on User Panel
          <div className="w-[18vw] mr-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900 p-4 flex flex-col">
            <div className="flex gap-3">
              <button className="flex-1 bg-[#153984] hover:bg-[#0f3174] text-white py-2 rounded-[18px] font-semibold text-sm shadow">
                Today's Task
              </button>
              <button className="flex-1 bg-[#153984] hover:bg-[#0f3174] text-white py-2 rounded-[18px] font-semibold text-sm shadow">
                Over dues
              </button>
            </div>
            <div className="mt-4 flex-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-inner dark:shadow-gray-900/60" />
          </div>
        ) : isDashboardRoute ? (
          // Show activity summary sidebar only on Dashboard (default after login)
          <div className="w-[18vw] mr-4 border-l border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900 flex flex-col px-3 py-6 space-y-10 overflow-hidden">
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 text-center">
              Activity summary
            </h2>

            {/* Active user box */}
            <div className="w-full border dark:border-gray-700 rounded-xl shadow-sm dark:shadow-gray-900 p-4 flex items-center justify-center hover:shadow-md dark:hover:shadow-gray-800 cursor-pointer bg-white dark:bg-gray-700">
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                Active user
              </span>
            </div>

            {/* Last invoice box */}
            <div className="w-full border dark:border-gray-700 rounded-xl shadow-sm dark:shadow-gray-900 p-4 flex items-center justify-center hover:shadow-md dark:hover:shadow-gray-800 cursor-pointer bg-white dark:bg-gray-700">
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                Last invoice
              </span>
            </div>

            {/* App store buttons */}
            <div className="flex flex-col items-center space-y-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="w-36"
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="w-36"
              />
            </div>

            {/* Contact Info */}
            <div className="mt-6 text-center space-y-1">
              <h3 className="font-medium text-gray-700 dark:text-gray-200">
                Contact us
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                +91-9686705904
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
                Neamatullahmdmuslim@gmail.com
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

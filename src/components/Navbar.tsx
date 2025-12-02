import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/appStore";
import { logOut } from "@/services/authService";
import ToggleSwitch from "./ToggleSwitch";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme, user, setUser } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Data Entry", href: "/data-entry" },
    { label: "Calculator", href: "/calculator" },
    { label: "Benchmarks", href: "/benchmarks" },
    { label: "Recommendations", href: "/recommendations" },
    { label: "Reports", href: "/reports" },
    { label: "Learn", href: "/learn" },
    { label: "Settings", href: "/settings" },
  ];

  const isActive = (href: string) => location.pathname === href;
  const isLoginPage = location.pathname === "/login";

  return (
    <nav className="bg-white dark:bg-neutral-900 shadow-soft sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-heading font-bold text-xl text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors flex-shrink-0"
          >
            <span>🌱</span>
            <span className="hidden sm:inline">Carbon Tracker</span>
          </Link>

          {/* Desktop Navigation */}
          {!isLoginPage && (
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center mx-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`
                    px-2.5 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap
                    ${
                      isActive(link.href)
                        ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                        : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Section: User Info + Theme Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {user && !isLoginPage && (
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-xs xl:text-sm text-neutral-600 dark:text-neutral-400 max-w-[150px] truncate">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs xl:text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
            
            <ToggleSwitch
              checked={theme === "dark"}
              onChange={(checked) => setTheme(checked ? "dark" : "light")}
              label="Dark"
            />

            {/* Mobile Menu Button */}
            {!isLoginPage && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && !isLoginPage && (
          <div className="lg:hidden pb-4 border-t border-neutral-200 dark:border-neutral-700 pt-2">
            {user && (
              <div className="px-3 py-2 mb-2 text-sm text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700">
                <div className="font-medium">{user.displayName || user.email}</div>
                <button
                  onClick={handleLogout}
                  className="mt-2 w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive(link.href)
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

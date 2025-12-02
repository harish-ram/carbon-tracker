import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppStore } from "@/store/appStore";
import ToggleSwitch from "./ToggleSwitch";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { theme, setTheme } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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

  return (
    <nav className="bg-white dark:bg-neutral-900 shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-heading font-bold text-xl text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors"
          >
            <span>🌱</span>
            <span>Carbon Tracker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
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

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <ToggleSwitch
              checked={theme === "dark"}
              onChange={(checked) => setTheme(checked ? "dark" : "light")}
              label="Dark"
            />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-neutral-200 dark:border-neutral-700">
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

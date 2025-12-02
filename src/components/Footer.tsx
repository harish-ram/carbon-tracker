import React from "react";
import { useLocation } from "react-router-dom";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <footer className="bg-neutral-900 dark:bg-black text-neutral-300 dark:text-neutral-400 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isLoginPage && (
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="font-heading font-bold text-white mb-4">About</h3>
              <p className="text-sm">
                Smart Carbon Footprint & Sustainability Tracker helps businesses measure, monitor, and reduce emissions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-bold text-white mb-4">Quick Links</h3>
              <ul className="text-sm space-y-2">
                <li><a href="/dashboard" className="hover:text-primary-400 transition">Dashboard</a></li>
                <li><a href="/calculator" className="hover:text-primary-400 transition">Calculator</a></li>
                <li><a href="/benchmarks" className="hover:text-primary-400 transition">Benchmarks</a></li>
                <li><a href="/reports" className="hover:text-primary-400 transition">Reports</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-heading font-bold text-white mb-4">Resources</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-primary-400 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-primary-400 transition">API Reference</a></li>
                <li><a href="#" className="hover:text-primary-400 transition">Support</a></li>
                <li><a href="#" className="hover:text-primary-400 transition">Blog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-heading font-bold text-white mb-4">Contact</h3>
              <ul className="text-sm space-y-2">
                <li>Email: info@carbontracker.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li className="flex gap-3 mt-4">
                  <a href="#" className="hover:text-primary-400 transition">Twitter</a>
                  <a href="#" className="hover:text-primary-400 transition">LinkedIn</a>
                  <a href="#" className="hover:text-primary-400 transition">GitHub</a>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="border-t border-neutral-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-500">
            © {currentYear} Smart Carbon Footprint. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-primary-400 transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

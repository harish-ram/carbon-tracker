import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "@/store/appStore";
import { subscribeToAuthChanges } from "@/services/authService";
import { useOrientation } from "@/hooks/useOrientation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import DataEntry from "@/pages/DataEntry";
import CarbonCalculator from "@/pages/CarbonCalculator";
import Benchmarks from "@/pages/Benchmarks";
import Recommendations from "@/pages/Recommendations";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import Learn from "@/pages/Learn";
import Login from "@/pages/Login";
import "@/styles/globals.css";

export const App: React.FC = () => {
  const { theme, setUser, loadRecords } = useAppStore();
  const orientation = useOrientation();

  // Subscribe to authentication state changes
  React.useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      // Load records when user logs in
      if (user) {
        loadRecords();
      }
    });

    return () => unsubscribe();
  }, [setUser, loadRecords]);

  // Handle orientation changes for mobile optimization
  React.useEffect(() => {
    // Add orientation class to body for CSS targeting
    document.body.classList.toggle('orientation-portrait', orientation.isPortrait);
    document.body.classList.toggle('orientation-landscape', orientation.isLandscape);

    // Force viewport recalculation on orientation change
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      const content = viewport.getAttribute('content');
      viewport.setAttribute('content', content + ', user-scalable=no');
      setTimeout(() => {
        viewport.setAttribute('content', content + ', user-scalable=yes');
      }, 100);
    }
  }, [orientation.isPortrait, orientation.isLandscape]);

  // Handle theme changes
  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/data-entry" element={<ProtectedRoute><DataEntry /></ProtectedRoute>} />
            <Route path="/calculator" element={<ProtectedRoute><CarbonCalculator /></ProtectedRoute>} />
            <Route path="/benchmarks" element={<ProtectedRoute><Benchmarks /></ProtectedRoute>} />
            <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

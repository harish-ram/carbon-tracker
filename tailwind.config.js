module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#00a86b",
          600: "#16a34a",
          700: "#15803d",
          900: "#006644",
        },
        secondary: {
          50: "#f0f9ff",
          500: "#0095ff",
          600: "#0084e0",
          700: "#0073c6",
        },
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#1e1e1e",
        },
        warning: "#f97316",
        error: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
        "3xl": ["30px", "36px"],
        "4xl": ["36px", "40px"],
      },
      boxShadow: {
        soft: "0px 10px 30px rgba(15, 23, 42, 0.08)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        lg: "14px",
        xl: "16px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
        "scale-in": "scaleIn 0.3s ease-out",
        "slide-up": "slideUp 0.35s ease-out",
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

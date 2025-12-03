# Technologies & Topics Covered in Smart Carbon Tracker Project

## Table of Contents
- [HTML](#html)
- [CSS & Styling](#css--styling)
- [JavaScript](#javascript)
- [TypeScript](#typescript)
- [React.js](#reactjs)
- [Additional Technologies](#additional-technologies)

---

## HTML

### 1. **Semantic HTML Structure**
**File:** `index.html` (Lines: 1-17)
- `<!doctype html>` declaration
- `<html>`, `<head>`, `<body>` structure
- Semantic meta tags for SEO and viewport

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Smart Carbon Footprint & Sustainability Tracker</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### 2. **Meta Tags**
**File:** `index.html` (Lines: 4-6)
- `charset="UTF-8"` for character encoding
- `viewport` meta tag for responsive design
- `description` meta tag for SEO

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="Smart Carbon Footprint & Sustainability Tracker - Measure, monitor, and reduce business carbon emissions with advanced analytics and recommendations." />
```

### 3. **External Resource Loading**
**File:** `index.html` (Lines: 7-10)
- Favicon using SVG data URI (Line 5)
- Preconnecting to Google Fonts for performance (Lines 8-9)
- Loading external fonts (Line 10)

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌱</text></svg>" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet" />
```

### 4. **Module Scripts**
**File:** `index.html` (Line 15)
- `<script type="module">` for ES6 module loading
- Connecting to TypeScript/React entry point

```html
<script type="module" src="/src/main.tsx"></script>
```

---

## CSS & Styling

### 1. **Tailwind CSS Framework**
**File:** `tailwind.config.js` (Lines: 1-92)
- Custom configuration and theme extension
- Dark mode support with class strategy (Line 2)
- Content purging configuration (Line 3)

```javascript
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#00a86b",
          600: "#16a34a",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
```

### 2. **CSS Custom Properties & Theme Extension**
**File:** `tailwind.config.js` (Lines: 6-62)
- Custom color palette definition (Lines 7-34)
- Primary, secondary, neutral color systems
- Error and warning color states

### 3. **Custom Font Configuration**
**File:** `tailwind.config.js` (Lines: 35-38)
- Custom font families (Inter, Montserrat)
- Font weight variants

### 4. **Responsive Typography**
**File:** `tailwind.config.js` (Lines: 39-46)
- Custom font sizes with line heights
- Mobile-first typography scale

### 5. **Custom Shadows & Effects**
**File:** `tailwind.config.js` (Lines: 47-50)
- Box shadow utilities
- Soft shadows for modern UI

### 6. **Border Radius Utilities**
**File:** `tailwind.config.js` (Lines: 51-54)
- Custom border radius values

### 7. **CSS Animations**
**File:** `tailwind.config.js` (Lines: 55-62)
- Fade-in, scale-in, slide-up animations
- Pulse-glow effect
- Custom keyframes (Lines 63-80)

```javascript
animation: {
  "fade-in": "fadeIn 0.3s ease-in",
  "scale-in": "scaleIn 0.3s ease-out",
  "slide-up": "slideUp 0.35s ease-out",
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
}
```

### 8. **PostCSS Configuration**
**File:** `postcss.config.js` (Lines: 1-6)
- Tailwind CSS integration
- Autoprefixer for browser compatibility

### 9. **Global CSS Styles**
**File:** `src/styles/globals.css` (Lines: 1-159)
- Tailwind directives (@tailwind base, components, utilities)
- Custom CSS layers (@layer)

### 10. **CSS Custom Components**
**File:** `src/styles/globals.css` (Lines: 22-89)
- `.card` and `.card-hover` components
- `.btn` variants (primary, secondary, outline)
- `.input-base` form styling
- Grid responsive utilities

```css
.card {
  @apply bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6;
}

.btn-primary {
  @apply btn bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 active:scale-95 focus:ring-primary-500;
}

.input-base {
  @apply w-full px-4 py-2.5 rounded-lg border-2 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white;
  @apply border-neutral-200 dark:border-neutral-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-200;
}
```

### 11. **Dark Mode Styling**
**File:** `src/styles/globals.css` (Throughout)
- Dark mode variants using `dark:` prefix
- Theme-aware color transitions
- Dark mode text and background colors

### 12. **Custom Scrollbar Styling**
**File:** `src/styles/globals.css` (Lines: 91-105)
- Webkit scrollbar customization
- Dark mode scrollbar support

### 13. **Keyframe Animations**
**File:** `src/styles/globals.css` (Lines: 108-125)
- Shimmer effect animation
- Spin-slow animation
- Background position animations

### 14. **Responsive Design**
**File:** `src/styles/globals.css` (Lines: 133-143)
- Mobile-first approach
- Media queries for breakpoints
- Hide/show utilities for different screen sizes

### 15. **CSS Transitions**
**File:** `src/styles/globals.css` (Throughout)
- Smooth color transitions
- Transform transitions
- Duration and timing functions

---

## JavaScript

### 1. **ES6+ Modules**
**File:** `vite.config.ts` (Line 1)
- Import/export syntax
- Module bundling with Vite

### 2. **Arrow Functions**
**File:** `src/utils/helpers.ts` (Throughout)
- Modern function syntax
- Example: Line 6-14 in `formatNumber`

```javascript
export const formatNumber = (
  value: number,
  decimals: number = 2,
  suffix: string = ""
): string => {
  return (
    value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix
  );
};
```

### 3. **Template Literals**
**File:** `src/utils/helpers.ts` (Lines: 52-54)
- String interpolation
- Multi-line strings

### 4. **Destructuring**
**File:** `src/components/FormInput.tsx` (Lines: 19-31)
- Object destructuring in function parameters
- Array destructuring

### 5. **Spread Operator**
**File:** `src/store/appStore.ts` (Lines: 84-86)
- Object spreading
- Array spreading for immutability

### 6. **Async/Await**
**File:** `src/services/authService.ts` (Lines: 23-39)
- Asynchronous operations
- Promise handling with try-catch

```javascript
export const signUp = async (email: string, password: string, displayName?: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    await createUserDocument(userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create account');
  }
};
```

### 7. **Array Methods**
**File:** `src/utils/emissions.ts` (Throughout)
- `.map()` (Lines: 67-69)
- `.filter()` (Lines: 203-208)
- `.reduce()` (Lines: 5-6, 25-36)
- `.forEach()` (Lines: 18-30)
- `.sort()` (Lines: 211-217)

```javascript
// .reduce() example
export const calculateTotalEmissions = (records: EmissionRecord[]): number => {
  return records.reduce((sum, record) => sum + (record.co2e || 0), 0);
};

// .map() example
const monthlyData = Object.entries(data)
  .map(([monthKey, data]) => ({
    month: monthKey,
    ...data,
  }));

// .filter() example
const filteredRecords = records.filter((record) => {
  const recordDate = new Date(`${record.year}-${record.month}-01`);
  return recordDate >= startDate && recordDate <= endDate;
});
```

### 8. **Object Methods**
**File:** `src/utils/helpers.ts` (Lines: 140-148)
- `Object.entries()`
- `Object.keys()`
- Object manipulation

### 9. **Conditional (Ternary) Operators**
**File:** `src/components/KPICard.tsx` (Lines: 24, 48-50)
- Inline conditional rendering
- Complex ternary chains

### 10. **Optional Chaining**
**File:** `src/components/ToggleSwitch.tsx` (Line 21)
- Safe property access with `?.`
- Preventing undefined errors

### 11. **Nullish Coalescing**
**File:** `src/utils/emissions.ts` (Lines: 6, 19)
- Default values with `||`
- Using `??` operator

### 12. **Regular Expressions**
**File:** `src/utils/helpers.ts` (Lines: 120-122)
- Email validation regex
- Pattern matching

### 13. **Local Storage API**
**File:** `src/store/appStore.ts` (Lines: 159-166)
- Persisting data with Zustand persist middleware
- Browser storage

### 14. **Date Object Manipulation**
**File:** `src/utils/helpers.ts` (Lines: 47-51, 57-59)
- Date formatting
- Current date operations
- Month/year extraction

### 15. **JSON Operations**
**File:** `src/utils/helpers.ts` (Lines: 167-169)
- `JSON.parse()` and `JSON.stringify()`
- Deep cloning objects

---

## TypeScript

### 1. **Type Annotations**
**File:** `src/types/index.ts` (Throughout)
- Variable type declarations
- Function return types

### 2. **Interfaces**
**File:** `src/types/index.ts` (Lines: 1-69)
- `EmissionRecord` interface (Lines 2-12)
- `ScopeEmissions` interface (Lines 15-19)
- `CompanyProfile` interface (Lines 22-29)
- `Recommendation` interface (Lines 40-49)

```typescript
export interface EmissionRecord {
  id: string;
  month: string;
  year: number;
  category: "electricity" | "fuel" | "water" | "waste" | "travel";
  value: number;
  unit: string;
  co2e?: number;
  timestamp: string;
  notes?: string;
}

export interface ScopeEmissions {
  scope1: number; // Direct emissions
  scope2: number; // Indirect energy
  scope3: number; // Indirect other
}
```

### 3. **Type Aliases**
**File:** `src/types/index.ts` (Line 5)
- Union types for specific values
- Example: `"electricity" | "fuel" | "water" | "waste" | "travel"`

### 4. **Generics**
**File:** `src/utils/helpers.ts` (Lines: 140-149, 151-163)
- Generic functions with `<T>`
- Type-safe array operations
- Example: `groupBy<T>()`, `sortBy<T>()`

```typescript
export const groupBy = <T,>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T,>(
  array: T[],
  key: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
};
```

### 5. **Optional Properties**
**File:** `src/types/index.ts` (Throughout)
- Using `?` for optional fields
- Example: Line 10 `notes?: string`

### 6. **Readonly Modifiers**
**File:** `src/components/FormInput.tsx` (Lines: 3-16)
- Immutable properties
- Interface property modifiers

### 7. **Union Types**
**File:** `src/types/index.ts` (Lines: 33-37)
- Combining multiple types
- Example: `"light" | "dark"`, `"low" | "medium" | "high"`

### 8. **Enum-like Types**
**File:** `src/types/index.ts` (Line 36)
- String literal unions as enums
- Type safety for specific values

### 9. **Function Type Definitions**
**File:** `src/components/FormInput.tsx` (Lines: 6-7)
- `onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void`
- Callback type definitions

### 10. **Type Inference**
**File:** `src/utils/helpers.ts` (Throughout)
- Automatic type detection
- Return type inference

### 11. **Type Guards**
**File:** `src/utils/helpers.ts` (Lines: 125-128)
- Runtime type checking
- Example: `typeof`, `instanceof`

### 12. **Utility Types**
**File:** `src/store/appStore.ts` (Line 38)
- `Partial<T>` for optional properties
- `Omit<T, K>` for excluding properties (Line 38)
- `Record<K, V>` for key-value pairs

### 13. **Module Declaration**
**File:** `src/vite-env.d.ts`
- Ambient type declarations
- Module augmentation

### 14. **TSConfig Configuration**
**File:** `tsconfig.json` (Lines: 1-38)
- Strict mode enabled (Line 20)
- Path mapping with aliases (Lines 23-32)
- Target ES2020 (Line 3)
- JSX configuration (Line 18)

### 15. **Import Type Syntax**
**File:** `src/services/authService.ts` (Line 8)
- Importing types from modules
- Type-only imports

### 16. **Tuple Types**
**File:** `src/utils/emissions.ts` (Lines: 67-76)
- Fixed-length arrays with specific types
- Array destructuring with types

### 17. **Type Assertions**
**File:** `src/services/firestoreService.ts` (Line 57)
- `as EmissionRecord[]`
- Type casting

### 18. **Promise Types**
**File:** `src/services/authService.ts` (Line 23)
- `Promise<User>` return types
- Async function typing

### 19. **Any Type (with caution)**
**File:** `src/store/appStore.ts` (Lines: 103, 119)
- Using `any` for catch blocks
- Error typing

### 20. **Strict Null Checks**
**File:** `tsconfig.json` (Line 20)
- Enabled in strict mode
- Null/undefined handling

---

## React.js

### 1. **Functional Components**
**File:** `src/App.tsx` (Lines: 18-65)
- React.FC type
- Modern component syntax

```typescript
export const App: React.FC = () => {
  const { theme, setUser, loadRecords } = useAppStore();

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};
```

### 2. **JSX/TSX Syntax**
**File:** `src/App.tsx` (Throughout)
- HTML-like syntax in JavaScript/TypeScript
- Component composition

### 3. **Props**
**File:** `src/components/KPICard.tsx` (Lines: 3-11, 13-20)
- Props interface definition
- Props destructuring
- Optional props with defaults

```typescript
interface KPICardProps {
  title: string;
  value: number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: number;
  trendDirection?: "up" | "down";
  className?: string;
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = (props) => {
  const {
    title,
    value,
    unit = "kg CO₂e",
    icon,
    trend,
    trendDirection,
    className = "",
    onClick,
  } = props;

  return (
    <div onClick={onClick} className={className}>
      <p>{title}</p>
      <p>{value} {unit}</p>
      {icon && <div>{icon}</div>}
    </div>
  );
};

// Usage
<KPICard
  title="Total Emissions"
  value={1234.56}
  unit="kg CO₂e"
  icon="📊"
  trend={5.2}
  trendDirection="down"
  onClick={() => console.log('Clicked')}
/>
```

### 4. **useState Hook**
**File:** `src/pages/Dashboard.tsx` (Lines: 11-12)
- State management in functional components
- `const [state, setState] = React.useState(initialValue)`

```typescript
const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth() + 1);
const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());

// Usage in component
<select
  value={selectedMonth}
  onChange={(e) => setSelectedMonth(Number(e.target.value))}
>
  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
    <option key={month} value={month}>
      {new Date(2024, month - 1).toLocaleString("en-US", { month: "long" })}
    </option>
  ))}
</select>
```

### 5. **useEffect Hook**
**File:** `src/App.tsx` (Lines: 22-34, 37-43)
- Side effects in components
- Dependency arrays
- Cleanup functions (Line 32)

```typescript
// Subscribe to authentication state changes
React.useEffect(() => {
  const unsubscribe = subscribeToAuthChanges((user) => {
    setUser(user);
    if (user) {
      loadRecords();
    }
  });

  // Cleanup function
  return () => unsubscribe();
}, [setUser, loadRecords]);

// Handle theme changes
React.useEffect(() => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [theme]);
```

### 6. **Custom Hooks**
**File:** `src/store/appStore.ts` (Lines: 33-157)
- `useAppStore` Zustand hook
- State management hook

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppStore {
  user: User | null;
  setUser: (user: User | null) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  records: EmissionRecord[];
  addRecord: (record: Omit<EmissionRecord, "id" | "timestamp">) => Promise<void>;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      theme: "light",
      setTheme: (theme) => set({ theme }),
      records: [],
      addRecord: async (record) => {
        // Implementation
      },
    }),
    { name: "carbon-tracker-store" }
  )
);

// Usage in components
const { user, setUser, theme, setTheme } = useAppStore();
```

### 7. **Event Handling**
**File:** `src/pages/Login.tsx` (Lines: 25-49, 51-56)
- `onClick`, `onChange`, `onSubmit` handlers
- Event type definitions

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    if (isSignUp) {
      const user = await signUp(formData.email, formData.password, formData.displayName);
      setUser(user);
      navigate("/");
    } else {
      const user = await signIn(formData.email, formData.password);
      setUser(user);
      navigate("/");
    }
  } catch (err: any) {
    setError(err.message || "An error occurred");
  } finally {
    setLoading(false);
  }
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

// In JSX
<form onSubmit={handleSubmit}>
  <input onChange={handleChange} />
  <button onClick={() => setIsSignUp(!isSignUp)}>Toggle</button>
</form>
```

### 8. **Conditional Rendering**
**File:** `src/components/Navbar.tsx` (Lines: 38, 99-138)
- Using `&&` operator
- Ternary operators for conditional UI

```typescript
// Using && operator
{user && !isLoginPage && (
  <div className="flex items-center gap-2">
    <span>{user.displayName || user.email}</span>
    <button onClick={handleLogout}>Logout</button>
  </div>
)}

// Ternary operator
{isSignUp ? (
  <h2>Create Account</h2>
) : (
  <h2>Welcome Back</h2>
)}

// Complex conditional with multiple conditions
<div className={`
  ${isActive(link.href)
    ? "bg-primary-100 text-primary-700"
    : "text-neutral-600 hover:bg-neutral-100"
  }
`}>
  {link.label}
</div>

// Conditional component rendering
{mobileMenuOpen && !isLoginPage && (
  <div className="mobile-menu">
    {/* Mobile menu content */}
  </div>
)}
```

### 9. **List Rendering with .map()**
**File:** `src/components/Navbar.tsx` (Lines: 48-62)
- Rendering arrays of components
- Key props for list items

```typescript
const navLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Data Entry", href: "/data-entry" },
  { label: "Calculator", href: "/calculator" },
  { label: "Reports", href: "/reports" },
];

// Rendering the list
{navLinks.map((link) => (
  <Link
    key={link.href}
    to={link.href}
    className={`
      px-2.5 py-2 rounded-lg transition-all
      ${isActive(link.href)
        ? "bg-primary-100 text-primary-700"
        : "text-neutral-600 hover:bg-neutral-100"
      }
    `}
  >
    {link.label}
  </Link>
))}

// Dynamic list generation
{Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
  <option key={month} value={month}>
    {new Date(2024, month - 1).toLocaleString("en-US", { month: "long" })}
  </option>
))}
```

### 10. **Component Composition**
**File:** `src/App.tsx` (Lines: 46-64)
- Nesting components
- Children props

### 11. **React Router DOM**
**File:** `src/App.tsx` (Lines: 3, 45-61)
- `HashRouter`, `Routes`, `Route` components
- `Navigate` for redirects
- `useLocation`, `useNavigate` hooks

```typescript
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

// In App component
<Router>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/data-entry" element={<ProtectedRoute><DataEntry /></ProtectedRoute>} />
    <Route path="/calculator" element={<ProtectedRoute><CarbonCalculator /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</Router>

// Using navigation hooks
const navigate = useNavigate();
const location = useLocation();

const handleLogout = async () => {
  await logOut();
  navigate("/login");
};

const isActive = (href: string) => location.pathname === href;
```

### 12. **Protected Routes**
**File:** `src/components/ProtectedRoute.tsx` (Lines: 1-17)
- Authentication-based routing
- Route guards

```typescript
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppStore } from "@/store/appStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAppStore();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### 13. **Form Handling**
**File:** `src/pages/Login.tsx` (Lines: 25-49, 75-152)
- Controlled components
- Form submission
- Input state management

```typescript
const [formData, setFormData] = React.useState({
  email: "",
  password: "",
  displayName: "",
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // Form validation
  if (formData.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  // Submit form
  await signUp(formData.email, formData.password, formData.displayName);
};

// JSX
<form onSubmit={handleSubmit}>
  <input
    name="email"
    type="email"
    value={formData.email}
    onChange={handleChange}
    required
  />
  <button type="submit">Submit</button>
</form>
```

### 14. **Dynamic Styling with Template Literals**
**File:** `src/components/KPICard.tsx` (Lines: 27-33)
- Conditional CSS classes
- Template literal className

```typescript
const isPositiveTrend = trendDirection === "down" && trend !== undefined && trend > 0;

return (
  <div
    className={`
      bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft
      hover:shadow-lg hover:scale-102 transition-all duration-200
      border border-transparent hover:border-primary-300
      cursor-pointer group
      ${className}
    `}
  >
    {/* Content */}
    <div className={`flex items-center gap-1 text-sm font-medium ${
      isPositiveTrend ? "text-primary-600 dark:text-primary-400" : "text-error"
    }`}>
      <span>{isPositiveTrend ? "↓" : "↑"}</span>
      <span>{Math.abs(trend).toFixed(1)}%</span>
    </div>
  </div>
);

// Dynamic class helper
const buttonClass = `
  px-4 py-2 rounded-lg
  ${isActive ? 'bg-primary-600' : 'bg-neutral-200'}
  ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-700'}
`;
```

### 15. **Props Children**
**File:** `src/components/ProtectedRoute.tsx` (Lines: 6, 14)
- `children` prop for component wrapping
- Render props pattern

### 16. **React Context (via Zustand)**
**File:** `src/store/appStore.ts` (Lines: 33-157)
- Global state management
- State sharing across components

### 17. **Error Boundaries (Manual)**
**File:** `src/store/appStore.ts` (Lines: 104-109)
- Error state management
- Try-catch in async operations

### 18. **Lazy Loading Preparation**
**File:** `vite.config.ts` (Lines: 1-16)
- Code splitting setup with Vite
- Dynamic imports support

### 19. **Component Lifecycle Simulation**
**File:** `src/App.tsx` (Lines: 22-43)
- Mount: useEffect with empty deps
- Update: useEffect with dependencies
- Unmount: cleanup functions

### 20. **Recharts Integration**
**File:** `src/pages/Dashboard.tsx` (Lines: 7, 96-138)
- Data visualization components
- `LineChart`, `BarChart`, `ResponsiveContainer`
- Chart configuration and theming

```typescript
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const monthlyTrend = [
  { month: "Jan", total: 1200, scope1: 400, scope2: 500, scope3: 300 },
  { month: "Feb", total: 1500, scope1: 450, scope2: 600, scope3: 450 },
];

// Line Chart
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={monthlyTrend}>
    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
    <XAxis dataKey="month" stroke={axisColor} />
    <YAxis stroke={axisColor} />
    <Tooltip
      contentStyle={{
        backgroundColor: tooltipBg,
        border: `1px solid ${tooltipBorder}`,
        borderRadius: "8px",
      }}
    />
    <Legend />
    <Line
      type="monotone"
      dataKey="total"
      stroke="#00a86b"
      strokeWidth={2}
      dot={{ fill: "#00a86b", r: 4 }}
    />
  </LineChart>
</ResponsiveContainer>

// Bar Chart
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={categoryChartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="value" fill="#00a86b" radius={[8, 8, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
```

### 21. **Memoization Opportunities**
**File:** `src/pages/Dashboard.tsx` (Lines: 23-28)
- Computed values (could use useMemo)
- Performance optimization patterns

### 22. **React StrictMode**
**File:** `src/main.tsx` (Lines: 5-7)
- Development mode checks
- Component debugging

### 23. **Portal Pattern (Potential)**
**File:** `index.html` (Line 14)
- Root div for React rendering
- Portal mounting point

### 24. **Higher-Order Components Pattern**
**File:** `src/components/ProtectedRoute.tsx` (Lines: 1-17)
- Component wrapping for added functionality
- HOC-like behavior

### 25. **Callback Props**
**File:** `src/components/FormInput.tsx` (Lines: 6, 42)
- Functions passed as props
- Event handlers

### 26. **Default Props**
**File:** `src/components/FormInput.tsx` (Lines: 19-31)
- Default values in destructuring
- Optional prop handling

### 27. **TypeScript with React**
**File:** `src/components/KPICard.tsx` (Lines: 1-3, 13)
- React.FC type
- Props typing with interfaces

### 28. **Environment Variables**
**File:** `src/config/firebase.ts` (Lines: 5-10)
- `import.meta.env` in Vite
- Configuration management

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// .env file format:
// VITE_FIREBASE_API_KEY=your-api-key
// VITE_FIREBASE_AUTH_DOMAIN=your-domain.firebaseapp.com
// VITE_FIREBASE_PROJECT_ID=your-project-id
```

### 29. **React Developer Tools Ready**
**File:** `src/main.tsx` (Lines: 1-9)
- Component tree inspection
- State debugging support

### 30. **Responsive Design in React**
**File:** `src/components/Navbar.tsx` (Lines: 99-138)
- Mobile menu state
- Responsive component behavior

---

## Additional Technologies

### 1. **Vite Build Tool**
**File:** `vite.config.ts` (Lines: 1-16)
- Fast development server
- Hot Module Replacement (HMR)
- React plugin configuration (Line 6)
- Path aliases (Lines 8-12)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/carbon-tracker/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})

// This enables:
// - Fast HMR for instant updates
// - Path aliases like: import Component from '@/components/Component'
// - Optimized production builds
```

### 2. **Firebase Authentication**
**File:** `src/services/authService.ts` (Lines: 1-9, 23-75)
- User authentication with email/password
- `createUserWithEmailAndPassword` (Line 23)
- `signInWithEmailAndPassword` (Line 44)
- `onAuthStateChanged` listener (Line 68)

```typescript
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

// Sign up
export const signUp = async (email: string, password: string, displayName?: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create account');
  }
};

// Sign in
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign in');
  }
};

// Auth state listener
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
```

### 3. **Firestore Database**
**File:** `src/services/firestoreService.ts` (Lines: 1-113)
- NoSQL database operations
- `addDoc`, `updateDoc`, `deleteDoc` (Lines 13, 30, 41)
- `getDocs` with queries (Lines 53-78)
- Collection and document references

```typescript
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

// Add document
export const addEmissionRecord = async (userId: string, record: any): Promise<string> => {
  try {
    const recordsRef = collection(db, 'users', userId, 'records');
    const docRef = await addDoc(recordsRef, {
      ...record,
      timestamp: Timestamp.now(),
    });
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add record');
  }
};

// Update document
export const updateEmissionRecord = async (userId: string, recordId: string, updates: any): Promise<void> => {
  const recordRef = doc(db, 'users', userId, 'records', recordId);
  await updateDoc(recordRef, updates);
};

// Delete document
export const deleteEmissionRecord = async (userId: string, recordId: string): Promise<void> => {
  const recordRef = doc(db, 'users', userId, 'records', recordId);
  await deleteDoc(recordRef);
};

// Query documents
export const getUserEmissionRecords = async (userId: string): Promise<any[]> => {
  const recordsRef = collection(db, 'users', userId, 'records');
  const q = query(recordsRef, orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
```

### 4. **Zustand State Management**
**File:** `src/store/appStore.ts` (Lines: 1-2, 33-157)
- Lightweight state management
- Persist middleware (Line 2, 159-166)
- Store creation with `create()`

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppStore {
  user: User | null;
  setUser: (user: User | null) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  records: EmissionRecord[];
  addRecord: (record: any) => Promise<void>;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      theme: "light",
      records: [],
      
      // Actions
      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
      
      addRecord: async (record) => {
        const { user } = get();
        if (!user) return;
        
        const recordId = await addEmissionRecord(user.uid, record);
        set((state) => ({
          records: [{ ...record, id: recordId }, ...state.records],
        }));
      },
    }),
    {
      name: "carbon-tracker-store",
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
);

// Usage in components
const { user, setUser, theme, setTheme, addRecord } = useAppStore();
```

### 5. **Axios HTTP Client**
**File:** `package.json` (Line 13)
- HTTP requests
- API integration

### 6. **ESLint**
**File:** `package.json` (Lines: 22-24)
- Code linting
- TypeScript ESLint integration

### 7. **Path Aliasing**
**File:** `tsconfig.json` (Lines 23-32)
- Import path shortcuts
- `@/` prefix for src directory

### 8. **NPM Scripts**
**File:** `package.json` (Lines: 6-13)
- `dev`, `build`, `preview` commands
- Deployment scripts

### 9. **Git & Version Control**
**File:** `package.json` (Line 13)
- GitHub Pages deployment
- Version control ready

### 10. **Browser APIs**
**File:** `src/utils/helpers.ts` (Lines: 97-106)
- `localStorage` API
- `Date` API
- `Math.random()` for ID generation

---

## Summary Statistics

### HTML Topics: 4
### CSS & Styling Topics: 15
### JavaScript Topics: 15
### TypeScript Topics: 20
### React.js Topics: 30
### Additional Technologies: 10

**Total Topics Covered: 94**

---

## Key Learning Outcomes

This project comprehensively covers:

1. **Modern Frontend Development Stack**
   - React 18 with TypeScript
   - Vite for fast development
   - Tailwind CSS for styling

2. **State Management**
   - Zustand for global state
   - React hooks for local state
   - Persistent storage

3. **Backend Integration**
   - Firebase Authentication
   - Firestore database
   - Real-time data sync

4. **Advanced TypeScript**
   - Strong typing throughout
   - Generics and utility types
   - Interface-driven development

5. **Modern JavaScript**
   - ES6+ features
   - Async/await patterns
   - Functional programming concepts

6. **Professional Development Practices**
   - Component-based architecture
   - Separation of concerns
   - Reusable utility functions
   - Type-safe APIs

7. **UI/UX Implementation**
   - Responsive design
   - Dark mode support
   - Smooth animations
   - Accessible components

8. **Data Visualization**
   - Recharts integration
   - Interactive charts
   - Real-time data display

---

*Generated for Smart Carbon Footprint & Sustainability Tracker Project*
*Last Updated: December 2025*

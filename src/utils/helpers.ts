/**
 * Format numbers with thousand separators
 */
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

/**
 * Format large numbers with abbreviations (K, M, B)
 */
export const formatLargeNumber = (value: number, decimals: number = 1): string => {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(decimals) + "B";
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(decimals) + "M";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(decimals) + "K";
  }
  return value.toFixed(decimals);
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Convert kg CO₂e to tons CO₂e
 */
export const kgToTons = (kg: number): number => kg / 1000;

/**
 * Convert tons CO₂e to kg CO₂e
 */
export const tonsToKg = (tons: number): number => tons * 1000;

/**
 * Get month name from month number
 */
export const getMonthName = (monthNumber: number | string): string => {
  const date = new Date(2024, Number(monthNumber) - 1);
  return date.toLocaleString("en-US", { month: "long" });
};

/**
 * Get current month-year as string
 */
export const getCurrentMonthYear = (): { month: number; year: number } => {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };
};

/**
 * Calculate average of array
 */
export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
};

/**
 * Sum array values
 */
export const sumArray = (values: number[]): number => {
  return values.reduce((sum, val) => sum + val, 0);
};

/**
 * Generate unique ID
 */
export const generateId = (prefix: string = ""): string => {
  return `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date | string, format: "short" | "long" = "short"): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (format === "short") {
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Get color based on emission value and threshold
 */
export const getEmissionColor = (
  value: number,
  low: number,
  medium: number,
  high: number
): string => {
  if (value <= low) return "green";
  if (value <= medium) return "yellow";
  if (value <= high) return "orange";
  return "red";
};

/**
 * Validate email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate positive number
 */
export const validatePositiveNumber = (value: any): boolean => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

/**
 * Group array of objects by key
 */
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

/**
 * Sort array of objects by key
 */
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

/**
 * Deep clone object
 */
export const deepClone = <T,>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

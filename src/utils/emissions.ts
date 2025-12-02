import { EmissionRecord, ScopeEmissions } from "@/types";

/**
 * Calculate total emissions from records
 */
export const calculateTotalEmissions = (records: EmissionRecord[]): number => {
  return records.reduce((sum, record) => sum + (record.co2e || 0), 0);
};

/**
 * Calculate scope-wise emissions breakdown
 */
export const calculateScopeEmissions = (records: EmissionRecord[]): ScopeEmissions => {
  const scopes: ScopeEmissions = {
    scope1: 0, // Direct emissions (fuel, heating)
    scope2: 0, // Indirect energy (electricity)
    scope3: 0, // Indirect other (travel, waste)
  };

  records.forEach((record) => {
    const co2e = record.co2e || 0;
    switch (record.category) {
      case "fuel":
        scopes.scope1 += co2e;
        break;
      case "electricity":
        scopes.scope2 += co2e;
        break;
      case "travel":
      case "waste":
      case "water":
        scopes.scope3 += co2e;
        break;
    }
  });

  return scopes;
};

/**
 * Calculate emissions by category for pie/bar charts
 */
export const calculateEmissionsByCategory = (
  records: EmissionRecord[]
): Record<string, number> => {
  const byCategory: Record<string, number> = {
    electricity: 0,
    fuel: 0,
    travel: 0,
    waste: 0,
    water: 0,
  };

  records.forEach((record) => {
    byCategory[record.category] = (byCategory[record.category] || 0) + (record.co2e || 0);
  });

  return byCategory;
};

/**
 * Calculate monthly emissions trend
 */
export const calculateMonthlyTrend = (
  records: EmissionRecord[]
): Array<{ month: string; total: number; scope1: number; scope2: number; scope3: number }> => {
  const monthlyData: Record<string, { total: number; scope1: number; scope2: number; scope3: number }> = {};

  records.forEach((record) => {
    const monthKey = `${record.year}-${String(record.month).padStart(2, "0")}`;
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { total: 0, scope1: 0, scope2: 0, scope3: 0 };
    }

    const co2e = record.co2e || 0;
    monthlyData[monthKey].total += co2e;

    // Categorize by scope
    if (record.category === "fuel") {
      monthlyData[monthKey].scope1 += co2e;
    } else if (record.category === "electricity") {
      monthlyData[monthKey].scope2 += co2e;
    } else {
      monthlyData[monthKey].scope3 += co2e;
    }
  });

  return Object.entries(monthlyData)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([monthKey, data]) => ({
      month: new Date(`${monthKey}-01`).toLocaleString("en-US", {
        month: "short",
        year: "2-digit",
      }),
      ...data,
    }));
};

/**
 * Get emissions statistics
 */
export const getEmissionsStatistics = (records: EmissionRecord[]) => {
  if (records.length === 0) {
    return {
      total: 0,
      average: 0,
      minimum: 0,
      maximum: 0,
      trend: 0,
    };
  }

  const emissions = records.map((r) => r.co2e || 0);
  const total = emissions.reduce((sum, val) => sum + val, 0);
  const average = total / emissions.length;
  const minimum = Math.min(...emissions);
  const maximum = Math.max(...emissions);

  // Calculate trend (last month vs previous month)
  let trend = 0;
  if (records.length >= 2) {
    const recentRecords = records.slice(-2);
    const recent = recentRecords[1].co2e || 0;
    const previous = recentRecords[0].co2e || 0;
    trend = ((recent - previous) / previous) * 100 || 0;
  }

  return { total, average, minimum, maximum, trend };
};

/**
 * Get year-over-year comparison
 */
export const getYearOverYearComparison = (
  records: EmissionRecord[],
  currentYear: number
): { currentYear: number; previousYear: number; percentageChange: number } => {
  const currentYearEmissions = records
    .filter((r) => r.year === currentYear)
    .reduce((sum, r) => sum + (r.co2e || 0), 0);

  const previousYearEmissions = records
    .filter((r) => r.year === currentYear - 1)
    .reduce((sum, r) => sum + (r.co2e || 0), 0);

  const percentageChange =
    previousYearEmissions === 0
      ? 0
      : ((currentYearEmissions - previousYearEmissions) / previousYearEmissions) * 100;

  return {
    currentYear: currentYearEmissions,
    previousYear: previousYearEmissions,
    percentageChange,
  };
};

/**
 * Filter records by date range
 */
export const filterRecordsByDateRange = (
  records: EmissionRecord[],
  startDate: Date,
  endDate: Date
): EmissionRecord[] => {
  return records.filter((record) => {
    const recordDate = new Date(`${record.year}-${String(record.month).padStart(2, "0")}-01`);
    return recordDate >= startDate && recordDate <= endDate;
  });
};

/**
 * Get top emission categories
 */
export const getTopEmissionCategories = (
  records: EmissionRecord[],
  limit: number = 5
): Array<{ category: string; emissions: number }> => {
  const byCategory = calculateEmissionsByCategory(records);
  return Object.entries(byCategory)
    .map(([category, emissions]) => ({ category, emissions }))
    .sort((a, b) => b.emissions - a.emissions)
    .slice(0, limit);
};

/**
 * Calculate emission reduction potential
 */
export const calculateReductionPotential = (
  current: number,
  target: number
): { reduction: number; percentage: number } => {
  const reduction = current - target;
  const percentage = (reduction / current) * 100;
  return {
    reduction: Math.max(0, reduction),
    percentage: Math.max(0, percentage),
  };
};

// Emission Record
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

// Scope Emissions
export interface ScopeEmissions {
  scope1: number; // Direct emissions (Fuel, heating)
  scope2: number; // Indirect energy (Electricity)
  scope3: number; // Indirect other (Travel, waste)
}

// Company Profile
export interface CompanyProfile {
  id: string;
  name: string;
  industry: string;
  region: string;
  employees?: number;
  gridCarbonIntensity?: number;
  settings: CompanySettings;
}

// Company Settings
export interface CompanySettings {
  theme: "light" | "dark";
  emailAlerts: boolean;
  currency: string;
  measurementUnit: "metric_tons" | "kilograms";
  targetEmissions?: number;
}

// Recommendation
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: number; // 1-5 stars
  cost: "low" | "medium" | "high";
  category: string;
  estimatedSavings?: number;
  timeToImplement?: string;
  details?: string;
}

// Benchmark Data
export interface BenchmarkData {
  industry: string;
  region: string;
  year: number;
  avgEmissions: number;
  unit: string;
  dataSource: string;
}

// Chart Data
export interface ChartDataPoint {
  month: string;
  value: number;
  scope1?: number;
  scope2?: number;
  scope3?: number;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Carbon Calculation Result
export interface CarbonCalculationResult {
  type: string;
  value: number;
  unit: string;
  co2e: number;
  co2eUnit: string;
  factors?: Record<string, any>;
}

// Electricity Grid Data
export interface GridCarbonIntensity {
  region: string;
  co2Intensity: number;
  unit: string;
  timestamp: string;
  trend?: "increasing" | "decreasing" | "stable";
}

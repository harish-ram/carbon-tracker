import React from "react";
import { useAppStore } from "@/store/appStore";
import KPICard from "@/components/KPICard";
import {
  calculateTotalEmissions,
  calculateScopeEmissions,
  calculateEmissionsByCategory,
  calculateMonthlyTrend,
  getEmissionsStatistics,
} from "@/utils/emissions";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const Dashboard: React.FC = () => {
  const { records } = useAppStore();
  const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());

  // Detect dark mode for chart styling
  const isDark = document.documentElement.classList.contains("dark");
  const axisColor = isDark ? "#9ca3af" : "rgba(0,0,0,0.5)";
  const labelColor = isDark ? "#e5e7eb" : "#374151";
  const gridColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tooltipBg = isDark ? "#1f2937" : "#fff";
  const tooltipBorder = isDark ? "#374151" : "#e5e7eb";
  const tooltipTextColor = isDark ? "#e5e7eb" : "#111827";

  // Filter records by selected month and year
  const filteredRecords = records.filter(
    (record) => parseInt(record.month) === selectedMonth && record.year === selectedYear
  );

  // Calculate metrics
  const totalEmissions = calculateTotalEmissions(filteredRecords);
  const scopes = calculateScopeEmissions(filteredRecords);
  const categories = calculateEmissionsByCategory(filteredRecords);
  const monthlyTrend = calculateMonthlyTrend(records); // Keep full trend for chart
  const stats = getEmissionsStatistics(filteredRecords);

  // Prepare chart data
  const categoryChartData = Object.entries(categories).map(([category, value]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: parseFloat(value.toFixed(2)),
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-neutral-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            Monitor your organization's carbon emissions
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="input-base px-4 py-2.5 text-base rounded-lg min-h-[44px] flex-1 sm:flex-none sm:w-40"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {new Date(2024, month - 1).toLocaleString("en-US", { month: "long" })}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="input-base px-4 py-2.5 text-base rounded-lg min-h-[44px] flex-1 sm:flex-none sm:w-32"
          >
            {[2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Emissions"
          value={totalEmissions}
          unit="kg CO₂e"
          icon="📊"
          trend={stats.trend}
          trendDirection={stats.trend > 0 ? "up" : "down"}
        />
        <KPICard
          title="Scope 1"
          value={scopes.scope1}
          unit="kg CO₂e"
          icon="🔥"
          trend={5.2}
          trendDirection="up"
        />
        <KPICard
          title="Scope 2"
          value={scopes.scope2}
          unit="kg CO₂e"
          icon="⚡"
          trend={3.1}
          trendDirection="down"
        />
        <KPICard
          title="Scope 3"
          value={scopes.scope3}
          unit="kg CO₂e"
          icon="✈️"
          trend={2.8}
          trendDirection="down"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Emissions Trend Chart */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-soft">
          <h2 className="text-base sm:text-lg font-heading font-bold text-neutral-900 dark:text-white mb-4">
            Emissions Trend (Last 12 Months)
          </h2>
          {monthlyTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="month"
                  stroke={axisColor}
                  style={{ fontSize: "12px", fill: labelColor }}
                />
                <YAxis
                  stroke={axisColor}
                  style={{ fontSize: "12px", fill: labelColor }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    border: `1px solid ${tooltipBorder}`,
                    borderRadius: "8px",
                    color: tooltipTextColor,
                  }}
                  labelStyle={{ color: tooltipTextColor }}
                  itemStyle={{ color: tooltipTextColor }}
                />
                <Legend wrapperStyle={{ color: labelColor }} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#00a86b"
                  strokeWidth={2}
                  dot={{ fill: "#00a86b", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-80 flex items-center justify-center text-neutral-500">
              No data available
            </div>
          )}
        </div>

        {/* Emissions by Category Chart */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-soft">
          <h2 className="text-base sm:text-lg font-heading font-bold text-neutral-900 dark:text-white mb-4">
            Emissions by Category
          </h2>
          {categoryChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="name"
                  stroke={axisColor}
                  style={{ fontSize: "12px", fill: labelColor }}
                />
                <YAxis
                  stroke={axisColor}
                  style={{ fontSize: "12px", fill: labelColor }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    border: `1px solid ${tooltipBorder}`,
                    borderRadius: "8px",
                    color: tooltipTextColor,
                  }}
                  labelStyle={{ color: tooltipTextColor }}
                  itemStyle={{ color: tooltipTextColor }}
                />
                <Bar
                  dataKey="value"
                  fill="#00a86b"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-80 flex items-center justify-center text-neutral-500">
              No data available
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-soft">
        <h2 className="text-base sm:text-lg font-heading font-bold text-neutral-900 dark:text-white mb-4 sm:mb-6">
          Statistics
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">
              Average
            </p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-2">
              {stats.average.toFixed(2)}
            </p>
            <p className="text-xs text-neutral-500 mt-1">kg CO₂e</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">
              Minimum
            </p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-2">
              {stats.minimum.toFixed(2)}
            </p>
            <p className="text-xs text-neutral-500 mt-1">kg CO₂e</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">
              Maximum
            </p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-2">
              {stats.maximum.toFixed(2)}
            </p>
            <p className="text-xs text-neutral-500 mt-1">kg CO₂e</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">
              Total Records
            </p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-2">
              {records.length}
            </p>
            <p className="text-xs text-neutral-500 mt-1">entries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { useAppStore } from "@/store/appStore";
import { calculateTotalEmissions, calculateScopeEmissions, calculateMonthlyTrend } from "@/utils/emissions";
import { formatNumber } from "@/utils/helpers";

export const Reports: React.FC = () => {
  const { records } = useAppStore();
  const [startMonth, setStartMonth] = React.useState(1);
  const [startYear, setStartYear] = React.useState(2024);
  const [endMonth, setEndMonth] = React.useState(12);
  const [endYear, setEndYear] = React.useState(2024);

  const filteredRecords = records.filter((r) => {
    const recordDate = new Date(Number(r.year), Number(r.month) - 1);
    const startDate = new Date(startYear, startMonth - 1);
    const endDate = new Date(endYear, endMonth - 1);
    return recordDate >= startDate && recordDate <= endDate;
  });

  const totalEmissions = calculateTotalEmissions(filteredRecords);
  const scopes = calculateScopeEmissions(filteredRecords);
  const monthlyData = calculateMonthlyTrend(filteredRecords);

  const handleDownloadCSV = () => {
    const csv = [
      ["Month", "Total", "Scope 1", "Scope 2", "Scope 3"],
      ...monthlyData.map((d) => [d.month, d.total, d.scope1, d.scope2, d.scope3]),
    ];

    const csvContent = csv.map((row) => row.join(",")).join("\n");
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent));
    element.setAttribute("download", `emissions-report-${startYear}-${endYear}.csv`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPDF = () => {
    alert("PDF download would be implemented with a library like jsPDF");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-heading font-bold text-neutral-900 dark:text-white">
          Reports
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Generate and export emissions reports
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
        <h2 className="text-lg font-heading font-bold mb-4">Report Filters</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Month</label>
            <select
              value={startMonth}
              onChange={(e) => setStartMonth(Number(e.target.value))}
              className="input-base"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {new Date(2024, m - 1).toLocaleString("en-US", { month: "long" })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Start Year</label>
            <select
              value={startYear}
              onChange={(e) => setStartYear(Number(e.target.value))}
              className="input-base"
            >
              {[2023, 2024, 2025].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Month</label>
            <select
              value={endMonth}
              onChange={(e) => setEndMonth(Number(e.target.value))}
              className="input-base"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {new Date(2024, m - 1).toLocaleString("en-US", { month: "long" })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Year</label>
            <select
              value={endYear}
              onChange={(e) => setEndYear(Number(e.target.value))}
              className="input-base"
            >
              {[2023, 2024, 2025].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-primary-50 dark:bg-primary-900 rounded-xl p-6 text-center">
          <p className="text-sm text-primary-700 dark:text-primary-300 uppercase">Total Emissions</p>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-2">
            {formatNumber(totalEmissions, 2)}
          </p>
          <p className="text-xs text-primary-700 dark:text-primary-300 mt-1">kg CO₂e</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6 text-center">
          <p className="text-sm text-blue-700 dark:text-blue-300 uppercase">Scope 1 & 2</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            {formatNumber(scopes.scope1 + scopes.scope2, 2)}
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">kg CO₂e</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900 rounded-xl p-6 text-center">
          <p className="text-sm text-green-700 dark:text-green-300 uppercase">Scope 3</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
            {formatNumber(scopes.scope3, 2)}
          </p>
          <p className="text-xs text-green-700 dark:text-green-300 mt-1">kg CO₂e</p>
        </div>
      </div>

      {/* Monthly Data Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-heading font-bold">Monthly Breakdown</h2>
          <div className="flex gap-2">
            <button onClick={handleDownloadCSV} className="btn-sm btn-primary">
              Download CSV
            </button>
            <button onClick={handleDownloadPDF} className="btn-sm btn-secondary">
              Download PDF
            </button>
          </div>
        </div>

        {monthlyData.length === 0 ? (
          <div className="text-center py-8 text-neutral-500">
            No data for the selected period
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-200 dark:border-neutral-700">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Month</th>
                <th className="text-right py-3 px-4 font-medium">Scope 1</th>
                <th className="text-right py-3 px-4 font-medium">Scope 2</th>
                <th className="text-right py-3 px-4 font-medium">Scope 3</th>
                <th className="text-right py-3 px-4 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((row, idx) => (
                <tr key={idx} className="border-b border-neutral-100 dark:border-neutral-700">
                  <td className="py-3 px-4">{row.month}</td>
                  <td className="text-right py-3 px-4">{formatNumber(row.scope1, 2)}</td>
                  <td className="text-right py-3 px-4">{formatNumber(row.scope2, 2)}</td>
                  <td className="text-right py-3 px-4">{formatNumber(row.scope3, 2)}</td>
                  <td className="text-right py-3 px-4 font-bold text-primary-600 dark:text-primary-400">
                    {formatNumber(row.total, 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reports;

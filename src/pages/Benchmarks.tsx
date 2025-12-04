import React from "react";
import benchmarkAPI from "@/services/benchmarkAPI";
import { formatNumber } from "@/utils/helpers";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Pagination from "@/components/Pagination";

export const Benchmarks: React.FC = () => {
  const [benchmarks, setBenchmarks] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5; // Mobile-friendly page size

  React.useEffect(() => {
    const fetchBenchmarks = async () => {
      const result = await benchmarkAPI.getRegionalBenchmarks();
      if (result.success) {
        setBenchmarks(result.data || []);
      }
      setLoading(false);
    };
    fetchBenchmarks();
  }, []);

  const totalPages = Math.ceil(benchmarks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBenchmarks = benchmarks.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of table on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const chartData = benchmarks.slice(0, 4).map((b) => ({
    name: b.industry,
    emissions: b.avgEmissions,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-heading font-bold text-neutral-900 dark:text-white">
          Benchmarks
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Compare your emissions with industry standards
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <>
          {/* Chart */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
            <h2 className="text-lg font-heading font-bold mb-4">Emissions Comparison</h2>
            {chartData.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="emissions" fill="#00a86b" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Benchmarks Table */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft overflow-x-auto">
            <h2 className="text-lg font-heading font-bold mb-4">Regional Benchmarks</h2>
            <table className="w-full text-sm">
              <thead className="border-b border-neutral-200 dark:border-neutral-700">
                <tr>
                  <th className="text-left py-2 px-4 font-medium">Industry</th>
                  <th className="text-left py-2 px-4 font-medium">Region</th>
                  <th className="text-left py-2 px-4 font-medium">Avg Emissions</th>
                  <th className="text-left py-2 px-4 font-medium">Unit</th>
                  <th className="text-left py-2 px-4 font-medium">Source</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBenchmarks.map((b, idx) => (
                  <tr key={idx} className="border-b border-neutral-100 dark:border-neutral-700">
                    <td className="py-3 px-4">{b.industry}</td>
                    <td className="py-3 px-4">{b.region}</td>
                    <td className="py-3 px-4 font-medium">{formatNumber(b.avgEmissions, 2)}</td>
                    <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400">{b.unit}</td>
                    <td className="py-3 px-4 text-primary-600 dark:text-primary-400">{b.dataSource}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Benchmarks;

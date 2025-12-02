import React from "react";

const mockRecommendations = [
  {
    id: "1",
    title: "Shift Peak Load Operations",
    description: "Your grid carbon intensity is high between 2-6 PM",
    impact: 4,
    cost: "low",
    category: "Energy",
    estimatedSavings: 15,
    details: "Rescheduling energy-intensive operations to 10 AM - 1 PM can reduce emissions by 12-15%.",
  },
  {
    id: "2",
    title: "Upgrade to LED Lighting",
    description: "Replace incandescent and fluorescent with LED bulbs",
    impact: 4,
    cost: "medium",
    category: "Efficiency",
    estimatedSavings: 20,
    details: "LED bulbs consume 75% less energy and last 25x longer than incandescent bulbs.",
  },
  {
    id: "3",
    title: "Implement Renewable Energy",
    description: "Install solar panels on facility rooftops",
    impact: 5,
    cost: "high",
    category: "Renewable",
    estimatedSavings: 40,
    details: "Solar panels can offset 30-50% of your facility's electricity consumption.",
  },
  {
    id: "4",
    title: "Optimize Transportation",
    description: "Encourage carpooling and public transit for employee commutes",
    impact: 3,
    cost: "low",
    category: "Travel",
    estimatedSavings: 10,
    details: "Reducing individual car commutes by 50% can cut transportation emissions significantly.",
  },
  {
    id: "5",
    title: "Waste Reduction Program",
    description: "Implement a comprehensive waste segregation system",
    impact: 2,
    cost: "low",
    category: "Waste",
    estimatedSavings: 8,
    details: "Proper waste management and recycling can reduce landfill emissions by 60%.",
  },
];

export const Recommendations: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [filterImpact, setFilterImpact] = React.useState("all");
  const [filterCost, setFilterCost] = React.useState("all");

  const filtered = mockRecommendations.filter((r) => {
    const impactMatch = filterImpact === "all" || r.impact >= Number(filterImpact);
    const costMatch = filterCost === "all" || r.cost === filterCost;
    return impactMatch && costMatch;
  });

  const getRatingDisplay = (rating: number) => {
    return "⭐".repeat(rating);
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-heading font-bold text-neutral-900 dark:text-white">
          Recommendations
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Actionable steps to reduce your carbon emissions
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap bg-white dark:bg-neutral-800 p-4 rounded-lg">
        <div>
          <label className="text-sm font-medium block mb-2">Min Impact</label>
          <select
            value={filterImpact}
            onChange={(e) => setFilterImpact(e.target.value)}
            className="input-base text-sm"
          >
            <option value="all">All</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Cost</label>
          <select
            value={filterCost}
            onChange={(e) => setFilterCost(e.target.value)}
            className="input-base text-sm"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-3">
        {filtered.map((rec) => (
          <div key={rec.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-soft overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === rec.id ? null : rec.id)}
              className="w-full p-4 flex justify-between items-start hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-left"
            >
              <div className="flex-1">
                <h3 className="font-heading font-bold text-neutral-900 dark:text-white">
                  {rec.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {rec.description}
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded">
                    {getRatingDisplay(rec.impact)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded capitalize ${getCostColor(rec.cost)}`}>
                    {rec.cost} Cost
                  </span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                    {rec.category}
                  </span>
                </div>
              </div>
              <span className="ml-4 text-2xl">{expanded === rec.id ? "−" : "+"}</span>
            </button>

            {expanded === rec.id && (
              <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700">
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                  {rec.details}
                </p>
                {rec.estimatedSavings && (
                  <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    Estimated Savings: {rec.estimatedSavings}% reduction
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          No recommendations match your filters
        </div>
      )}
    </div>
  );
};

export default Recommendations;

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
  {
    id: "6",
    title: "Smart Building Automation",
    description: "Install sensors and automation for HVAC and lighting systems",
    impact: 4,
    cost: "medium",
    category: "Efficiency",
    estimatedSavings: 25,
    details: "Automated systems can reduce energy consumption by 20-30% through intelligent scheduling and occupancy detection.",
  },
  {
    id: "7",
    title: "Green Procurement Policy",
    description: "Prioritize suppliers with sustainable practices and low-carbon products",
    impact: 3,
    cost: "low",
    category: "Supply Chain",
    estimatedSavings: 12,
    details: "Choosing suppliers with verified carbon reduction programs can lower your scope 3 emissions significantly.",
  },
  {
    id: "8",
    title: "Employee Training Program",
    description: "Conduct regular sustainability awareness and energy conservation training",
    impact: 2,
    cost: "low",
    category: "Behavioral",
    estimatedSavings: 8,
    details: "Well-informed employees can reduce energy waste by 10-15% through conscious behavioral changes.",
  },
  {
    id: "9",
    title: "Water Conservation Measures",
    description: "Install low-flow fixtures and implement water recycling systems",
    impact: 3,
    cost: "medium",
    category: "Water",
    estimatedSavings: 18,
    details: "Reducing water usage by 30% also reduces the energy required for water treatment and heating.",
  },
  {
    id: "10",
    title: "Electric Vehicle Fleet",
    description: "Transition company vehicles to electric or hybrid models",
    impact: 4,
    cost: "high",
    category: "Travel",
    estimatedSavings: 35,
    details: "Electric vehicles produce zero tailpipe emissions and can reduce transportation costs over time.",
  },
  {
    id: "11",
    title: "Carbon Offsetting Program",
    description: "Invest in verified carbon offset projects (forests, renewable energy)",
    impact: 3,
    cost: "medium",
    category: "Offsetting",
    estimatedSavings: 100,
    details: "Carbon offsets can neutralize remaining emissions while supporting global climate solutions.",
  },
  {
    id: "12",
    title: "Remote Work Policy",
    description: "Implement flexible remote work options to reduce commuting",
    impact: 3,
    cost: "low",
    category: "Travel",
    estimatedSavings: 22,
    details: "Allowing 2-3 remote work days per week can reduce commuting emissions by 40-60%.",
  },
  {
    id: "13",
    title: "Energy-Efficient Appliances",
    description: "Replace old equipment with ENERGY STAR certified appliances",
    impact: 3,
    cost: "medium",
    category: "Efficiency",
    estimatedSavings: 15,
    details: "ENERGY STAR appliances use 10-50% less energy than standard models.",
  },
  {
    id: "14",
    title: "Green Building Certification",
    description: "Pursue LEED or BREEAM certification for your facilities",
    impact: 4,
    cost: "high",
    category: "Building",
    estimatedSavings: 30,
    details: "Certified green buildings reduce energy use by 25-30% and improve indoor environmental quality.",
  },
  {
    id: "15",
    title: "Sustainable Packaging",
    description: "Switch to recyclable, biodegradable, or minimal packaging materials",
    impact: 2,
    cost: "medium",
    category: "Waste",
    estimatedSavings: 12,
    details: "Reducing packaging weight by 20% and using sustainable materials can cut waste emissions significantly.",
  },
  {
    id: "16",
    title: "Demand Response Program",
    description: "Participate in utility demand response programs for peak shaving",
    impact: 3,
    cost: "low",
    category: "Energy",
    estimatedSavings: 8,
    details: "Reducing peak demand by 15% can avoid using high-emission peaker plants.",
  },
  {
    id: "17",
    title: "Composting Program",
    description: "Implement food waste composting to reduce methane emissions",
    impact: 3,
    cost: "low",
    category: "Waste",
    estimatedSavings: 15,
    details: "Composting food waste prevents methane release from landfills and creates nutrient-rich soil.",
  },
  {
    id: "18",
    title: "Virtual Meetings",
    description: "Use video conferencing instead of business travel when possible",
    impact: 3,
    cost: "low",
    category: "Travel",
    estimatedSavings: 28,
    details: "Replacing one business trip with virtual meetings can save 0.5-1 ton of CO2 per trip.",
  },
  {
    id: "19",
    title: "Heat Recovery Systems",
    description: "Install waste heat recovery from HVAC and industrial processes",
    impact: 4,
    cost: "medium",
    category: "Efficiency",
    estimatedSavings: 20,
    details: "Capturing and reusing waste heat can improve overall energy efficiency by 15-25%.",
  },
  {
    id: "20",
    title: "Sustainable Supply Chain Audit",
    description: "Conduct carbon footprint assessment of key suppliers",
    impact: 3,
    cost: "medium",
    category: "Supply Chain",
    estimatedSavings: 18,
    details: "Understanding supplier emissions helps identify opportunities for collaborative carbon reduction.",
  },
];

export const Recommendations: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [filterImpact, setFilterImpact] = React.useState("all");
  const [filterCost, setFilterCost] = React.useState("all");
  const [filterCategory, setFilterCategory] = React.useState("all");

  const filtered = mockRecommendations.filter((r) => {
    const impactMatch = filterImpact === "all" || r.impact >= Number(filterImpact);
    const costMatch = filterCost === "all" || r.cost === filterCost;
    const categoryMatch = filterCategory === "all" || r.category === filterCategory;
    return impactMatch && costMatch && categoryMatch;
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
            <option value="2">2+</option>
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
        <div>
          <label className="text-sm font-medium block mb-2">Category</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input-base text-sm w-full min-w-[140px] sm:min-w-[180px] px-4 py-2.5 rounded-lg border-2"
          >
            <option value="all">All Categories</option>
            <option value="Energy">Energy</option>
            <option value="Efficiency">Efficiency</option>
            <option value="Renewable">Renewable</option>
            <option value="Travel">Travel</option>
            <option value="Waste">Waste</option>
            <option value="Supply Chain">Supply Chain</option>
            <option value="Behavioral">Behavioral</option>
            <option value="Water">Water</option>
            <option value="Offsetting">Offsetting</option>
            <option value="Building">Building</option>
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

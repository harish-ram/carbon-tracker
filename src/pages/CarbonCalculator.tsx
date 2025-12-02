import React from "react";
import carbonAPI from "@/services/carbonAPI";
import FormInput from "@/components/FormInput";
import { formatNumber } from "@/utils/helpers";

export const CarbonCalculator: React.FC = () => {
  const [activityType, setActivityType] = React.useState<"electricity" | "fuel" | "travel" | "waste" | "water">("electricity");
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || Number(value) <= 0) return;

    setLoading(true);
    try {
      let calcResult;
      switch (activityType) {
        case "electricity":
          calcResult = await carbonAPI.calculateElectricity(Number(value), "IN");
          break;
        case "fuel":
          calcResult = await carbonAPI.calculateFuel(Number(value), "diesel");
          break;
        case "travel":
          calcResult = await carbonAPI.calculateTravel(Number(value), "car");
          break;
        case "waste":
          calcResult = await carbonAPI.calculateWaste(Number(value), "landfill");
          break;
        case "water":
          calcResult = await carbonAPI.calculateWater(Number(value));
          break;
      }
      if (calcResult.success) {
        setResult(calcResult.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-heading font-bold text-neutral-900 dark:text-white">
          Carbon Calculator
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Convert your activities into CO₂ equivalents
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
          <h2 className="text-xl font-heading font-bold mb-6">Calculate Emissions</h2>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Activity Type</label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value as any)}
                className="input-base"
              >
                <option value="electricity">Electricity (kWh)</option>
                <option value="fuel">Fuel (liters)</option>
                <option value="travel">Travel (km)</option>
                <option value="waste">Waste (kg)</option>
                <option value="water">Water (m³)</option>
              </select>
            </div>

            <FormInput
              label="Value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              step={0.01}
              min={0}
            />

            <button type="submit" disabled={loading} className="w-full btn-primary">
              {loading ? "Calculating..." : "Calculate CO₂e"}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
          <h2 className="text-xl font-heading font-bold mb-6">Results</h2>

          {result ? (
            <div className="space-y-4">
              <div className="text-center p-6 bg-primary-50 dark:bg-primary-900 rounded-lg">
                <p className="text-sm text-primary-700 dark:text-primary-300 uppercase tracking-wide">
                  CO₂ Emissions
                </p>
                <p className="text-5xl font-bold text-primary-600 dark:text-primary-400 mt-2">
                  {formatNumber(result.co2e, 2)}
                </p>
                <p className="text-sm text-primary-700 dark:text-primary-300 mt-1">kg CO₂e</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Input:</span>
                  <span className="font-medium">{formatNumber(result.value, 2)} {result.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Activity:</span>
                  <span className="font-medium capitalize">{result.type}</span>
                </div>
              </div>

              {result.factors && (
                <div className="p-4 bg-neutral-100 dark:bg-neutral-700 rounded-lg text-sm">
                  <p className="font-medium mb-2">Calculation Details:</p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {result.factors.notes}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-500">
              <p>Enter values and calculate to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;

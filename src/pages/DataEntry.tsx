import React from "react";
import { useAppStore } from "@/store/appStore";
import FormInput from "@/components/FormInput";
import carbonAPI from "@/services/carbonAPI";
import { formatNumber } from "@/utils/helpers";

export const DataEntry: React.FC = () => {
  const {
    records,
    addRecord,
    updateRecord,
    deleteRecord,
    setError,
    setSuccess,
    error,
  } = useAppStore();
  const [activeTab, setActiveTab] = React.useState<"electricity" | "fuel" | "water" | "waste" | "travel">("electricity");
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [value, setValue] = React.useState("");
  const [unit, setUnit] = React.useState("kWh");
  const [isLoading, setIsLoading] = React.useState(false);
  const [editId, setEditId] = React.useState<string | null>(null);

  const unitOptions: Record<string, string[]> = {
    electricity: ["kWh", "MWh"],
    fuel: ["liters", "gallons"],
    water: ["m³", "liters"],
    waste: ["kg", "tons"],
    travel: ["km", "miles"],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || Number(value) <= 0) {
      setError("Please enter a valid value");
      return;
    }
    setIsLoading(true);
    try {
      let result;
      switch (activeTab) {
        case "electricity":
          result = await carbonAPI.calculateElectricity(Number(value), "IN");
          break;
        case "fuel":
          result = await carbonAPI.calculateFuel(Number(value), "diesel");
          break;
        case "water":
          result = await carbonAPI.calculateWater(Number(value));
          break;
        case "waste":
          result = await carbonAPI.calculateWaste(Number(value), "landfill");
          break;
        case "travel":
          result = await carbonAPI.calculateTravel(Number(value), "car");
          break;
      }
      if (result.success && result.data) {
        if (editId) {
          await updateRecord(editId, {
            month: month.toString(),
            year,
            category: activeTab,
            value: Number(value),
            unit,
            co2e: result.data.co2e,
            notes: `Auto-calculated from ${activeTab}`,
          });
          setSuccess(`Record updated! CO₂e: ${formatNumber(result.data.co2e)} kg`);
        } else {
          await addRecord({
            month: month.toString(),
            year,
            category: activeTab,
            value: Number(value),
            unit,
            co2e: result.data.co2e,
            notes: `Auto-calculated from ${activeTab}`,
          });
          setSuccess(`Record added! CO₂e: ${formatNumber(result.data.co2e)} kg`);
        }
        setValue("");
        setEditId(null);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.error || "Failed to calculate emissions");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (record: any) => {
    setMonth(Number(record.month));
    setYear(Number(record.year));
    setValue(record.value.toString());
    setUnit(record.unit);
    setActiveTab(record.category);
    setEditId(record.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      deleteRecord(id);
      setSuccess("Record deleted.");
      setTimeout(() => setSuccess(null), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-neutral-900 dark:text-white">
          Data Entry
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Enter monthly activity data for emissions calculation
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-error text-white p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
          <h2 className="text-xl font-heading font-bold mb-6 text-neutral-900 dark:text-white">
            Add New Record
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {(["electricity", "fuel", "water", "waste", "travel"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Month"
                type="number"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                min={1}
                max={12}
              />
              <FormInput
                label="Year"
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                min={2020}
              />
            </div>

            <FormInput
              label={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Value`}
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              required
              step={0.01}
              min={0}
            />

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="input-base"
              >
                {unitOptions[activeTab].map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary"
            >
              {isLoading ? "Calculating..." : "Add Record"}
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
          <h2 className="text-xl font-heading font-bold mb-6 text-neutral-900 dark:text-white">
            Recent Records
          </h2>

          {records.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <p>No records yet. Add your first entry above!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {records.slice(-10).reverse().map((record) => (
                <div key={record.id} className="p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {record.category.charAt(0).toUpperCase() + record.category.slice(1)}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {record.month}/{record.year}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600 dark:text-primary-400">
                        {formatNumber(record.value)} {record.unit}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {formatNumber(record.co2e || 0)} kg CO₂e
                      </p>
                      <div className="flex gap-2 mt-2 justify-end">
                        <button
                          className="px-2 py-1 text-xs rounded bg-primary-500 text-white hover:bg-primary-600"
                          onClick={() => handleEdit(record)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 text-xs rounded bg-error text-white hover:bg-red-600"
                          onClick={() => handleDelete(record.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataEntry;

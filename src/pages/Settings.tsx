import React from "react";
import { useAppStore } from "@/store/appStore";
import FormInput from "@/components/FormInput";
import ToggleSwitch from "@/components/ToggleSwitch";

export const Settings: React.FC = () => {
  const { company, setCompany, theme, setTheme } = useAppStore();
  const [formData, setFormData] = React.useState({
    companyName: company?.name || "",
    industry: company?.industry || "manufacturing",
    region: company?.region || "IN",
    employees: company?.employees || 0,
    emailAlerts: company?.settings?.emailAlerts || false,
    currency: company?.settings?.currency || "USD",
    measurementUnit: company?.settings?.measurementUnit || "metric_tons",
  });

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    const updatedCompany = {
      id: company?.id || `company_${Date.now()}`,
      name: formData.companyName,
      industry: formData.industry,
      region: formData.region,
      employees: formData.employees,
      settings: {
        theme,
        emailAlerts: formData.emailAlerts,
        currency: formData.currency,
        measurementUnit: formData.measurementUnit,
      },
    };
    setCompany(updatedCompany);
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-4xl font-heading font-bold text-neutral-900 dark:text-white">
          Settings
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Manage your account and preferences
        </p>
      </div>

      {/* Company Information */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft space-y-4">
        <h2 className="text-lg font-heading font-bold">Company Information</h2>

        <FormInput
          label="Company Name"
          value={formData.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
          placeholder="Enter company name"
        />

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Industry Type
          </label>
          <select
            value={formData.industry}
            onChange={(e) => handleChange("industry", e.target.value)}
            className="input-base"
          >
            <option value="manufacturing">Manufacturing</option>
            <option value="it">IT & Technology</option>
            <option value="hospitality">Hospitality</option>
            <option value="retail">Retail</option>
            <option value="energy">Energy</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Region
          </label>
          <select
            value={formData.region}
            onChange={(e) => handleChange("region", e.target.value)}
            className="input-base"
          >
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="EU">European Union</option>
            <option value="CN">China</option>
            <option value="JP">Japan</option>
          </select>
        </div>

        <FormInput
          label="Number of Employees"
          type="number"
          value={formData.employees}
          onChange={(e) => handleChange("employees", e.target.value)}
          placeholder="Enter number"
        />
      </div>

      {/* Preferences */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft space-y-6">
        <h2 className="text-lg font-heading font-bold">Preferences</h2>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Currency
          </label>
          <select
            value={formData.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
            className="input-base"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Measurement Unit
          </label>
          <select
            value={formData.measurementUnit}
            onChange={(e) => handleChange("measurementUnit", e.target.value)}
            className="input-base"
          >
            <option value="metric_tons">Metric Tons (tCO₂e)</option>
            <option value="kilograms">Kilograms (kg CO₂e)</option>
          </select>
        </div>

        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">Email Alerts</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Receive notifications for emission spikes
              </p>
            </div>
            <ToggleSwitch
              checked={formData.emailAlerts}
              onChange={(checked) => handleChange("emailAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Enable dark theme
              </p>
            </div>
            <ToggleSwitch
              checked={theme === "dark"}
              onChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button onClick={handleSave} className="btn-primary flex-1">
          Save Settings
        </button>
        <button className="btn-secondary flex-1">
          Cancel
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 rounded p-6">
        <h3 className="font-heading font-bold text-red-900 dark:text-red-200 mb-2">
          Danger Zone
        </h3>
        <p className="text-sm text-red-800 dark:text-red-300 mb-4">
          Irreversible actions are taken here.
        </p>
        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
          Delete All Data
        </button>
      </div>
    </div>
  );
};

export default Settings;

import React from "react";

interface ToggleSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <div className="flex items-center gap-3">
      {label && (
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}
      <button
        onClick={() => onChange?.(!checked)}
        disabled={disabled}
        className={`
          relative inline-flex h-7 w-12 items-center rounded-full
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          dark:focus:ring-offset-neutral-800
          ${checked ? "bg-primary-500" : "bg-neutral-300 dark:bg-neutral-600"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`
            inline-block h-5 w-5 transform rounded-full bg-white
            transition-transform duration-200 shadow-md
            ${checked ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;

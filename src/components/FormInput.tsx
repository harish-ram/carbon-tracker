import React from "react";

interface FormInputProps {
  label?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = (props: FormInputProps) => {
  const {
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    error,
    disabled = false,
    min,
    max,
    step,
    className = "",
  } = props;
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={`
          w-full px-4 py-2.5 rounded-lg border-2
          bg-white dark:bg-neutral-700
          text-neutral-900 dark:text-white
          placeholder:text-neutral-500 dark:placeholder:text-neutral-400
          border-neutral-200 dark:border-neutral-600
          focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900
          focus:outline-none transition-all duration-200
          disabled:bg-neutral-100 dark:disabled:bg-neutral-800
          disabled:text-neutral-500 dark:disabled:text-neutral-400
          disabled:cursor-not-allowed
          ${error ? "border-error focus:border-error focus:ring-error focus:ring-opacity-20" : ""}
        `}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};

export default FormInput;

import React from "react";

export const Loader: React.FC<{ size?: "sm" | "md" | "lg" }> = ({ size = "md" }) => {
  const sizeClass = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }[size];

  return (
    <div className={`inline-block ${sizeClass}`}>
      <div
        className={`${sizeClass} border-4 border-primary-200 dark:border-primary-900 border-t-primary-500 dark:border-t-primary-400 rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loader;

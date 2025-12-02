import React from "react";
import { formatLargeNumber } from "@/utils/helpers";

interface KPICardProps {
  title: string;
  value: number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: number; // percentage change
  trendDirection?: "up" | "down";
  className?: string;
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = (props: KPICardProps) => {
  const {
    title,
    value,
    unit = "kg CO₂e",
    icon,
    trend,
    trendDirection,
    className = "",
    onClick,
  } = props;
  const isPositiveTrend = trendDirection === "down" && trend !== undefined && trend > 0;

  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft
        hover:shadow-lg hover:scale-102 transition-all duration-200 ease-smooth
        border border-transparent hover:border-primary-300 dark:hover:border-primary-700
        cursor-pointer group
        ${className}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">
            {title}
          </p>
        </div>
        {icon && (
          <div className="text-primary-500 dark:text-primary-400 group-hover:scale-110 transition-transform">
            {icon}
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-3xl font-bold text-neutral-900 dark:text-white font-heading">
          {formatLargeNumber(value, 2)}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{unit}</p>
      </div>

      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositiveTrend ? "text-primary-600 dark:text-primary-400" : "text-error"
        }`}>
          <span>{isPositiveTrend ? "↓" : "↑"}</span>
          <span>{Math.abs(trend).toFixed(1)}%</span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            vs last month
          </span>
        </div>
      )}
    </div>
  );
};

export default KPICard;

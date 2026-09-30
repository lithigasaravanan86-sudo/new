import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

export const CircularProgress = ({ percentage = 85, size = 110, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let colorClass = "text-indigo-600";
  if (percentage >= 90) colorClass = "text-emerald-500";
  else if (percentage < 60) colorClass = "text-amber-500";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100"
          fill="transparent"
        />
        {/* Animated fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${colorClass} transition-all duration-1000 ease-out`}
          fill="transparent"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-xl font-extrabold text-slate-800">{percentage}%</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Done</span>
      </div>
    </div>
  );
};

export const LinearProgress = ({ percentage = 85, label, showValue = true }) => {
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs font-semibold mb-1.5 text-slate-700">
          <span>{label}</span>
          {showValue && <span className="text-indigo-600 font-bold">{percentage}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-sky-500 h-2.5 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
};

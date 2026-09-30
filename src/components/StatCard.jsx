import React from "react";

export const StatCard = ({ title, value, subtitle, icon: Icon, color = "indigo", badge }) => {
  const colorMap = {
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-100",
      pill: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-100",
      pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    sky: {
      bg: "bg-sky-50",
      text: "text-sky-600",
      border: "border-sky-100",
      pill: "bg-sky-50 text-sky-700 border-sky-200",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-100",
      pill: "bg-amber-50 text-amber-700 border-amber-200",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-100",
      pill: "bg-purple-50 text-purple-700 border-purple-200",
    },
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h4 className="text-2xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              {value}
            </h4>
            {badge && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${scheme.pill}`}>
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${scheme.bg} ${scheme.text} group-hover:scale-110 transition-transform`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent group-hover:via-indigo-400 transition-colors" />
    </div>
  );
};

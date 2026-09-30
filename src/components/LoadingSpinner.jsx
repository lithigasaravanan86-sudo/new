import React from "react";
import { Loader2 } from "lucide-react";

export const LoadingSpinner = ({ size = "md", text = "Loading...", fullScreen = false }) => {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3 p-6 text-slate-600">
      <Loader2 className={`${sizeMap[size] || sizeMap.md} animate-spin text-indigo-600`} />
      {text && <p className="text-sm font-medium text-slate-500 animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center border border-slate-100">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-2" />
          <p className="text-sm font-semibold text-slate-700">{text}</p>
        </div>
      </div>
    );
  }

  return content;
};

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-slide-up ${
              toast.type === "success"
                ? "bg-emerald-900/90 text-emerald-50 border-emerald-600/40"
                : toast.type === "error"
                ? "bg-rose-900/90 text-rose-50 border-rose-600/40"
                : toast.type === "warning"
                ? "bg-amber-900/90 text-amber-50 border-amber-600/40"
                : "bg-slate-900/90 text-slate-50 border-slate-700/60"
            }`}
            role="alert"
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-300" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 text-rose-300" />}
              {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-300" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-indigo-300" />}
            </div>
            <div className="flex-1 text-sm font-medium leading-relaxed">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-slate-300 hover:text-white transition-colors p-1 -mr-1 rounded-md"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

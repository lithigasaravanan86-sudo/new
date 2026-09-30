import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LogOut, CheckCircle2, ArrowRight, ShieldCheck, Home } from "lucide-react";

export const LogoutPage = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      logout();
    }
  }, [isAuthenticated, logout]);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto ring-8 ring-indigo-50/50">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
            Logged Out Successfully
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Your active session and authentication tokens have been securely purged from this browser.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>EduSphereAI Student Security Protected</span>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            to="/login"
            id="logout-relogin-btn"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30 transition-all text-xs"
          >
            <span>Sign In Again</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/"
            id="logout-home-btn"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all text-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

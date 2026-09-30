import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { authService } from "../services/authService";
import { Modal } from "../components/Modal";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Loader2,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

export const LoginPage = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Forgot Password modal state
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitting, setForgotSubmitting] = useState(false);
  const [forgotSuccessMessage, setForgotSuccessMessage] = useState("");
  const [forgotError, setForgotError] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!identifier.trim()) {
      setFormError("Please enter your Email address or Register Number.");
      return;
    }
    if (!password) {
      setFormError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(identifier.trim(), password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setFormError(res.error || "Login failed. Please verify your credentials.");
      }
    } catch (err) {
      setFormError(err.message || "An unexpected error occurred during login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async (demoId, demoPwd) => {
    setIdentifier(demoId);
    setPassword(demoPwd);
    setFormError("");
    setIsSubmitting(true);
    try {
      const res = await login(demoId, demoPwd);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setFormError(res.error || "Demo login failed.");
      }
    } catch (err) {
      setFormError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccessMessage("");

    if (!forgotEmail.trim() || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotError("Please enter a valid student email address.");
      return;
    }

    setForgotSubmitting(true);
    try {
      const res = await authService.forgotPassword(forgotEmail.trim());
      setForgotSuccessMessage(
        res.message || "Password reset instructions have been dispatched to your email."
      );
      showToast("Reset link sent to registered email.", "success");
    } catch (err) {
      setForgotError(err.message || "Unable to find an account with this email.");
    } finally {
      setForgotSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-sky-600 px-6 py-8 text-white text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-3 border border-white/20">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif]">
            Student Portal Login
          </h1>
          <p className="text-indigo-100 text-xs sm:text-sm mt-1">
            Access your academic records, attendance & grades
          </p>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Demo Access Bar */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-center">
            <p className="text-xs font-semibold text-indigo-900 mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Instant Evaluator Demo Login</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="demo-login-aarav"
                onClick={() => handleDemoLogin("21CS042", "password123")}
                className="py-1.5 px-2.5 rounded-lg bg-white hover:bg-indigo-600 hover:text-white text-slate-700 text-xs font-semibold border border-indigo-200/60 shadow-2xs transition-all flex flex-col items-center"
              >
                <span>Aarav (CSE)</span>
                <span className="text-[10px] opacity-75 font-mono">21CS042</span>
              </button>
              <button
                type="button"
                id="demo-login-priya"
                onClick={() => handleDemoLogin("20EC108", "password123")}
                className="py-1.5 px-2.5 rounded-lg bg-white hover:bg-purple-600 hover:text-white text-slate-700 text-xs font-semibold border border-purple-200/60 shadow-2xs transition-all flex flex-col items-center"
              >
                <span>Priya (ECE)</span>
                <span className="text-[10px] opacity-75 font-mono">20EC108</span>
              </button>
            </div>
          </div>

          {/* Form Error Banner */}
          {formError && (
            <div
              className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-2.5 text-xs font-medium animate-slide-up"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Identifier (Email / Register Number) */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Email or Register Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="identifier"
                  id="identifier"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (formError) setFormError("");
                  }}
                  placeholder="e.g. 21CS042 or student@edusphere.edu"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/20 focus:outline-hidden transition-all"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Password <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  id="forgot-password-link"
                  onClick={() => {
                    setIsForgotModalOpen(true);
                    setForgotError("");
                    setForgotSuccessMessage("");
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formError) setFormError("");
                  }}
                  placeholder="Enter your student password"
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/20 focus:outline-hidden transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  id="toggle-password-visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="login-submit-btn"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating Student...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Registration Link */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have a student account yet?{" "}
            <Link
              to="/register"
              id="login-register-link"
              className="text-indigo-600 font-bold hover:underline"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        title="Reset Student Password"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Enter your registered university email address. We will verify your record and send a secure reset link.
          </p>

          {forgotSuccessMessage ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{forgotSuccessMessage}</span>
              </div>
              <p className="text-emerald-700/80">
                Please check your inbox or spam folder for password recovery instructions.
              </p>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="mt-2 w-full py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              {forgotError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{forgotError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="e.g. aarav.sharma@edusphere.edu"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/20 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotSubmitting}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all disabled:opacity-50"
                >
                  {forgotSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Send Recovery Instructions</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};

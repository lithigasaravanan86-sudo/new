import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  GraduationCap,
  LayoutDashboard,
  User,
  UserCog,
  FileSpreadsheet,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center gap-2.5 group"
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent font-['Plus_Jakarta_Sans',sans-serif]">
                EduSphere<span className="text-indigo-600">AI</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded">
                STUDENT PORTAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  id="nav-link-dashboard"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive("/dashboard")
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  id="nav-link-profile"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive("/profile")
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <User className="w-4 h-4 text-indigo-600" />
                  Profile
                </Link>

                <Link
                  to="/edit-profile"
                  id="nav-link-edit-profile"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive("/edit-profile")
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <UserCog className="w-4 h-4 text-indigo-600" />
                  Edit Profile
                </Link>

                <Link
                  to="/student-info"
                  id="nav-link-student-info"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive("/student-info")
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                  Student Info
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  id="nav-link-home"
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive("/")
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/register"
                  id="nav-link-register"
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive("/register")
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  Student Registration
                </Link>
              </>
            )}
          </div>

          {/* Right Action / Profile Button */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  id="user-profile-menu-button"
                  className="flex items-center gap-3 p-1.5 pr-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-xs"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.studentName}`}
                    alt={user.studentName}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                  />
                  <div className="text-left text-xs leading-tight">
                    <p className="font-semibold text-slate-800 max-w-[120px] truncate">
                      {user.studentName}
                    </p>
                    <p className="text-slate-500 font-mono text-[10px]">
                      {user.registerNumber}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-slide-up"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {user.email}
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        CGPA: {user.cgpa}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      View Profile
                    </Link>

                    <Link
                      to="/edit-profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <UserCog className="w-4 h-4 text-slate-400" />
                      Edit Profile
                    </Link>

                    <Link
                      to="/student-info"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-slate-400" />
                      Academic Records
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      id="dropdown-logout-button"
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  id="nav-button-login"
                  className="px-4 py-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-lg transition-colors"
                >
                  Student Login
                </Link>
                <Link
                  to="/register"
                  id="nav-button-register"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-600/30 transition-all hover:shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  Register Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-5 space-y-1 shadow-lg animate-slide-up">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3 p-3 bg-indigo-50/70 rounded-xl mb-3">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.studentName}`}
                alt={user.studentName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 truncate">{user.studentName}</p>
                <p className="text-xs text-slate-500 font-mono">{user.registerNumber}</p>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                CGPA {user.cgpa}
              </span>
            </div>
          ) : null}

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive("/dashboard") ? "bg-indigo-50 text-indigo-700" : "text-slate-700"
                }`}
              >
                <LayoutDashboard className="w-5 h-5 text-indigo-600" />
                Dashboard
              </Link>

              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive("/profile") ? "bg-indigo-50 text-indigo-700" : "text-slate-700"
                }`}
              >
                <User className="w-5 h-5 text-indigo-600" />
                Student Profile
              </Link>

              <Link
                to="/edit-profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive("/edit-profile") ? "bg-indigo-50 text-indigo-700" : "text-slate-700"
                }`}
              >
                <UserCog className="w-5 h-5 text-indigo-600" />
                Edit Profile
              </Link>

              <Link
                to="/student-info"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive("/student-info") ? "bg-indigo-50 text-indigo-700" : "text-slate-700"
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
                Student Information
              </Link>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-5 h-5 text-rose-500" />
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
              >
                Home
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
              >
                Student Registration
              </Link>
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-indigo-600 bg-indigo-50"
                >
                  Student Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 shadow"
                >
                  Create Account
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

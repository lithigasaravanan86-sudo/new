import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  GraduationCap,
  Shield,
  Sparkles,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle,
  Users,
  Compass,
  FileCheck,
} from "lucide-react";

export const LandingPage = () => {
  const { isAuthenticated, user, login } = useAuth();
  const navigate = useNavigate();

  const handleQuickDemoLogin = async (regNo) => {
    const res = await login(regNo, "password123");
    if (res.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Background decorative glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-indigo-200/40 via-sky-200/30 to-purple-200/40 blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>EduSphereAI • Academic Intelligence & Student Portal</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif] leading-[1.15]">
              Empowering Students with{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-sky-600 bg-clip-text text-transparent">
                Intelligent Academic
              </span>{" "}
              Records
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              A modern, unified portal designed for university students to track CGPA, monitor course attendance, access official credentials, and stay connected with departmental advisors.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  id="hero-go-dashboard-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 hover:shadow-xl transition-all"
                >
                  Go to Student Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    id="hero-register-btn"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 hover:shadow-xl transition-all"
                  >
                    Register as Student
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/login"
                    id="hero-login-btn"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all"
                  >
                    Student Login
                  </Link>
                </>
              )}
            </div>

            {/* Demo Quick Access */}
            {!isAuthenticated && (
              <div className="pt-6 border-t border-slate-200/60 max-w-lg mx-auto">
                <p className="text-xs text-slate-500 font-medium mb-3">
                  ⚡ Want an instant demo? Click below to log in directly:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    onClick={() => handleQuickDemoLogin("21CS042")}
                    className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition-colors flex items-center gap-1.5"
                  >
                    <span>👤 Aarav (CSE 3rd Year)</span>
                  </button>
                  <button
                    onClick={() => handleQuickDemoLogin("20EC108")}
                    className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold border border-purple-200 transition-colors flex items-center gap-1.5"
                  >
                    <span>👤 Priya (ECE 4th Year)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Feature Preview Card */}
          <div className="mt-16 max-w-5xl mx-auto rounded-3xl bg-white border border-slate-200/80 shadow-2xl p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Live CGPA & SGPA Analytics
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Real-time GPA computation across all academic semesters with grade breakdown and credit tallies.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Subject-Wise Attendance
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Visual progress meters monitoring lecture attendance thresholds and exam eligibility requirements.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  JWT-Secured REST Architecture
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Robust role authentication, zero client-side password exposure, and REST-standard token protection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-14 bg-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-300 font-['Plus_Jakarta_Sans',sans-serif]">
                100%
              </p>
              <p className="text-xs sm:text-sm text-indigo-100/70 mt-1 font-medium">
                Digital Transcripts & Records
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-300 font-['Plus_Jakarta_Sans',sans-serif]">
                9.2+
              </p>
              <p className="text-xs sm:text-sm text-indigo-100/70 mt-1 font-medium">
                Average Dean's List Score
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-300 font-['Plus_Jakarta_Sans',sans-serif]">
                25,000+
              </p>
              <p className="text-xs sm:text-sm text-indigo-100/70 mt-1 font-medium">
                Active Student Enrollees
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-300 font-['Plus_Jakarta_Sans',sans-serif]">
                99.9%
              </p>
              <p className="text-xs sm:text-sm text-indigo-100/70 mt-1 font-medium">
                Portal Service Uptime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Modules Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
            Everything a University Student Needs
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Integrated tools designed according to higher-education standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">Student Dossier & ID</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Consolidated digital student card, registered details, and printable credentials verified with official seal.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">Grade History & SGPA</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Complete semester-wise performance matrix, credit calculations, and cumulative grade point average summaries.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">Attendance Tracking</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Live percentage calculation with warning triggers to ensure students consistently maintain above 75% attendance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">Enrolled Courses & Faculty</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              View course codes, syllabus credits, assigned professors, and departmental advisors in one place.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">Official Document Vault</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Direct access to bonafide certificates, examination hall tickets, and certified grade sheets.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">Profile & Contact Control</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Manage personal bio, residential address, emergency contact, while official academic fields remain registrar-protected.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-sky-600 p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif]">
              Ready to Access Your Academic Portal?
            </h2>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Join thousands of students who monitor their academic journey with EduSphereAI. Registration takes less than two minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold bg-white text-indigo-700 hover:bg-indigo-50 shadow-md transition-all"
              >
                Create Student Account
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold bg-indigo-800/80 hover:bg-indigo-800 text-white border border-indigo-400/40 transition-all"
              >
                Sign In to Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

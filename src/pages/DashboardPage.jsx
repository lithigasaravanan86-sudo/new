import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { studentService } from "../services/studentService";
import { StatCard } from "../components/StatCard";
import { CircularProgress } from "../components/ProgressBar";
import { Modal } from "../components/Modal";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {
  GraduationCap,
  User,
  Hash,
  BookOpen,
  CalendarDays,
  Award,
  Mail,
  Phone,
  Clock,
  Sparkles,
  ArrowRight,
  UserCog,
  FileSpreadsheet,
  LogOut,
  CheckCircle2,
  Calendar,
  Layers,
  TrendingUp,
  Download,
} from "lucide-react";

export const DashboardPage = () => {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();

  const [student, setStudent] = useState(authUser);
  const [loading, setLoading] = useState(true);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await studentService.getDashboard();
        if (res.data) {
          setStudent(res.data);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleConfirmLogout = () => {
    setLogoutModalOpen(false);
    logout();
    navigate("/login");
  };

  if (loading && !student) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading student dashboard metrics..." />
      </div>
    );
  }

  // Greeting based on current time
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) greeting = "Good afternoon";
  else if (currentHour >= 17) greeting = "Good evening";

  const completionPct = student?.profileCompletedPercentage || 85;

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Academic Session 2026-2027</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif]">
                {greeting}, {student?.studentName}!
              </h1>
              <p className="text-indigo-100 text-sm max-w-xl">
                Welcome to your EduSphereAI portal. You are enrolled in the{" "}
                <strong className="text-white">{student?.department}</strong> program (
                {student?.year}, Section {student?.section}).
              </p>
            </div>

            {/* Quick action buttons in header */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/profile"
                id="dashboard-header-profile-btn"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs shadow-md transition-all"
              >
                <User className="w-4 h-4" />
                <span>View Full Profile</span>
              </Link>
              <button
                type="button"
                id="dashboard-header-logout-btn"
                onClick={() => setLogoutModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 backdrop-blur-md transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Summary & Profile Completion Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Student Profile Summary Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <img
                  src={
                    student?.avatar ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${student?.studentName}`
                  }
                  alt={student?.studentName}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                      {student?.studentName}
                    </h2>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {student?.academicStatus || "Active Student"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {student?.collegeName}
                  </p>
                </div>
              </div>

              <Link
                to="/edit-profile"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border border-indigo-200 transition-colors"
              >
                <UserCog className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </Link>
            </div>

            {/* Profile Summary Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Register Number */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Register Number
                </span>
                <span className="text-sm font-bold text-slate-800 font-mono mt-0.5 block">
                  {student?.registerNumber}
                </span>
              </div>

              {/* Department */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Department
                </span>
                <span className="text-sm font-bold text-slate-800 mt-0.5 block truncate" title={student?.department}>
                  {student?.department}
                </span>
              </div>

              {/* Year & Section */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Year & Section
                </span>
                <span className="text-sm font-bold text-slate-800 mt-0.5 block">
                  {student?.year} • Sec {student?.section}
                </span>
              </div>

              {/* CGPA */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Cumulative GPA
                </span>
                <span className="text-sm font-extrabold text-emerald-600 mt-0.5 block">
                  {student?.cgpa} / 10.00
                </span>
              </div>

              {/* Email */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Student Email
                </span>
                <span className="text-xs font-medium text-slate-800 mt-0.5 block truncate" title={student?.email}>
                  {student?.email}
                </span>
              </div>

              {/* Phone Number */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Phone Number
                </span>
                <span className="text-xs font-medium text-slate-800 mt-0.5 block">
                  {student?.mobileNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Completion Percentage Widget */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Profile Completion
                </h3>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  Status
                </span>
              </div>

              <div className="flex items-center gap-5 my-2">
                <CircularProgress percentage={completionPct} size={95} strokeWidth={9} />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800">
                    {completionPct === 100 ? "Profile 100% Complete" : "Keep Profile Updated"}
                  </p>
                  <p className="text-xs text-slate-500 leading-snug">
                    {completionPct >= 90
                      ? "Your student record is complete and verified with the registrar."
                      : "Add residential address, emergency contact, or updated bio to reach 100%."}
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2 border-t border-slate-100 pt-4 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Academic Registration
                </span>
                <span className="font-semibold text-emerald-600">Done</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Official Department Verification
                </span>
                <span className="font-semibold text-emerald-600">Verified</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Contact & Residential Address
                </span>
                <span className="font-semibold text-indigo-600">Completed</span>
              </div>
            </div>

            <Link
              to="/edit-profile"
              id="dashboard-complete-profile-btn"
              className="w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold text-center transition-colors block"
            >
              Update Profile Details
            </Link>
          </div>
        </div>

        {/* Key Metrics / Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Cumulative GPA"
            value={student?.cgpa || "8.92"}
            subtitle="Scale of 10.00"
            icon={Award}
            color="emerald"
            badge="Top 5%"
          />
          <StatCard
            title="Overall Attendance"
            value={`${student?.attendanceOverall || 92}%`}
            subtitle="Min requirement: 75%"
            icon={Clock}
            color="indigo"
            badge="Eligible"
          />
          <StatCard
            title="Degree Credits"
            value={`${student?.creditsEarned || 114} / ${student?.totalCredits || 160}`}
            subtitle="Degree Completion"
            icon={Layers}
            color="sky"
            badge="71% Done"
          />
          <StatCard
            title="Current Term"
            value={student?.currentSemester || "Semester 6"}
            subtitle="Registered & Active"
            icon={BookOpen}
            color="purple"
            badge="Regular"
          />
        </div>

        {/* Two-Column Section: Recent Activities & Quick Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities Feed (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                  Recent Activities & Notifications
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">Latest Updates</span>
            </div>

            {student?.activities && student.activities.length > 0 ? (
              <div className="space-y-4">
                {student.activities.map((act) => (
                  <div
                    key={act.id}
                    className="p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-slate-100 transition-colors flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-800">{act.title}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {act.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap shrink-0">
                      {act.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No recent activities found.</p>
            )}
          </div>

          {/* Quick Academic Hub Shortcuts (1 Col) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] pb-3 border-b border-slate-100">
              Academic Hub Shortcuts
            </h3>

            <div className="space-y-3">
              <Link
                to="/student-info"
                className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-indigo-50/30 border border-indigo-100/80 hover:border-indigo-300 transition-all flex items-center justify-between group block"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-xs">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      Course Grades & Attendance
                    </h4>
                    <p className="text-[11px] text-slate-500">View semester-wise SGPA and syllabus</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/profile"
                className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-50/30 border border-emerald-100/80 hover:border-emerald-300 transition-all flex items-center justify-between group block"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      Digital Student Dossier
                    </h4>
                    <p className="text-[11px] text-slate-500">Official student ID & credentials</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/edit-profile"
                className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-purple-50/30 border border-purple-100/80 hover:border-purple-300 transition-all flex items-center justify-between group block"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-xs">
                    <UserCog className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-purple-700 transition-colors">
                      Edit Profile & Contacts
                    </h4>
                    <p className="text-[11px] text-slate-500">Keep emergency contacts up to date</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Logout shortcut in sidebar */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setLogoutModalOpen(true)}
                id="dashboard-logout-shortcut-btn"
                className="w-full py-2.5 px-4 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out of Student Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title="Confirm Session Logout"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to log out of your <strong>EduSphereAI</strong> student account? Your active authentication token will be securely purged.
          </p>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setLogoutModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Stay Logged In
            </button>
            <button
              type="button"
              id="confirm-logout-btn"
              onClick={handleConfirmLogout}
              className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

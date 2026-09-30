import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { studentService } from "../services/studentService";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {
  GraduationCap,
  User,
  Hash,
  Mail,
  Phone,
  Calendar,
  Building2,
  BookOpen,
  CalendarDays,
  Grid,
  Award,
  MapPin,
  Heart,
  ShieldCheck,
  UserCog,
  Printer,
  FileCheck,
  QrCode,
  Sparkles,
} from "lucide-react";

export const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const [student, setStudent] = useState(authUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await studentService.getProfile();
        if (res.data) setStudent(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading && !student) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading official student dossier..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Page Top Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              Student Profile Dossier
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Official institutional record and verified student identity card.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              id="print-profile-btn"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs transition-all"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Dossier</span>
            </button>

            <Link
              to="/edit-profile"
              id="profile-to-edit-btn"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all"
            >
              <UserCog className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>

        {/* Hero Card / Dossier Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={
                  student?.avatar ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${student?.studentName}`
                }
                alt={student?.studentName}
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-indigo-50 shadow-md"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                    {student?.studentName}
                  </h2>
                  <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{student?.academicStatus || "Active Student"}</span>
                  </span>
                </div>
                <p className="text-sm font-semibold text-indigo-700">
                  {student?.department}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  {student?.collegeName}
                </p>
              </div>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 self-stretch sm:self-auto justify-around sm:justify-start">
              <div className="text-center sm:text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  CGPA Score
                </span>
                <span className="text-xl font-extrabold text-indigo-600 font-['Plus_Jakarta_Sans',sans-serif]">
                  {student?.cgpa}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center sm:text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Attendance
                </span>
                <span className="text-xl font-extrabold text-emerald-600 font-['Plus_Jakarta_Sans',sans-serif]">
                  {student?.attendanceOverall || 92}%
                </span>
              </div>
            </div>
          </div>

          {/* Student Bio Statement */}
          {student?.bio && (
            <div className="mt-5 p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100/60 text-xs text-slate-600 leading-relaxed">
              <span className="font-bold text-indigo-900 block mb-1">Student Statement & Bio:</span>
              <p>{student.bio}</p>
            </div>
          )}
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 1: Academic Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Academic Affiliation
              </h3>
            </div>

            <dl className="space-y-3.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Register / Roll Number</dt>
                <dd className="font-bold text-slate-800 font-mono">{student?.registerNumber}</dd>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Department</dt>
                <dd className="font-bold text-slate-800 text-right max-w-[220px]">{student?.department}</dd>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Year of Study</dt>
                <dd className="font-bold text-slate-800">{student?.year}</dd>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Section</dt>
                <dd className="font-bold text-slate-800 uppercase">{student?.section}</dd>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Cumulative GPA</dt>
                <dd className="font-extrabold text-emerald-600">{student?.cgpa} / 10.00</dd>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Academic Mentor</dt>
                <dd className="font-semibold text-slate-800 text-right">
                  {student?.mentorName || "Dr. K. Ramanathan"}
                </dd>
              </div>

              <div className="flex justify-between py-1.5">
                <dt className="text-slate-500 font-medium">Mentor Email</dt>
                <dd className="font-mono text-indigo-600">
                  {student?.mentorEmail || "advisor@edusphere.edu"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Section 2: Personal & Contact Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Personal & Contact Records
              </h3>
            </div>

            <dl className="space-y-3.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Full Name</dt>
                <dd className="font-bold text-slate-800">{student?.studentName}</dd>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Official Email</dt>
                <dd className="font-semibold text-indigo-600">{student?.email}</dd>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Mobile Number</dt>
                <dd className="font-bold text-slate-800">{student?.mobileNumber}</dd>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Date of Birth</dt>
                <dd className="font-bold text-slate-800">{student?.dateOfBirth}</dd>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Gender</dt>
                <dd className="font-bold text-slate-800">{student?.gender}</dd>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Blood Group</dt>
                <dd className="font-bold text-slate-800">{student?.bloodGroup || "O+"}</dd>
              </div>

              <div className="flex justify-between py-1.5">
                <dt className="text-slate-500 font-medium">Residential Address</dt>
                <dd className="font-medium text-slate-700 text-right max-w-[240px] leading-relaxed">
                  {student?.address}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Digital Student ID Card Preview */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Digital Student Identification Card
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">ID: {student?.id}</span>
          </div>

          {/* Realistic Student Card Badge */}
          <div className="max-w-md mx-auto rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white p-6 shadow-xl border border-indigo-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wider uppercase text-white font-['Plus_Jakarta_Sans',sans-serif]">
                    EduSphere University
                  </h4>
                  <p className="text-[9px] text-indigo-300">STUDENT IDENTITY CARD</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-emerald-300 border border-white/10">
                VALID 2026-27
              </span>
            </div>

            <div className="flex items-center gap-4 py-4">
              <img
                src={
                  student?.avatar ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${student?.studentName}`
                }
                alt={student?.studentName}
                className="w-16 h-16 rounded-xl object-cover ring-2 ring-indigo-400 shrink-0"
              />
              <div className="space-y-0.5 text-xs">
                <p className="font-extrabold text-sm text-white tracking-wide">
                  {student?.studentName}
                </p>
                <p className="font-mono text-indigo-300 text-xs">{student?.registerNumber}</p>
                <p className="text-slate-300 text-[11px] truncate max-w-[200px]">
                  {student?.department}
                </p>
                <p className="text-slate-400 text-[10px]">
                  {student?.year} • Sec {student?.section}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>DOB: {student?.dateOfBirth}</span>
              <span>BLOOD: {student?.bloodGroup || "O+"}</span>
              <span className="text-emerald-400">CGPA: {student?.cgpa}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

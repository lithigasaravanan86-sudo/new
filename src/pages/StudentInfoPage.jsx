import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { Modal } from "../components/Modal";
import {
  BookOpen,
  Award,
  Clock,
  Download,
  FileText,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Building,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export const StudentInfoPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState("courses"); // "courses" | "grades" | "attendance" | "documents"
  const [previewDoc, setPreviewDoc] = useState(null);

  const courses = user?.courses || [
    { code: "CS601", name: "Cloud Computing & DevOps", credits: 4, faculty: "Dr. Anita Desai", attendance: 94, grade: "In Progress" },
    { code: "CS602", name: "Machine Learning & AI", credits: 4, faculty: "Prof. Rajesh Kumar", attendance: 91, grade: "In Progress" },
    { code: "CS603", name: "Network Security & Cryptography", credits: 3, faculty: "Dr. S. Meenakshi", attendance: 88, grade: "In Progress" },
    { code: "CS604", name: "Deep Learning Architectures", credits: 3, faculty: "Dr. K. Ramanathan", attendance: 96, grade: "In Progress" },
    { code: "CS605", name: "Full-Stack Web Engineering Lab", credits: 2, faculty: "Er. Vivek Sen", attendance: 95, grade: "In Progress" },
  ];

  const semesters = user?.semesters || [
    { semester: "Sem 1", sgpa: 8.70, cgpa: 8.70, credits: 20, status: "Passed" },
    { semester: "Sem 2", sgpa: 8.85, cgpa: 8.78, credits: 21, status: "Passed" },
    { semester: "Sem 3", sgpa: 8.90, cgpa: 8.82, credits: 24, status: "Passed" },
    { semester: "Sem 4", sgpa: 9.05, cgpa: 8.88, credits: 25, status: "Passed" },
    { semester: "Sem 5", sgpa: 9.12, cgpa: 8.92, credits: 24, status: "Passed" },
  ];

  const documents = [
    {
      id: "doc-1",
      title: "Semester 5 Official Grade Card",
      type: "Transcript",
      issueDate: "Jan 15, 2026",
      size: "245 KB",
      status: "Verified by Registrar",
    },
    {
      id: "doc-2",
      title: "Bonafide Student Certificate",
      type: "Certificate",
      issueDate: "Feb 02, 2026",
      size: "180 KB",
      status: "Valid for Academic Year",
    },
    {
      id: "doc-3",
      title: "End-Semester Examination Hall Ticket",
      type: "Exam Admit Card",
      issueDate: "Mar 10, 2026",
      size: "320 KB",
      status: "Admit Approved",
    },
    {
      id: "doc-4",
      title: "B.Tech Curriculum Syllabus & Regulations",
      type: "Syllabus",
      issueDate: "Aug 2024",
      size: "1.2 MB",
      status: "Official Syllabus",
    },
  ];

  const handleDownload = (doc) => {
    showToast(`Downloading "${doc.title}"...`, "info");
    setTimeout(() => {
      showToast(`"${doc.title}" downloaded successfully.`, "success");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Official Academic Records Office</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              Student Academic Information
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Curriculum enrollment, semester-wise SGPA records, subject attendance, and verified credentials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Official CGPA
                </span>
                <span className="text-lg font-extrabold text-emerald-600">
                  {user?.cgpa || "8.92"}
                </span>
              </div>
              <div className="h-7 w-px bg-slate-200" />
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Enrolled Term
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {user?.year} • {user?.section}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab("courses")}
            id="tab-btn-courses"
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "courses"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Enrolled Courses ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("grades")}
            id="tab-btn-grades"
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "grades"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Grade Reports & SGPA</span>
          </button>

          <button
            onClick={() => setActiveTab("attendance")}
            id="tab-btn-attendance"
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "attendance"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Attendance Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab("documents")}
            id="tab-btn-documents"
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "documents"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Document Vault ({documents.length})</span>
          </button>
        </div>

        {/* Tab 1: Enrolled Courses */}
        {activeTab === "courses" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                  Current Semester Course Curriculum
                </h2>
                <p className="text-xs text-slate-500">
                  Official course registrations approved by the departmental board.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 self-start sm:self-auto">
                Total Credits: 16
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Course Code</th>
                    <th className="py-3 px-4">Course Title</th>
                    <th className="py-3 px-4">Faculty In-Charge</th>
                    <th className="py-3 px-4 text-center">Credits</th>
                    <th className="py-3 px-4 text-center">Attendance</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses.map((course) => (
                    <tr key={course.code} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-indigo-600">
                        {course.code}
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-800">
                        {course.name}
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {course.faculty}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-slate-700">
                        {course.credits}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                            course.attendance >= 90
                              ? "bg-emerald-50 text-emerald-700"
                              : course.attendance >= 75
                              ? "bg-indigo-50 text-indigo-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {course.attendance}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {course.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Grades & SGPA */}
        {activeTab === "grades" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                  Semester-Wise Academic Progression
                </h2>
                <p className="text-xs text-slate-500">
                  Cumulative Grade Point Average (CGPA) calculated on 10.00 scale.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Current Cumulative GPA: {user?.cgpa || "8.92"}
                </span>
              </div>
            </div>

            {/* Visual Grade Progression Bars */}
            <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100/70 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                SGPA Performance Chart
              </h3>
              <div className="space-y-3">
                {semesters.map((s) => (
                  <div key={s.semester} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>{s.semester}</span>
                      <span className="font-extrabold text-indigo-700 font-mono">
                        SGPA: {s.sgpa.toFixed(2)} | CGPA: {s.cgpa.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-all duration-700"
                        style={{ width: `${(s.sgpa / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Academic Semester</th>
                    <th className="py-3 px-4 text-center">Semester Credits</th>
                    <th className="py-3 px-4 text-center">SGPA</th>
                    <th className="py-3 px-4 text-center">Cumulative CGPA</th>
                    <th className="py-3 px-4 text-right">Result Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {semesters.map((sem) => (
                    <tr key={sem.semester} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-800">{sem.semester}</td>
                      <td className="py-4 px-4 text-center font-semibold text-slate-600">
                        {sem.credits}
                      </td>
                      <td className="py-4 px-4 text-center font-extrabold text-indigo-600 font-mono">
                        {sem.sgpa.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-center font-extrabold text-emerald-600 font-mono">
                        {sem.cgpa.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {sem.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Attendance Breakdown */}
        {activeTab === "attendance" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                  Attendance Eligibility Matrix
                </h2>
                <p className="text-xs text-slate-500">
                  Minimum 75% overall lecture attendance required for university examination clearance.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Eligible for Final Examinations</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((c) => {
                const isWarning = c.attendance < 75;
                return (
                  <div
                    key={c.code}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-mono font-bold text-indigo-600">
                          {c.code}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800">{c.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{c.faculty}</p>
                      </div>
                      <span
                        className={`text-sm font-extrabold px-2.5 py-0.5 rounded-lg ${
                          c.attendance >= 90
                            ? "bg-emerald-100 text-emerald-800"
                            : c.attendance >= 75
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {c.attendance}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          c.attendance >= 90
                            ? "bg-emerald-500"
                            : c.attendance >= 75
                            ? "bg-indigo-500"
                            : "bg-rose-500"
                        }`}
                        style={{ width: `${c.attendance}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Threshold: 75%</span>
                      <span className="font-semibold text-slate-600">
                        {isWarning ? "Shortage Warning" : "Satisfactory"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Document Vault */}
        {activeTab === "documents" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                  Official University Document Vault
                </h2>
                <p className="text-xs text-slate-500">
                  Digitally certified records stamped by the Office of the Registrar.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{doc.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Issued: {doc.issueDate} • {doc.size}
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {doc.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                    <button
                      type="button"
                      onClick={() => setPreviewDoc(doc)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(doc)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      <Modal
        isOpen={Boolean(previewDoc)}
        onClose={() => setPreviewDoc(null)}
        title={previewDoc?.title || "Document Preview"}
        maxWidth="max-w-lg"
      >
        {previewDoc && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">{previewDoc.title}</h4>
              <p className="text-xs text-slate-500">
                Official Document Type: <strong className="text-slate-700">{previewDoc.type}</strong>
              </p>
              <div className="text-[11px] text-slate-400 font-mono">
                Student: {user?.studentName} ({user?.registerNumber})
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Digitally Verified by University Registrar</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownload(previewDoc);
                  setPreviewDoc(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Certified PDF</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ShieldCheck, Mail, Phone, MapPin, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & mission */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                EduSphere<span className="text-indigo-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An intelligent, responsive academic portal empowering students to seamlessly track their curriculum, grades, attendance, and administrative records.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 27001 Certified Student Data Security</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Portal Access
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-indigo-400 transition-colors">
                  New Student Registration
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-indigo-400 transition-colors">
                  Academic Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Student Services
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Semester Course Registrations</li>
              <li>Grade Reports & CGPA Calculation</li>
              <li>Online Transcript Requests</li>
              <li>Bonafide & Character Certificates</li>
              <li>Faculty Mentorship System</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Helpdesk & Support
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>support@edusphere.ai</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>+1 (800) 555-EDUS / +91 80 4000 8000</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>University Information Centre, Campus Admin Block</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} EduSphereAI Student Portal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Safeguards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

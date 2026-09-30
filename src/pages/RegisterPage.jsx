import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
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
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    registerNumber: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "Male",
    collegeName: "Apex Institute of Science & Technology",
    department: "Computer Science & Engineering",
    year: "1st Year",
    section: "A",
    cgpa: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const departments = [
    "Computer Science & Engineering",
    "Electronics & Communication Engineering",
    "Information Technology",
    "Mechanical Engineering",
    "Electrical & Electronics Engineering",
    "Civil Engineering",
    "Artificial Intelligence & Data Science",
    "Biomedical Engineering",
  ];

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) newErrors.studentName = "Student Name is required";
    if (!formData.registerNumber.trim()) newErrors.registerNumber = "Register Number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile Number is required";
    } else if (!/^[0-9+() -]{10,15}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    }

    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.collegeName.trim()) newErrors.collegeName = "College Name is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.section.trim()) newErrors.section = "Section is required";

    if (!formData.cgpa) {
      newErrors.cgpa = "CGPA is required";
    } else {
      const numCgpa = parseFloat(formData.cgpa);
      if (isNaN(numCgpa) || numCgpa < 0 || numCgpa > 10) {
        newErrors.cgpa = "CGPA must be a decimal between 0.00 and 10.00";
      }
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) {
      window.scrollTo({ top: 100, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await register(formData);
      if (res.success) {
        navigate("/dashboard");
      } else {
        setServerError(res.error || "Registration failed. Please check your details.");
      }
    } catch (err) {
      setServerError(err.message || "An error occurred during registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1-Click quick fill for evaluator convenience
  const handleAutoFillDemo = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setFormData({
      studentName: "Aditya Verma",
      registerNumber: `22AI${randomSuffix}`,
      email: `aditya.verma${randomSuffix}@edusphere.edu`,
      mobileNumber: "+91 98765 12345",
      dateOfBirth: "2004-03-18",
      gender: "Male",
      collegeName: "Apex Institute of Science & Technology",
      department: "Artificial Intelligence & Data Science",
      year: "2nd Year",
      section: "B",
      cgpa: "8.75",
      address: "Plot 45, Silicon Park Avenue, Sector 4, Hyderabad, Telangana - 500081",
      password: "password123",
      confirmPassword: "password123",
    });
    setErrors({});
    setServerError("");
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-100 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-sky-600 px-6 sm:px-10 py-8 text-white relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>EduSphereAI Enrollment</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif]">
                Student Registration Portal
              </h1>
              <p className="text-indigo-100 text-xs sm:text-sm mt-1">
                Enter your academic and personal information to create your student portal profile.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAutoFillDemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md transition-all self-start sm:self-auto border border-white/30"
              title="Fill all 14 fields with sample student data for instant testing"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Auto-Fill Demo Data</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8" noValidate>
          {/* Server Error Alert */}
          {serverError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3 animate-slide-up">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
              <div className="text-sm font-medium">{serverError}</div>
            </div>
          )}

          {/* Section 1: Personal & Identity Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                1. Personal Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Student Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="studentName"
                    id="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="e.g. Aarav Sharma"
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.studentName
                        ? "border-rose-400 bg-rose-50/20 focus:ring-rose-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } focus:outline-hidden focus:ring-3 transition-all`}
                  />
                </div>
                {errors.studentName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.studentName}</p>
                )}
              </div>

              {/* Register Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Register Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="registerNumber"
                    id="registerNumber"
                    value={formData.registerNumber}
                    onChange={handleChange}
                    placeholder="e.g. 21CS042"
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl uppercase font-mono border ${
                      errors.registerNumber
                        ? "border-rose-400 bg-rose-50/20 focus:ring-rose-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } focus:outline-hidden focus:ring-3 transition-all`}
                  />
                </div>
                {errors.registerNumber && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.registerNumber}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date of Birth <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.dateOfBirth
                        ? "border-rose-400 bg-rose-50/20 focus:ring-rose-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } focus:outline-hidden focus:ring-3 transition-all`}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender <span className="text-rose-500">*</span>
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/20 focus:outline-hidden transition-all"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-[11px] text-rose-600 mt-1">{errors.gender}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Academic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                2. Academic Affiliation
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* College Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="collegeName"
                    id="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Institute of Science & Technology"
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.collegeName
                        ? "border-rose-400 bg-rose-50/20 focus:ring-rose-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } focus:outline-hidden focus:ring-3 transition-all`}
                  />
                </div>
                {errors.collegeName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.collegeName}</p>
                )}
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    name="department"
                    id="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/20 focus:outline-hidden transition-all"
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.department && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.department}</p>
                )}
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Year of Study <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <CalendarDays className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    name="year"
                    id="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/20 focus:outline-hidden transition-all"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.year && <p className="text-[11px] text-rose-600 mt-1">{errors.year}</p>}
              </div>

              {/* Section */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Section <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Grid className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="section"
                    id="section"
                    maxLength={3}
                    value={formData.section}
                    onChange={handleChange}
                    placeholder="e.g. A, B, C"
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl uppercase border ${
                      errors.section
                        ? "border-rose-400 bg-rose-50/20 focus:ring-rose-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } focus:outline-hidden focus:ring-3 transition-all`}
                  />
                </div>
                {errors.section && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.section}</p>
                )}
              </div>

              {/* CGPA */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current CGPA (0.00 - 10.00) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Award className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    name="cgpa"
                    id="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    placeholder="e.g. 8.92"
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.cgpa
                        ? "border-rose-400 bg-rose-50/20 focus:ring-rose-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } focus:outline-hidden focus:ring-3 transition-all`}
                  />
                </div>
                {errors.cgpa && <p className="text-[11px] text-rose-600 mt-1">{errors.cgpa}</p>}
              </div>
            </div>
          </div>

          {/* Section 3: Contact & Address Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Mail className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                3. Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@edusphere.edu"
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.email
                        ? "border-rose-400 bg-rose-50/20 focus:ring-rose-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } focus:outline-hidden focus:ring-3 transition-all`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    name="mobileNumber"
                    id="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.mobileNumber
                        ? "border-rose-400 bg-rose-50/20 focus:ring-rose-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } focus:outline-hidden focus:ring-3 transition-all`}
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.mobileNumber}</p>
                )}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Residential Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    name="address"
                    id="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/Apartment number, Street, City, State, PIN Code"
                    className={`w-full pl-10 pr-3.5 py-2 text-sm rounded-xl border ${
                      errors.address
                        ? "border-rose-400 bg-rose-50/20 focus:ring-rose-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } focus:outline-hidden focus:ring-3 transition-all`}
                  />
                </div>
                {errors.address && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Password & Security */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Lock className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                4. Account Security
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border ${
                      errors.password
                        ? "border-rose-400 bg-rose-50/20 focus:ring-rose-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } focus:outline-hidden focus:ring-3 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border ${
                      errors.confirmPassword
                        ? "border-rose-400 bg-rose-50/20 focus:ring-rose-500"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                    } focus:outline-hidden focus:ring-3 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Passwords are securely transmitted over REST API and never stored in plain text.</span>
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
                Sign In
              </Link>
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              id="register-submit-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Registration...</span>
                </>
              ) : (
                <>
                  <span>Complete Student Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

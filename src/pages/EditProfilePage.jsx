import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { studentService } from "../services/studentService";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {
  User,
  Phone,
  MapPin,
  Lock,
  Camera,
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  Loader2,
  Sparkles,
} from "lucide-react";

export const EditProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobileNumber: "",
    address: "",
    bio: "",
    avatar: "",
    bloodGroup: "O+",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const sampleAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    `https://api.dicebear.com/7.x/initials/svg?seed=${user?.studentName || "Student"}`,
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        mobileNumber: user.mobileNumber || "",
        address: user.address || "",
        bio: user.bio || "",
        avatar: user.avatar || sampleAvatars[0],
        bloodGroup: user.bloodGroup || "O+",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleAvatarSelect = (url) => {
    setFormData((prev) => ({ ...prev, avatar: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.mobileNumber.trim()) {
      setError("Mobile Number cannot be blank.");
      return;
    }
    if (!formData.address.trim()) {
      setError("Address cannot be blank.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await studentService.updateProfile(formData);
      if (res.success && res.student) {
        updateUser(res.student);
        showToast("Profile details updated successfully!", "success");
        navigate("/profile");
      } else {
        setError(res.error || "Failed to update profile.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while saving profile changes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading student record..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/profile"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile</span>
          </Link>
          <span className="text-xs text-slate-400 font-mono">Reg: {user.registerNumber}</span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              Edit Student Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Update your contact coordinates, residential address, profile photo, and academic bio.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-2.5 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Profile Avatar
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative group">
                  <img
                    src={formData.avatar}
                    alt={user.studentName}
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-100 shadow-md"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-slate-900/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <p className="text-xs text-slate-500">
                    Select a preset avatar or enter a custom image URL:
                  </p>
                  <div className="flex items-center gap-2">
                    {sampleAvatars.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAvatarSelect(url)}
                        className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-transform hover:scale-105 ${
                          formData.avatar === url
                            ? "border-indigo-600 ring-2 ring-indigo-500/30"
                            : "border-slate-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
                Editable Student Coordinates
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      id="edit-mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/20 focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    id="edit-bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/20 focus:outline-hidden transition-all"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
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
                      id="edit-address"
                      rows={2}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street, City, State, PIN"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/20 focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Personal Statement / Bio
                  </label>
                  <textarea
                    name="bio"
                    id="edit-bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Briefly describe your academic interests, focus areas, and goals..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/20 focus:outline-hidden transition-all"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    This appears on your digital student profile dossier.
                  </p>
                </div>
              </div>
            </div>

            {/* Locked Official Records (Registrar Controlled) */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Official Institutional Fields (Read-Only)
                  </h3>
                </div>
                <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Locked by Registrar
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  To change official registrar records such as your Legal Name, Register Number, Department, Year, Section, or CGPA, please submit an official amendment application to the University Examination Cell.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Student Name
                  </span>
                  <span className="text-xs font-bold text-slate-700">{user.studentName}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Register Number
                  </span>
                  <span className="text-xs font-bold font-mono text-slate-700">
                    {user.registerNumber}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Department
                  </span>
                  <span className="text-xs font-bold text-slate-700 truncate block">
                    {user.department}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Year & Section
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    {user.year} • Sec {user.section}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Official CGPA
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600">{user.cgpa}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Registered Email
                  </span>
                  <span className="text-xs font-bold text-slate-700 truncate block">
                    {user.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
              <Link
                to="/profile"
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                id="save-profile-btn"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

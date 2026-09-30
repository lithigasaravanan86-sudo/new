import axios from "axios";
import { INITIAL_STUDENTS, MOCK_CREDENTIALS, generateMockJwt } from "./mockData";

// Retrieve or initialize the in-memory mock students store in sessionStorage/memory
const getMockStudents = () => {
  const saved = sessionStorage.getItem("edusphere_mock_db");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_STUDENTS;
    }
  }
  sessionStorage.setItem("edusphere_mock_db", JSON.stringify(INITIAL_STUDENTS));
  return INITIAL_STUDENTS;
};

const saveMockStudents = (students) => {
  sessionStorage.setItem("edusphere_mock_db", JSON.stringify(students));
};

const getMockCredentials = () => {
  const saved = sessionStorage.getItem("edusphere_mock_creds");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return MOCK_CREDENTIALS;
    }
  }
  sessionStorage.setItem("edusphere_mock_creds", JSON.stringify(MOCK_CREDENTIALS));
  return MOCK_CREDENTIALS;
};

const saveMockCredentials = (creds) => {
  sessionStorage.setItem("edusphere_mock_creds", JSON.stringify(creds));
};

// Base Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("edusphere_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error normalization
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on unauthorized
      localStorage.removeItem("edusphere_token");
    }
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred. Please try again.";
    return Promise.reject(new Error(message));
  }
);

/**
 * Intelligent Mock Handler:
 * When no remote backend server is running (e.g. standard frontend dev),
 * this mock layer handles authentication, registration, profile updates,
 * and dashboard data without needing external servers.
 * It simulates realistic network delay (300-600ms).
 */
export const mockApiHandler = async (endpoint, options = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 400)); // simulate network latency
  const students = getMockStudents();
  const creds = getMockCredentials();

  // 1. POST /api/auth/login
  if (endpoint === "/auth/login") {
    const { identifier, password } = options.body || {};
    if (!identifier || !password) {
      throw new Error("Please provide your Email/Register Number and Password.");
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const credMatch = creds.find(
      (c) =>
        c.identifier.toLowerCase() === cleanIdentifier ||
        c.email.toLowerCase() === cleanIdentifier
    );

    if (!credMatch || credMatch.passwordHash !== password) {
      throw new Error("Invalid credentials. Please verify your Email/Register Number and Password.");
    }

    const student = students.find((s) => s.id === credMatch.studentId);
    if (!student) {
      throw new Error("Student profile not found for this account.");
    }

    const token = generateMockJwt(student);
    return {
      success: true,
      token,
      student,
      message: "Login successful. Welcome back!",
    };
  }

  // 2. POST /api/auth/register
  if (endpoint === "/auth/register") {
    const data = options.body || {};
    const {
      studentName,
      registerNumber,
      email,
      mobileNumber,
      dateOfBirth,
      gender,
      collegeName,
      department,
      year,
      section,
      cgpa,
      address,
      password,
      confirmPassword,
    } = data;

    // Validate required fields
    if (
      !studentName ||
      !registerNumber ||
      !email ||
      !mobileNumber ||
      !dateOfBirth ||
      !gender ||
      !collegeName ||
      !department ||
      !year ||
      !section ||
      !cgpa ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      throw new Error("All registration fields are required.");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    const cleanRegNo = registerNumber.trim().toUpperCase();
    const cleanEmail = email.trim().toLowerCase();

    // Check duplicate
    if (creds.some((c) => c.identifier.toUpperCase() === cleanRegNo)) {
      throw new Error(`Register Number "${cleanRegNo}" is already registered.`);
    }
    if (creds.some((c) => c.email.toLowerCase() === cleanEmail)) {
      throw new Error(`Email address "${cleanEmail}" is already registered.`);
    }

    // Create student profile
    const newStudentId = `stu-${Date.now().toString().slice(-4)}`;
    const newStudent = {
      id: newStudentId,
      studentName: studentName.trim(),
      registerNumber: cleanRegNo,
      email: cleanEmail,
      mobileNumber: mobileNumber.trim(),
      dateOfBirth,
      gender,
      collegeName: collegeName.trim(),
      department,
      year,
      section: section.trim().toUpperCase(),
      cgpa: parseFloat(cgpa).toFixed(2),
      address: address.trim(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(studentName)}`,
      bio: `Enthusiastic ${department} student at ${collegeName}.`,
      mentorName: "Department Academic Advisor",
      mentorEmail: "advisor@edusphere.edu",
      admissionDate: new Date().toISOString().split("T")[0],
      academicStatus: "Active Student",
      profileCompletedPercentage: 85,
      attendanceOverall: 88,
      creditsEarned: 60,
      totalCredits: 160,
      currentSemester: `${year} - Regular`,
      activities: [
        {
          id: `act-${Date.now()}-1`,
          title: "Account Created & Registered",
          description: "Student portal account successfully activated.",
          timestamp: "Just now",
          category: "Account",
          badgeColor: "emerald",
        },
        {
          id: `act-${Date.now()}-2`,
          title: "Profile Initialized",
          description: `Registered under ${department}, Section ${section}.`,
          timestamp: "Just now",
          category: "Academics",
          badgeColor: "indigo",
        },
      ],
      semesters: [
        { semester: "Sem 1", sgpa: parseFloat(cgpa), cgpa: parseFloat(cgpa), credits: 22, status: "Passed" },
      ],
      courses: [
        { code: "ENG101", name: "Core Department Foundation", credits: 4, faculty: "Prof. Senior Faculty", attendance: 90, grade: "Registered" },
        { code: "LAB102", name: "Practical Lab & Systems", credits: 2, faculty: "Lab Instructor", attendance: 88, grade: "Registered" }
      ],
    };

    // Save credentials safely without returning plain password
    creds.push({
      identifier: cleanRegNo,
      email: cleanEmail,
      passwordHash: password, // Note: Mock credentials store
      studentId: newStudentId,
    });
    saveMockCredentials(creds);

    students.push(newStudent);
    saveMockStudents(students);

    const token = generateMockJwt(newStudent);
    return {
      success: true,
      token,
      student: newStudent,
      message: "Registration successful! Welcome to EduSphereAI.",
    };
  }

  // 3. POST /api/auth/forgot-password
  if (endpoint === "/auth/forgot-password") {
    const { email } = options.body || {};
    if (!email) {
      throw new Error("Please enter your registered email address.");
    }
    const exists = creds.some((c) => c.email.toLowerCase() === email.trim().toLowerCase());
    if (!exists) {
      throw new Error("No student account found with this email address.");
    }
    return {
      success: true,
      message: `Password reset instructions have been sent to ${email}.`,
    };
  }

  // 4. GET /api/auth/me
  if (endpoint === "/auth/me") {
    const token = localStorage.getItem("edusphere_token");
    if (!token) throw new Error("No authentication token provided.");
    try {
      const parts = token.split(".");
      if (parts.length < 2) throw new Error("Invalid token format.");
      const payload = JSON.parse(atob(parts[1]));
      const student = students.find((s) => s.id === payload.sub);
      if (!student) throw new Error("Student record no longer exists.");
      return { success: true, student };
    } catch {
      throw new Error("Session expired. Please log in again.");
    }
  }

  // 5. PUT /api/student/profile
  if (endpoint === "/student/profile") {
    const updateData = options.body || {};
    const token = localStorage.getItem("edusphere_token");
    if (!token) throw new Error("Unauthorized");
    const payload = JSON.parse(atob(token.split(".")[1]));
    const index = students.findIndex((s) => s.id === payload.sub);
    if (index === -1) throw new Error("Student not found.");

    // Protected fields cannot be changed directly by student (Registrar controls)
    const allowedUpdates = {
      mobileNumber: updateData.mobileNumber || students[index].mobileNumber,
      address: updateData.address || students[index].address,
      bio: updateData.bio !== undefined ? updateData.bio : students[index].bio,
      avatar: updateData.avatar || students[index].avatar,
      bloodGroup: updateData.bloodGroup || students[index].bloodGroup,
    };

    // Calculate updated completion percentage
    let completedFields = 10;
    if (allowedUpdates.bio && allowedUpdates.bio.length > 10) completedFields += 1;
    if (allowedUpdates.avatar) completedFields += 1;
    if (allowedUpdates.bloodGroup) completedFields += 1;
    const profileCompletedPercentage = Math.min(100, Math.round((completedFields / 13) * 100));

    const updatedStudent = {
      ...students[index],
      ...allowedUpdates,
      profileCompletedPercentage,
    };

    // Append activity
    updatedStudent.activities.unshift({
      id: `act-${Date.now()}`,
      title: "Profile Updated",
      description: "Contact information and bio updated successfully.",
      timestamp: "Just now",
      category: "Profile",
      badgeColor: "blue",
    });

    students[index] = updatedStudent;
    saveMockStudents(students);

    return {
      success: true,
      student: updatedStudent,
      message: "Profile updated successfully.",
    };
  }

  // 6. GET /api/student/dashboard
  if (endpoint === "/student/dashboard") {
    const token = localStorage.getItem("edusphere_token");
    if (!token) throw new Error("Unauthorized");
    const payload = JSON.parse(atob(token.split(".")[1]));
    const student = students.find((s) => s.id === payload.sub);
    if (!student) throw new Error("Student not found.");
    return {
      success: true,
      data: student,
    };
  }

  // Default fallback
  throw new Error(`Endpoint ${endpoint} not recognized.`);
};

export default api;

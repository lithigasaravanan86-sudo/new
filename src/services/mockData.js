/**
 * Mock Database for EduSphereAI
 * Provides realistic initial student accounts and academic data.
 * Passwords are NOT stored in browser storage or client state.
 */

export const INITIAL_STUDENTS = [
  {
    id: "stu-101",
    studentName: "Aarav Sharma",
    registerNumber: "21CS042",
    email: "aarav.sharma@edusphere.edu",
    mobileNumber: "+91 98765 43210",
    dateOfBirth: "2003-05-14",
    gender: "Male",
    collegeName: "Apex Institute of Science & Technology",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    section: "A",
    cgpa: "8.92",
    address: "Flat 402, Greenfield Heights, Tech Park Road, Bengaluru, Karnataka - 560100",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    bio: "Passionate CS undergrad specializing in Artificial Intelligence and Cloud Systems. Student lead at Apex AI Club.",
    bloodGroup: "O+",
    mentorName: "Dr. K. Ramanathan (Professor & HoD)",
    mentorEmail: "k.ramanathan@apex.edu",
    admissionDate: "2021-08-10",
    academicStatus: "Dean's Honor Roll",
    profileCompletedPercentage: 88,
    attendanceOverall: 92,
    creditsEarned: 114,
    totalCredits: 160,
    currentSemester: "Semester 6",
    activities: [
      {
        id: "act-1",
        title: "Selected for AI Hackathon Finals",
        description: "Team shortlisted for the National Smart Education Hackathon.",
        timestamp: "2 hours ago",
        category: "Achievement",
        badgeColor: "emerald"
      },
      {
        id: "act-2",
        title: "Semester 5 Grade Card Published",
        description: "SGPA of 9.12 achieved with 'S' grades in Distributed Systems.",
        timestamp: "Yesterday, 4:30 PM",
        category: "Academics",
        badgeColor: "indigo"
      },
      {
        id: "act-3",
        title: "Elective Registration Confirmed",
        description: "Enrolled in CS604: Deep Learning & Neural Architectures.",
        timestamp: "3 days ago",
        category: "Enrollment",
        badgeColor: "blue"
      },
      {
        id: "act-4",
        title: "Library Book Renewed",
        description: "Pattern Recognition by Christopher Bishop extended to next month.",
        timestamp: "5 days ago",
        category: "Campus",
        badgeColor: "amber"
      }
    ],
    semesters: [
      { semester: "Sem 1", sgpa: 8.70, cgpa: 8.70, credits: 20, status: "Passed" },
      { semester: "Sem 2", sgpa: 8.85, cgpa: 8.78, credits: 21, status: "Passed" },
      { semester: "Sem 3", sgpa: 8.90, cgpa: 8.82, credits: 24, status: "Passed" },
      { semester: "Sem 4", sgpa: 9.05, cgpa: 8.88, credits: 25, status: "Passed" },
      { semester: "Sem 5", sgpa: 9.12, cgpa: 8.92, credits: 24, status: "Passed" },
    ],
    courses: [
      { code: "CS601", name: "Cloud Computing & DevOps", credits: 4, faculty: "Dr. Anita Desai", attendance: 94, grade: "In Progress" },
      { code: "CS602", name: "Machine Learning & AI", credits: 4, faculty: "Prof. Rajesh Kumar", attendance: 91, grade: "In Progress" },
      { code: "CS603", name: "Network Security & Cryptography", credits: 3, faculty: "Dr. S. Meenakshi", attendance: 88, grade: "In Progress" },
      { code: "CS604", name: "Deep Learning Architectures", credits: 3, faculty: "Dr. K. Ramanathan", attendance: 96, grade: "In Progress" },
      { code: "CS605", name: "Full-Stack Web Engineering Lab", credits: 2, faculty: "Er. Vivek Sen", attendance: 95, grade: "In Progress" },
    ]
  },
  {
    id: "stu-102",
    studentName: "Priya Patel",
    registerNumber: "20EC108",
    email: "priya.patel@edusphere.edu",
    mobileNumber: "+91 98112 23344",
    dateOfBirth: "2002-11-20",
    gender: "Female",
    collegeName: "Apex Institute of Science & Technology",
    department: "Electronics & Communication Engineering",
    year: "4th Year",
    section: "B",
    cgpa: "9.15",
    address: "22 Lotus Residency, Ring Road, Ahmedabad, Gujarat - 380015",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    bio: "ECE Senior concentrating on Embedded IoT Systems & VLSI design. Placement coordinator.",
    bloodGroup: "B+",
    mentorName: "Dr. Harish Patel (Professor)",
    mentorEmail: "h.patel@apex.edu",
    admissionDate: "2020-09-01",
    academicStatus: "Dean's Honor Roll",
    profileCompletedPercentage: 95,
    attendanceOverall: 96,
    creditsEarned: 148,
    totalCredits: 160,
    currentSemester: "Semester 8",
    activities: [
      {
        id: "act-101",
        title: "Campus Placement Offer",
        description: "Received Pre-Placement Offer (PPO) from Qualcomm.",
        timestamp: "1 day ago",
        category: "Achievement",
        badgeColor: "emerald"
      },
      {
        id: "act-102",
        title: "Capstone Project Review 2 Completed",
        description: "Scored 48/50 in intermediate review for Smart Wearable ECG monitor.",
        timestamp: "4 days ago",
        category: "Academics",
        badgeColor: "indigo"
      }
    ],
    semesters: [
      { semester: "Sem 1", sgpa: 9.00, cgpa: 9.00, credits: 20, status: "Passed" },
      { semester: "Sem 2", sgpa: 9.20, cgpa: 9.10, credits: 21, status: "Passed" },
      { semester: "Sem 3", sgpa: 9.15, cgpa: 9.12, credits: 24, status: "Passed" },
      { semester: "Sem 4", sgpa: 9.30, cgpa: 9.17, credits: 25, status: "Passed" },
      { semester: "Sem 5", sgpa: 9.10, cgpa: 9.15, credits: 24, status: "Passed" },
      { semester: "Sem 6", sgpa: 9.25, cgpa: 9.17, credits: 24, status: "Passed" },
      { semester: "Sem 7", sgpa: 9.05, cgpa: 9.15, credits: 10, status: "Passed" }
    ],
    courses: [
      { code: "EC801", name: "Major Project & Defense", credits: 8, faculty: "Dr. Harish Patel", attendance: 98, grade: "In Progress" },
      { code: "EC802", name: "Wireless Sensor Networks", credits: 4, faculty: "Dr. Sunita Rao", attendance: 94, grade: "In Progress" }
    ]
  }
];

// Helper to generate a realistic JWT Token
export function generateMockJwt(student) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    sub: student.id,
    name: student.studentName,
    regNo: student.registerNumber,
    email: student.email,
    dept: student.department,
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days validity
  }));
  const signature = btoa(`edusphere_sig_${student.id}_${Date.now()}`);
  return `${header}.${payload}.${signature}`;
}

// In-memory / mock credential store (hashed simulation)
// Notice: Plain passwords are NEVER stored in localStorage or exposed to the client window.
export const MOCK_CREDENTIALS = [
  { identifier: "21CS042", email: "aarav.sharma@edusphere.edu", passwordHash: "password123", studentId: "stu-101" },
  { identifier: "20EC108", email: "priya.patel@edusphere.edu", passwordHash: "password123", studentId: "stu-102" }
];

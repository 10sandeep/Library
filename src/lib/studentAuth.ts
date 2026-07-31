export interface Student {
  rollNo: string;
  name: string;
  className: string;
  section: string;
  password: string;
}

export const DEMO_STUDENTS: Student[] = [
  { rollNo: "2025001", name: "Rahul Kumar",    className: "10", section: "A", password: "1234" },
  { rollNo: "2025002", name: "Priya Sharma",   className: "10", section: "B", password: "1234" },
  { rollNo: "2025003", name: "Amit Singh",     className: "12", section: "A", password: "1234" },
  { rollNo: "2025004", name: "Sneha Patel",    className: "12", section: "B", password: "1234" },
  { rollNo: "2025005", name: "Vikram Reddy",   className: "9",  section: "A", password: "1234" },
  { rollNo: "2025006", name: "Ananya Das",     className: "9",  section: "C", password: "1234" },
  { rollNo: "2025007", name: "Rohan Mehta",    className: "11", section: "A", password: "1234" },
  { rollNo: "2025008", name: "Divya Nair",     className: "11", section: "B", password: "1234" },
];

const SESSION_KEY = "ndlp_student";

export function authenticateStudent(rollNo: string, password: string): Student | null {
  return DEMO_STUDENTS.find(
    s => s.rollNo === rollNo.trim() && s.password === password
  ) ?? null;
}

export function saveStudentSession(student: Student): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(student));
}

export function getStudentSession(): Student | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Student) : null;
  } catch {
    return null;
  }
}

export function clearStudentSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export const ADMIN_CREDENTIALS = { username: "admin", password: "admin123" };

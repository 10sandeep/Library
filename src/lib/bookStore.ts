export interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  className: string; // "1"–"12" or "All"
  description: string;
  uploadedAt: string;
  coverColor: string;
  totalPages: number;
}

const KEY = "ndlp_books";

const COLORS = ["#1a6ebb","#3aa04a","#730068","#fea500","#8224e3","#e53935","#00897b","#ff6600"];

export const DEMO_BOOKS: Book[] = [
  { id:"b1", title:"Mathematics Part I", author:"NCERT", subject:"Mathematics", className:"10", description:"Covers real numbers, polynomials, quadratic equations, arithmetic progressions and triangles.", uploadedAt:"2025-01-10", coverColor:"#1a6ebb", totalPages:262 },
  { id:"b2", title:"Science Textbook", author:"NCERT", subject:"Science", className:"10", description:"Physics, Chemistry and Biology for Class 10 students.", uploadedAt:"2025-01-10", coverColor:"#3aa04a", totalPages:294 },
  { id:"b3", title:"Social Science — India and the Contemporary World", author:"NCERT", subject:"Social Science", className:"10", description:"History, Civics, Geography and Economics for Class 10.", uploadedAt:"2025-01-11", coverColor:"#730068", totalPages:310 },
  { id:"b4", title:"English — First Flight", author:"NCERT", subject:"English", className:"10", description:"Prose and poetry textbook for Class 10 English.", uploadedAt:"2025-01-11", coverColor:"#fea500", totalPages:175 },
  { id:"b5", title:"Physics Part I", author:"NCERT", subject:"Physics", className:"12", description:"Electrostatics, current electricity, magnetic effects and electromagnetic induction.", uploadedAt:"2025-01-12", coverColor:"#e53935", totalPages:320 },
  { id:"b6", title:"Chemistry Part I", author:"NCERT", subject:"Chemistry", className:"12", description:"Solid state, solutions, electrochemistry, chemical kinetics and surface chemistry.", uploadedAt:"2025-01-12", coverColor:"#00897b", totalPages:288 },
  { id:"b7", title:"Biology", author:"NCERT", subject:"Biology", className:"12", description:"Reproduction, genetics, evolution, biotechnology, ecology for Class 12.", uploadedAt:"2025-01-13", coverColor:"#8224e3", totalPages:412 },
  { id:"b8", title:"Mathematics Part II", author:"NCERT", subject:"Mathematics", className:"12", description:"Integration, differential equations, vector algebra, 3D geometry and probability.", uploadedAt:"2025-01-13", coverColor:"#ff6600", totalPages:338 },
  { id:"b9", title:"Science Textbook", author:"NCERT", subject:"Science", className:"9", description:"Motion, force, gravitation, sound, matter and natural resources for Class 9.", uploadedAt:"2025-01-14", coverColor:"#3aa04a", totalPages:242 },
  { id:"b10", title:"Mathematics", author:"NCERT", subject:"Mathematics", className:"9", description:"Number systems, polynomials, lines & angles, triangles and statistics.", uploadedAt:"2025-01-14", coverColor:"#1a6ebb", totalPages:254 },
  { id:"b11", title:"Digital Literacy & Computer Science", author:"CBSE", subject:"Computer Science", className:"All", description:"Foundational computer science concepts applicable to all classes.", uploadedAt:"2025-01-15", coverColor:"#730068", totalPages:180 },
  { id:"b12", title:"General Knowledge 2025", author:"Arihant", subject:"General Knowledge", className:"All", description:"Current affairs, science, history and geography for all students.", uploadedAt:"2025-01-15", coverColor:"#fea500", totalPages:320 },
];

function getAll(): Book[] {
  if (typeof window === "undefined") return DEMO_BOOKS;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(DEMO_BOOKS));
      return DEMO_BOOKS;
    }
    return JSON.parse(raw) as Book[];
  } catch {
    return DEMO_BOOKS;
  }
}

function save(books: Book[]) {
  localStorage.setItem(KEY, JSON.stringify(books));
}

export function getBooks(): Book[] {
  return getAll();
}

export function getBooksForClass(className: string): Book[] {
  return getAll().filter(b => b.className === className || b.className === "All");
}

export function addBook(data: Omit<Book, "id" | "uploadedAt" | "coverColor">): Book {
  const books = getAll();
  const book: Book = {
    ...data,
    id: "b" + Date.now(),
    uploadedAt: new Date().toISOString().split("T")[0],
    coverColor: COLORS[books.length % COLORS.length],
  };
  books.unshift(book);
  save(books);
  return book;
}

export function deleteBook(id: string): void {
  save(getAll().filter(b => b.id !== id));
}

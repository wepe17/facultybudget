export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'DEAN' | 'FINANCE' | 'REVIEWER';
}

export interface Faculty {
  id: string;
  name: string;
  code: string;
  totalStudents: number;
  researchOutput: number;
  accreditation: 'A' | 'B' | 'C';
}

export interface BudgetScore {
  id: string;
  facultyId: string;
  year: number;
  studentScore: number;
  researchScore: number;
  accreditationScore: number;
  totalScore: number;
  allocatedBudget: number;
  status: 'DRAFT' | 'SUBMITTED' | 'REVIEWED' | 'APPROVED';
  comments?: string;
}
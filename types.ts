
export interface Tenant {
  id: number;
  name: string;
  age: number;
  monthlyIncome: number;
  creditScore: number;
  employmentHistory: string;
  rentalHistory: string;
  references: string;
}

export interface AnalysisResult {
  score: number;
  reasoning: string;
}

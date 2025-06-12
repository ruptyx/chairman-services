// types.ts
export interface OutstandingBalance {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  balance: number;
  sector: string;
}

export interface SOA {
  id: string;
  created_at: string;
  amount: number;
  year: number;
  month: number;
  type: 'aesthetic' | 'pharma';
}

export interface Statement {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  amount: number;
}

export type FilterPeriod = 'YTD' | 'MTD' | 'Total';
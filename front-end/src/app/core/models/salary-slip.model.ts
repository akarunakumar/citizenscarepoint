export interface SalarySlipRequest {
  name: string;
  month: string;
  basicPay: number;
  allowances: number;
  deductions: number;
}

export interface SalarySlip extends SalarySlipRequest {
  id: number;
  netPay: number;
  generatedAt: string;
}

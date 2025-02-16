export interface Transaction {
  _id: string;
  adminId: string;
  partnerId?: string | null;
  addedBy: "admin" | "partner";
  type: "GASTO" | "ENTRADA";
  category: string;
  amount: number;
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

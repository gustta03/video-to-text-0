export interface Customer {
  _id: string;
  name: string;
  email: string;
  password: string;
  whatsapp: string;
  partnerId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

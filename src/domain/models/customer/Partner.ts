export interface Partner {
    _id: string;
    adminId: string;
    name: string;
    whatsapp: string;
    status: "pendente" | "aceito" | "recusado";
    joinedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
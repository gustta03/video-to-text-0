import mongoose from 'mongoose'

const partnerSchema = new mongoose.Schema(
    {
      adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
      whatsapp: { type: String, required: true, unique: true },
      status: { type: String, enum: ["pendente", "aceito", "recusado"], default: "pendente" },
      joinedAt: { type: Date },
    },
    { timestamps: true }
  );
  
export default mongoose.model("Partner", partnerSchema);
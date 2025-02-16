import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner", default: null },
    addedBy: { type: String, enum: ["admin", "partner"], required: true },
    type: { type: String, enum: ["GASTO", "ENTRADA"], required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);

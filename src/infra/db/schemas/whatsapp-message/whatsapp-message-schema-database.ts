import mongoose from "mongoose";

const whatsappMessageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    receivedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("WhatsAppMessage", whatsappMessageSchema);

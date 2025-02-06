import mongoose, { Schema, Document } from "mongoose";

export interface ILoginLog extends Document {
  userEmail: string;
  role: string;
  timestamp: Date;
}

const LoginLogSchema: Schema = new Schema({
  userEmail: { type: String, required: true },
  role: { type: String, enum: ["CTO", "Tech-Lead"], required: true },
  timestamp: { type: Date, default: Date.now }
});

export const LoginLogModel = mongoose.model<ILoginLog>("LoginLog", LoginLogSchema);

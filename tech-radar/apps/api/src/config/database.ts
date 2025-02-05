import mongoose, { Schema } from "mongoose";
import logger from "../utils/logger";

const TechnologySchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: { type: String, required: true, enum: ["Techniques", "Platforms", "Tools", "Languages & Frameworks"] },
    maturity: { type: String, enum: ["Assess", "Trial", "Adopt", "Hold"], required: true },
    publishedAt: {type: Date, required: true}
  },
  {timestamps: true});

TechnologySchema.index({ name: 1, category: 1 }, { unique: true });

export const TechnologyModel = mongoose.model("Technology", TechnologySchema);

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/technologyRadar");
    logger.info("MongoDB connected successfully!");
  } catch (error) {
    logger.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

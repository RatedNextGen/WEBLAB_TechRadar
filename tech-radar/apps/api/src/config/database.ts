import mongoose, {Schema} from "mongoose";
import logger from "../utils/logger";
import {TechnologyCategory, TechnologyMaturity} from "../../../../shared/src/lib/models/technology.model";

const TechnologySchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    category: {type: String, required: true, enum: Object.values(TechnologyCategory)},
    maturity: {type: String, enum: Object.values(TechnologyMaturity), required: false},
    published: {type: Boolean, required: true, default: false},
    publishedAt: {type: Date, required: false}
  },
  {timestamps: true, strict: true});

TechnologySchema.index({name: 1, category: 1}, {unique: true});

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

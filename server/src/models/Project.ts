import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  github: string;
  live?: string;
  techStack: string[];
  category: string;
  featured: boolean;
  problem?: string;
  approach?: string;
  outcome?: string;
  features?: string[];
  screenshots?: string[];
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    github: { type: String, required: true, trim: true },
    live: { type: String, trim: true },
    techStack: { type: [String], required: true, default: [] },
    category: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: false },
    problem: { type: String, trim: true, default: "" },
    approach: { type: String, trim: true, default: "" },
    outcome: { type: String, trim: true, default: "" },
    features: { type: [String], default: [] },
    screenshots: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", projectSchema);

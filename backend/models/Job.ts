import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  createdAt: Date;
}

const JobSchema: Schema = new Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  experience: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  responsibilities: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);

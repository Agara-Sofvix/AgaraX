import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IApplication extends Document {
  name: string;
  email: string;
  roleTitle: string;
  experience: string;
  phone?: string;
  interviewDate?: Date;
  coverLetter?: string;
  status: 'New' | 'Interviewing' | 'Review' | 'Offer Sent' | 'Rejected';
  resume?: string; // Base64 or URL
  createdAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  roleTitle: { type: String, required: true },
  experience: { type: String, required: true },
  phone: { type: String },
  interviewDate: { type: Date },
  coverLetter: { type: String },
  status: { 
    type: String, 
    enum: ['New', 'Interviewing', 'Review', 'Offer Sent', 'Rejected'], 
    default: 'New' 
  },
  resume: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default models.Application || model<IApplication>('Application', ApplicationSchema);

import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved' | 'High Priority';
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['New', 'In Progress', 'Resolved', 'High Priority'], 
    default: 'New' 
  },
  createdAt: { type: Date, default: Date.now },
});

export default models.Inquiry || model<IInquiry>('Inquiry', InquirySchema);

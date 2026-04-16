import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, default: 5 },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

import mongoose from 'mongoose';

const CapabilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  features: [String],
  benefits: [String],
  whoNeeds: String,
  problemsSolved: [String],
  useCases: [String],
  outcomes: String,
  faqs: [{ q: String, a: String }],
  heroImage: String
});

const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, required: true },
  overview: String,
  approach: String,
  outcomes: [String],
  sortOrder: { type: Number, default: 0 },
  capabilities: [CapabilitySchema]
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);

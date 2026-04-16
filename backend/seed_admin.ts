import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Define the absolute path to the .env file in the backend directory
const envPath = '/home/agara/Applications/agara-next/backend/.env';
dotenv.config({ path: envPath });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agara-next';

async function seed() {
  try {
    console.log('Connecting to:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');
    
    // Define schema directly to avoid import issues
    const adminSchema = new mongoose.Schema({ email: String, password: String });
    const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
    
    const email = 'admin@agara.com';
    const password = 'admin123';
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await Admin.deleteMany({ email });
    await Admin.create({ email, password: hashedPassword });
    
    console.log('Admin user recreated successfully');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();

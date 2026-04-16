import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './lib/db';
import Inquiry from './models/Inquiry';
import Application from './models/Application';
import Job from './models/Job';
import Category from './models/Category';
import Testimonial from './models/Testimonial';
import { sendInterviewScheduledEmail, sendInquiryNotification } from './lib/emailService';
import Admin from './models/Admin';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { INITIAL_CATEGORIES, INITIAL_TESTIMONIALS } from './lib/initialData';

mongoose.set('debug', true);
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'AgaraX-secure-secret-2026';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Simple logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Health Check
app.get('/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      mongodb: dbStatus
    });
  } catch (error) {
    res.status(503).json({ status: 'DOWN', error });
  }
});

// Database Connection and Seeding
// MongoDB Connection with Retry
const connectWithRetry = async () => {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/AgaraX';
  console.log(`Attempting to connect to MongoDB at: ${MONGODB_URI.substring(0, 20)}...`);
  
  let attempts = 5;
  while (attempts > 0) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('Successfully connected to MongoDB');
      return;
    } catch (err) {
      console.log(`MongoDB connection failed. Retries left: ${attempts - 1}`);
      attempts -= 1;
      // Wait 5 seconds before retrying
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  console.error('Could not connect to MongoDB after multiple attempts. Exiting...');
  process.exit(1);
};

const startServer = async () => {
  try {
    await connectWithRetry();
    
    // Ensure default admin exists
    const adminEmail = 'admin@agara.com';
    const adminPassword = 'Azhaga1992in!';
    
    const adminUser = await Admin.findOne({ email: adminEmail });
    if (!adminUser) {
      await Admin.create({
        email: adminEmail,
        password: adminPassword
      });
      console.log('Default admin user created');
    } else {
      adminUser.password = adminPassword;
      await adminUser.save();
      console.log('Admin password updated');
    }

    // ALWAYS Sync Production Categories and Testimonials on startup to ensure "by default" availability
    try {
      console.log('Synchronizing production dataset...');
      
      // Sync Categories
      const categoryCount = await Category.countDocuments();
      if (categoryCount !== INITIAL_CATEGORIES.length) {
        await Category.deleteMany({});
        await Category.create(INITIAL_CATEGORIES);
        console.log(`Successfully forced sync of ${INITIAL_CATEGORIES.length} categories.`);
      } else {
        console.log('Production categories already in sync.');
      }

      // Testimonials are now purely dynamic and managed by the user in the admin panel.
      // Removed automatic seeding to prevent deleted reviews from re-appearing.

    } catch (seedError) {
      console.error('Seeding failure:', seedError);
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Health Check
app.get('/health', async (req, res) => {
  const categoryCount = await Category.countDocuments();
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    dataSync: {
      categories: categoryCount,
      expected: INITIAL_CATEGORIES.length,
      inSync: categoryCount === INITIAL_CATEGORIES.length
    }
  });
});

// Emergency Reset Data
app.get('/api/system/reset-data', async (req, res) => {
  try {
    await Category.deleteMany({});
    await Category.create(INITIAL_CATEGORIES);
    res.json({ message: 'Production data successfully reset and synchronized.', count: INITIAL_CATEGORIES.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset data', details: error });
  }
});

// Category API
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ sortOrder: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/categories/slug/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

app.post('/api/categories/:id/capabilities', async (req, res) => {
  try {
    const category = await Category.findOne({ 
      $or: [
        { _id: mongoose.isValidObjectId(req.params.id) ? req.params.id : null },
        { id: req.params.id },
        { slug: req.params.id }
      ]
    });
    
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const newCapability = {
      ...req.body,
      slug: req.body.name.toLowerCase().replace(/\s+/g, '-'),
      icon: req.body.icon || 'Zap'
    };

    category.capabilities.push(newCapability);
    await category.save();
    
    res.status(201).json(newCapability);
  } catch (error: any) {
    console.error('Error adding capability:', error);
    res.status(400).json({ error: 'Failed to add capability', details: error.message });
  }
});
app.put('/api/categories/:id/capabilities/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ 
      $or: [
        { _id: mongoose.isValidObjectId(req.params.id) ? req.params.id : null },
        { id: req.params.id },
        { slug: req.params.id }
      ]
    });
    
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const capabilityIndex = category.capabilities.findIndex((cap: any) => cap.slug === req.params.slug);
    if (capabilityIndex === -1) return res.status(404).json({ error: 'Capability not found' });

    // Update capability fields
    const updatedCap = {
      ...category.capabilities[capabilityIndex].toObject(),
      ...req.body,
      // Ensure slug stays consistent unless explicitly changed
      slug: req.body.slug || category.capabilities[capabilityIndex].slug
    };

    category.capabilities[capabilityIndex] = updatedCap;
    await category.save();
    
    res.json(updatedCap);
  } catch (error: any) {
    console.error('Error updating capability:', error);
    res.status(400).json({ error: 'Failed to update capability', details: error.message });
  }
});

app.delete('/api/categories/:id/capabilities/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ 
      $or: [
        { _id: mongoose.isValidObjectId(req.params.id) ? req.params.id : null },
        { id: req.params.id },
        { slug: req.params.id }
      ]
    });
    
    if (!category) return res.status(404).json({ error: 'Category not found' });

    category.capabilities = category.capabilities.filter((cap: any) => cap.slug !== req.params.slug);
    await category.save();
    
    res.json({ message: 'Capability deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to delete capability' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.body.name.toLowerCase().replace(/\s+/g, '-'),
      slug: req.body.name.toLowerCase().replace(/\s+/g, '-')
    };
    const category = await Category.create(data);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create category' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update category' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete category' });
  }
});

// Inquiries API
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    console.log('Received inquiry request:', req.body.email);
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    console.log('Inquiry saved successfully');
    
    // Attempt email notification
    try {
      if (process.env.EMAIL_USER) {
        await sendInquiryNotification(req.body);
        console.log('Email notification sent');
      }
    } catch (emailErr) {
      console.error('Email notification failed but inquiry was saved:', emailErr);
    }

    res.status(201).json(inquiry);
  } catch (error) {
    console.error('Failed to save inquiry:', error);
    res.status(400).json({ error: 'Failed to create inquiry', details: error });
  }
});

app.put('/api/inquiries/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' });
    res.json(inquiry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update inquiry' });
  }
});

app.delete('/api/inquiries/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' });
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete inquiry' });
  }
});

// Applications API
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find({}).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
    const { name, email, roleTitle, experience, phone, coverLetter, resume } = req.body;
    const application = await Application.create({
      name,
      email,
      roleTitle,
      experience,
      phone,
      coverLetter,
      resume
    });
    res.status(201).json(application);
  } catch (error: any) {
    console.error('Error creating application:', error);
    res.status(400).json({ error: error.message || 'Failed to create application' });
  }
});

app.put('/api/applications/:id', async (req, res) => {
  try {
    const { status, triggerEmail, interviewDate } = req.body;
    
    console.log(`\n--- Application Update Attempt [ID: ${req.params.id}] ---`);
    console.log(`Received Body:`, JSON.stringify(req.body, null, 2));

    const oldApplication = await Application.findById(req.params.id);
    if (!oldApplication) {
      console.error(`[Error] Application not found during initial lookup`);
      return res.status(404).json({ error: 'Application not found' });
    }
    
    console.log(`Current Status: ${oldApplication.status}, Target Status: ${status}`);
    console.log(`triggerEmail Flag: ${triggerEmail}`);

    const updateData: any = { status };
    if (interviewDate) {
      updateData.interviewDate = new Date(interviewDate);
      console.log(`Updating interviewDate to: ${updateData.interviewDate}`);
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!application) {
      console.error(`[Error] Application lost during update`);
      return res.status(404).json({ error: 'Application not found' });
    }

    console.log(`Successfully updated application in database.`);

    // Improved trigger logic:
    // 1. Explicit triggerEmail=true from frontend (highest priority)
    // 2. Transition TO 'Interviewing' from any other status
    const shouldSendEmail = (triggerEmail === true) || (status === 'Interviewing' && oldApplication.status !== 'Interviewing');
    
    if (shouldSendEmail) {
      console.log(`[Trigger] Condition met for interview scheduled email`);
      try {
        console.log(`[EmailService] Attempting to send to: ${application.email}`);
        await sendInterviewScheduledEmail(
          application.email, 
          application.name, 
          application.roleTitle, 
          updateData.interviewDate || application.interviewDate
        );
        console.log(`[Success] Interview email sent successfully`);
      } catch (emailError: any) {
        console.error(`[Error] Failed to send interview email:`, emailError.message || emailError);
      }
    } else {
      console.log(`[Skip] Email condition not met. (Status matched? ${status === 'Interviewing'}, triggerEmail? ${triggerEmail})`);
    }

    console.log(`--- Update Cycle Complete ---\n`);
    res.json(application);
  } catch (error: any) {
    console.error('\n[Critical Error] Update application exception:', error.message || error);
    res.status(400).json({ error: 'Failed to update application' });
  }
});

app.delete('/api/applications/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ error: 'Application not found' });
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete application' });
  }
});

// Jobs API
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error('Create job error:', error);
    res.status(400).json({ error: 'Failed to create job' });
  }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete job' });
  }
});

// Testimonials API
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ order: 1, createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

app.post('/api/testimonials', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create testimonial' });
  }
});

app.put('/api/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update testimonial' });
  }
});

app.delete('/api/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete testimonial' });
  }
});

// Admin Auth API
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Notifications API
app.get('/api/admin/notifications', async (req, res) => {
  try {
    const [inquiries, applications] = await Promise.all([
      Inquiry.find({}).sort({ createdAt: -1 }).limit(10),
      Application.find({}).sort({ createdAt: -1 }).limit(10)
    ]);
    
    const notifications = [
      ...inquiries.map((inq: any) => ({
        _id: inq._id,
        type: 'inquiry',
        title: 'New Inquiry',
        description: `${inq.name} interested in ${inq.service}`,
        createdAt: inq.createdAt
      })),
      ...applications.map((app: any) => ({
        _id: app._id,
        type: 'application',
        title: 'New Application',
        description: `${app.name} applied for ${app.roleTitle}`,
        createdAt: app.createdAt
      }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    res.json(notifications.slice(0, 15));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

app.get('/api/admin/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

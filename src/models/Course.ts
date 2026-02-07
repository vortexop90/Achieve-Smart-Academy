import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description'],
  },
  duration: {
    type: String,
    required: [true, 'Please provide course duration'],
  },
  level: {
    type: String,
    required: [true, 'Please provide course level (e.g., Foundation, Advanced)'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  features: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);

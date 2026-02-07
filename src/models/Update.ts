import mongoose from 'mongoose';

const UpdateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  date: {
    type: String,
    required: [true, 'Please provide a date'],
  },
  type: {
    type: String,
    enum: ['Test', 'Homework', 'Notice'],
    default: 'Notice',
  },
  category: {
    type: String,
    default: 'General',
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  isHighlight: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Update || mongoose.model('Update', UpdateSchema);

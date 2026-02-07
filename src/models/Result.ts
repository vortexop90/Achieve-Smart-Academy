import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide student name'],
  },
  class: {
    type: String,
    required: [true, 'Please provide class/year'],
  },
  score: {
    type: String,
    required: [true, 'Please provide score/percentage'],
  },
  subject: {
    type: String, // e.g., "School Topper", "Mathematics: 100/100"
    required: [true, 'Please provide subject or achievement title'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Result || mongoose.model('Result', ResultSchema);

import mongoose from 'mongoose';

const DirectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  vision: String,
  values: String,
  commitment: String,
}, { timestamps: true });

export default mongoose.models.Director || mongoose.model('Director', DirectorSchema);

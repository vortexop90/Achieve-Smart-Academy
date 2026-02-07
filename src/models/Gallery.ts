import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  src: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

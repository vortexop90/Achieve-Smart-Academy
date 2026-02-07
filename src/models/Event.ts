import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
  },
  date: {
    type: String,
    required: [true, 'Please provide an event date'],
  },
  type: {
    type: String, // Celebration, Competition, etc.
    default: 'Event'
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  location: {
    type: String,
  },
  status: {
    type: String, // Upcoming, Completed, Coming Soon
    default: 'Upcoming'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);

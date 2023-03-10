/* eslint-disable func-names */
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export default mongoose.model('events', EventSchema);

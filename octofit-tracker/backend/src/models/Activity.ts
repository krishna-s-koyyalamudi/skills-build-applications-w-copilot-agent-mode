import mongoose, { Document, Model, Types } from 'mongoose';

export interface ActivityDocument extends Document {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  distanceKilometers?: number;
  completedAt: Date;
}

const activitySchema = new mongoose.Schema<ActivityDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  calories: { type: Number, required: true, min: 0 },
  distanceKilometers: { type: Number, min: 0 },
  completedAt: { type: Date, required: true },
});

export const Activity: Model<ActivityDocument> = mongoose.models.Activity || mongoose.model<ActivityDocument>('Activity', activitySchema);
import mongoose, { Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  displayName: string;
  joinedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  displayName: { type: String, required: true, trim: true },
  joinedAt: { type: Date, required: true, default: Date.now },
});

export const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
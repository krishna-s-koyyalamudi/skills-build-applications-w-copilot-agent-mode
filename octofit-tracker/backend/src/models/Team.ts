import mongoose, { Document, Model, Types } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  motto: string;
  members: Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new mongoose.Schema<TeamDocument>({
  name: { type: String, required: true, unique: true, trim: true },
  motto: { type: String, required: true, trim: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  createdAt: { type: Date, required: true, default: Date.now },
});

export const Team: Model<TeamDocument> = mongoose.models.Team || mongoose.model<TeamDocument>('Team', teamSchema);
import mongoose, { Document, Model, Types } from 'mongoose';

export interface LeaderboardDocument extends Document {
  user: Types.ObjectId;
  team: Types.ObjectId;
  points: number;
  rank: number;
  weekStarting: Date;
}

const leaderboardSchema = new mongoose.Schema<LeaderboardDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  points: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
  weekStarting: { type: Date, required: true },
});

export const Leaderboard: Model<LeaderboardDocument> = mongoose.models.Leaderboard || mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
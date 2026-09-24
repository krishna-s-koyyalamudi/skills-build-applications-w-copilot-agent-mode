import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maya', email: 'maya@example.com', displayName: 'Maya Chen', joinedAt: new Date('2026-01-15') },
      { username: 'jonas', email: 'jonas@example.com', displayName: 'Jonas Reed', joinedAt: new Date('2026-02-02') },
      { username: 'priya', email: 'priya@example.com', displayName: 'Priya Shah', joinedAt: new Date('2026-02-18') },
    ]);

    const teams = await Team.create([
      { name: 'Morning Comets', motto: 'Start strong together', members: [users[0]._id, users[1]._id] },
      { name: 'Trail Blazers', motto: 'Every mile counts', members: [users[2]._id] },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'Run', durationMinutes: 32, calories: 310, distanceKilometers: 5.2, completedAt: new Date('2026-09-21T07:15:00Z') },
      { user: users[1]._id, type: 'Strength', durationMinutes: 45, calories: 280, completedAt: new Date('2026-09-22T17:30:00Z') },
      { user: users[2]._id, type: 'Cycle', durationMinutes: 50, calories: 420, distanceKilometers: 18.4, completedAt: new Date('2026-09-23T06:45:00Z') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 840, rank: 1, weekStarting: new Date('2026-09-21') },
      { user: users[2]._id, team: teams[1]._id, points: 720, rank: 2, weekStarting: new Date('2026-09-21') },
      { user: users[1]._id, team: teams[0]._id, points: 610, rank: 3, weekStarting: new Date('2026-09-21') },
    ]);

    await Workout.create([
      { name: 'Quick Core Reset', focus: 'Core', difficulty: 'beginner', durationMinutes: 20, exercises: ['Dead bug', 'Plank', 'Bird dog'] },
      { name: 'Full Body Builder', focus: 'Strength', difficulty: 'intermediate', durationMinutes: 35, exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Rows'] },
      { name: 'Power Intervals', focus: 'Cardio', difficulty: 'advanced', durationMinutes: 30, exercises: ['High knees', 'Burpees', 'Mountain climbers', 'Skater hops'] },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

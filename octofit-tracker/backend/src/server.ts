import express from 'express'
import { connectDatabase } from './config/database.js'
import { Activity } from './models/Activity.js'
import { Leaderboard } from './models/Leaderboard.js'
import { Team } from './models/Team.js'
import { User } from './models/User.js'
import { Workout } from './models/Workout.js'

const app = express()
const port = Number(process.env.PORT) || 8000
const codespaceName = process.env.CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiUrl })
})

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().sort({ username: 1 }).lean())
})

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'username displayName').sort({ name: 1 }).lean())
})

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'username displayName').sort({ completedAt: -1 }).lean())
})

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user', 'username displayName').populate('team', 'name').sort({ rank: 1 }).lean())
})

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ difficulty: 1, name: 1 }).lean())
})

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening at ${apiUrl}`)
    })
  })
  .catch((error) => {
    console.error('Unable to start OctoFit API:', error)
    process.exit(1)
  })

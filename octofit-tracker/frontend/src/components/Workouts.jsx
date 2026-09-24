import { useEffect, useState } from 'react'
import { API_BASE_URL, fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : `${API_BASE_URL}/api/workouts/`

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(workoutsEndpoint)
      .then(setWorkouts)
      .then(() => setStatus('ready'))
      .catch((requestError) => {
        setError(requestError.message)
        setStatus('error')
      })
  }, [])

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Train with intention</p>
          <h1>Workouts</h1>
          <p className="page-description">Focused sessions to make your next effort count.</p>
        </div>
        <span className="count-badge">{workouts.length} sessions</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading workouts...</p>}
      {status === 'error' && <p className="state-message state-error">{error}</p>}
      {status === 'ready' && workouts.length === 0 && <p className="state-message">No workout plans are available yet.</p>}
      {workouts.length > 0 && (
        <div className="card-grid workout-grid">
          {workouts.map((workout) => (
            <article className="info-card workout-card" key={workout._id || workout.name}>
              <div className={`difficulty difficulty-${workout.difficulty}`}>{workout.difficulty}</div>
              <h2>{workout.name}</h2>
              <p>{workout.focus}</p>
              <div className="card-meta">
                <span>{workout.durationMinutes} min</span>
                <span>{workout.exercises?.length || 0} exercises</span>
              </div>
              {workout.exercises?.length > 0 && <p className="exercise-list">{workout.exercises.join(' · ')}</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts

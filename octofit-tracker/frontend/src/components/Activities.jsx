import { useEffect, useState } from 'react'
import { fetchCollection, formatDate } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities')
      .then(setActivities)
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
          <p className="eyebrow">Movement log</p>
          <h1>Activities</h1>
          <p className="page-description">A live pulse of workouts completed across the community.</p>
        </div>
        <span className="count-badge">{activities.length} logged</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading activities...</p>}
      {status === 'error' && <p className="state-message state-error">{error}</p>}
      {status === 'ready' && activities.length === 0 && <p className="state-message">No activities have been logged yet.</p>}
      {activities.length > 0 && (
        <div className="table-shell">
          <table className="data-table">
            <thead>
              <tr><th>Activity</th><th>Athlete</th><th>Duration</th><th>Calories</th><th>Distance</th><th>Completed</th></tr>
            </thead>
            <tbody>
              {activities.map((activity) => {
                const athlete = typeof activity.user === 'object' ? activity.user : null
                return (
                  <tr key={activity._id || `${activity.type}-${activity.completedAt}`}>
                    <td className="strong-cell">{activity.type}</td>
                    <td>{athlete?.displayName || athlete?.username || 'Unknown athlete'}</td>
                    <td>{activity.durationMinutes} min</td>
                    <td>{activity.calories} kcal</td>
                    <td>{activity.distanceKilometers ? `${activity.distanceKilometers} km` : '—'}</td>
                    <td>{formatDate(activity.completedAt)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities

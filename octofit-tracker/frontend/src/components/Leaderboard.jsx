import { useEffect, useState } from 'react'
import { API_BASE_URL, fetchCollection, formatDate } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : `${API_BASE_URL}/api/leaderboard/`

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(leaderboardEndpoint)
      .then(setEntries)
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
          <p className="eyebrow">Weekly standings</p>
          <h1>Leaderboard</h1>
          <p className="page-description">Celebrate consistency, not just the finish line.</p>
        </div>
        <span className="count-badge">{entries.length} ranked</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading leaderboard...</p>}
      {status === 'error' && <p className="state-message state-error">{error}</p>}
      {status === 'ready' && entries.length === 0 && <p className="state-message">The leaderboard is waiting for its first results.</p>}
      {entries.length > 0 && (
        <div className="table-shell">
          <table className="data-table leaderboard-table">
            <thead>
              <tr><th>Rank</th><th>Athlete</th><th>Team</th><th>Points</th><th>Week of</th></tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const athlete = typeof entry.user === 'object' ? entry.user : null
                const team = typeof entry.team === 'object' ? entry.team : null
                return (
                  <tr key={entry._id || entry.rank}>
                    <td className="rank-cell">{entry.rank}</td>
                    <td className="strong-cell">{athlete?.displayName || athlete?.username || 'Unknown athlete'}</td>
                    <td>{team?.name || 'Independent'}</td>
                    <td className="points-cell">{entry.points} pts</td>
                    <td>{formatDate(entry.weekStarting)}</td>
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

export default Leaderboard

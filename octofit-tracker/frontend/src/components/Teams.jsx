import { useEffect, useState } from 'react'
import { fetchCollection, formatDate } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('teams')
      .then(setTeams)
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
          <p className="eyebrow">Find your crew</p>
          <h1>Teams</h1>
          <p className="page-description">Small groups, shared goals, and a little friendly pressure.</p>
        </div>
        <span className="count-badge">{teams.length} teams</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading teams...</p>}
      {status === 'error' && <p className="state-message state-error">{error}</p>}
      {status === 'ready' && teams.length === 0 && <p className="state-message">No teams have been created yet.</p>}
      {teams.length > 0 && (
        <div className="card-grid">
          {teams.map((team) => (
            <article className="info-card" key={team._id || team.name}>
              <div className="card-accent" />
              <h2>{team.name}</h2>
              <p>{team.motto || 'Keep moving together.'}</p>
              <div className="card-meta">
                <span>{team.members?.length || 0} members</span>
                <span>Started {formatDate(team.createdAt)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams

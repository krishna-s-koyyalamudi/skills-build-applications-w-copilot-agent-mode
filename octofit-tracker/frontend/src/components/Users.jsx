import { useEffect, useState } from 'react'
import { fetchCollection, formatDate } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users')
      .then(setUsers)
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
          <p className="eyebrow">Community</p>
          <h1>Members</h1>
          <p className="page-description">The people powering this week&apos;s momentum.</p>
        </div>
        <span className="count-badge">{users.length} members</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading members...</p>}
      {status === 'error' && <p className="state-message state-error">{error}</p>}
      {status === 'ready' && users.length === 0 && <p className="state-message">No members have joined yet.</p>}
      {users.length > 0 && (
        <div className="table-shell">
          <table className="data-table">
            <thead>
              <tr><th>Name</th><th>Username</th><th>Email</th><th>Joined</th></tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.username}>
                  <td className="strong-cell">{user.displayName || user.username}</td>
                  <td>@{user.username}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.joinedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users

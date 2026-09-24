import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL } from './api.js'

const navItems = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Members', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function Overview() {
  return (
    <section className="overview-page">
      <div className="overview-intro">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>Make movement<br /><em>matter.</em></h1>
        <p className="overview-copy">A shared space for the habits, people, and tiny wins that keep a team moving.</p>
      </div>
      <div className="overview-links">
        <NavLink to="/activities" className="overview-link overview-link-primary">
          <span>See recent activity</span><span aria-hidden="true">↗</span>
        </NavLink>
        <NavLink to="/leaderboard" className="overview-link">
          <span>Check the standings</span><span aria-hidden="true">↗</span>
        </NavLink>
      </div>
      <div className="overview-note">
        <span className="pulse-dot" />
        <span>Connected to {API_BASE_URL.replace(/^https?:\/\//, '')}</span>
      </div>
    </section>
  )
}

function App() {
  const location = useLocation()
  const currentPage = navItems.find((item) => item.path === location.pathname)

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand" aria-label="OctoFit overview">
          <img className="brand-logo" src="/octofitapp-small.png" alt="" />
          <span>OctoFit</span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          <p className="nav-label">Your space</p>
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} className="nav-link">
              <span className="nav-marker" />{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="status-indicator" />API online
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <span>{currentPage?.label || 'Overview'}</span>
          <span className="topbar-date">Mergington High School · 2026</span>
        </header>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

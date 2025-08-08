import { Link, useLocation, useNavigate } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    localStorage.removeItem('userId')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">Murmur</div>
      <ul className="navbar-links">
        <li className={location.pathname === '/home' ? 'active' : ''}>
          <Link to="/home">Timeline</Link>
        </li>
        <li className={location.pathname === '/profile' ? 'active' : ''}>
          <Link to="/profile">My Profile</Link>
        </li>
        <li className={location.pathname === '/users' ? 'active' : ''}>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <a
            href="/logout"
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
          >
            Logout
          </a>
        </li>
      </ul>
    </nav>
  )
}

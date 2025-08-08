import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import UsersPage from './pages/UserPage'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import NavBar from './components/NavBar'

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <NavBar />
              <HomePage />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <NavBar />
              <ProfilePage />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <NavBar />
              <UsersPage />
            </>
          }
        />

        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App

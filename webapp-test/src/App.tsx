// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App

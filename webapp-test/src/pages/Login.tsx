import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles.css'
export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')
  try {
    const response = await axios.post(
      'http://localhost:3001/api/users/login',
      form,
    )
    const user = response.data 
    localStorage.setItem('userId', String(user.id)) 
    navigate('/home')
  } catch (err: any) {
    setError(err.response?.data?.message || 'Login failed')
  }
}

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="auth-error">{error}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="auth-link">
        Don't have an account? <a href="/">Register here</a>
      </p>
    </div>
  )
}

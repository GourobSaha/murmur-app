import { useEffect, useState } from 'react'
import axios from 'axios'

type Murmur = {
  id: number
  text: string
  createdAt: string
  updatedAt: string
}

type User = {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
  followers: any[]
  following: any[]
  murmurs: Murmur[]
}

export default function ProfilePage() {
  const userId = Number(localStorage.getItem('userId'))
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/users/${userId}`)
      setUser(res.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load user info')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchUser()
    }
  }, [userId])

  const handleDeleteMurmur = async (murmurId: number) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/murmurs/delete/${murmurId}?userId=${userId}`,
      )
      setUser((prev) =>
        prev
          ? { ...prev, murmurs: prev.murmurs.filter((m) => m.id !== murmurId) }
          : null,
      )
    } catch (err) {
      alert('Failed to delete murmur')
    }
  }

  if (loading) return <p>Loading profile...</p>
  if (error) return <p>{error}</p>
  if (!user) return <p>User not found</p>

  return (
    <div className="page">
      <h2>{user.name}'s Profile</h2>
      <h4>Email: {user.email}</h4>
      <p>
        <strong>Following:</strong> {user.following.length}
      </p>
      <p>
        <strong>Followers:</strong> {user.followers.length}
      </p>

      <h3>My Murmurs</h3>
      {user.murmurs.length === 0 && <p>No murmurs yet.</p>}
      {user.murmurs.map((murmur) => (
        <div key={murmur.id} className="murmur">
          <p>{murmur.text}</p>
          <small>Posted: {new Date(murmur.createdAt).toLocaleString()}</small>
          <br />
          <button onClick={() => handleDeleteMurmur(murmur.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

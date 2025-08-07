import { useEffect, useState } from 'react'
import axios from 'axios'

type User = {
  id: number
  name: string
}

type Like = {
  id: number
  userId: number
}

type Murmur = {
  id: number
  content: string
  createdAt: string
  user: User
  likes: Like[]
}

export default function HomePage() {
  const [murmurs, setMurmurs] = useState<Murmur[]>([])

  useEffect(() => {
    axios
      .get<Murmur[]>(`http://localhost:3001/api/murmurs/user/${1}`)
      .then((res) => setMurmurs(res.data))
      .catch((err) => console.error('Failed to fetch murmurs:', err))
  }, [])

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Timeline</h1>
      {murmurs.map((murmur) => (
        <div
          key={murmur.id}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          <strong>{murmur.user.name}</strong>
          <p>{murmur.content}</p>
          <small>{new Date(murmur.createdAt).toLocaleString()}</small>
          <div>❤️ {murmur.likes.length} likes</div>
        </div>
      ))}
    </div>
  )
}

import { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles.css'

type Murmur = {
  id: number
  text: string
  createdAt: string
  likes: []
  user: {
    id: number
    name: string
  }
}

export default function HomePage() {
  const [murmurs, setMurmurs] = useState<Murmur[]>([])
  const [text, setText] = useState('')
  const [page, setPage] = useState(1)
  const userId = Number(localStorage.getItem('userId'))
  const pageSize = 10

  const fetchTimeline = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/murmurs/timeline?userId=${userId}&page=${page}`,
      )
      setMurmurs(res.data)
    } catch (error) {
      console.error('Failed to fetch timeline:', error)
    }
  }

  useEffect(() => {
    if (userId) fetchTimeline()
  }, [userId, page])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    try {
      await axios.post('http://localhost:3001/api/murmurs/create', {
        text,
        userId,
      })
      setText('')
      fetchTimeline()
    } catch (error) {
      console.error('Failed to create murmur:', error)
    }
  }

  return (
    <div className="page">
      <h2>Timeline</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          style={{ width: '100%', padding: '8px' }}
        />
        <button type="submit" style={{ marginTop: '10px' }}>
          Murmur
        </button>
      </form>

      {murmurs.length === 0 && <p>No murmurs to show.</p>}

      {murmurs.map((murmur) => (
        <div key={murmur.id} className="murmur">
          <p>{murmur.text}</p>
          <small>
            By {murmur.user.name} | Likes: {murmur.likes.length} | Posted: {' '}
            {new Date(murmur.createdAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </small>
        </div>
      ))}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span style={{ padding: '0 10px' }}>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles.css'

type Like = {
  id: number
  createdAt: string
  user: {
    name: string
    email: string
  }
}

type Murmur = {
  id: number
  text: string
  createdAt: string
  updatedAt: string
  user: {
    id: number
    name: string
  }
  likes: Like[]
  isLiked?: boolean
}

export default function HomePage() {
  const [murmurs, setMurmurs] = useState<Murmur[]>([])
  const [text, setText] = useState('')
  const [page, setPage] = useState(1)
  const [showLikesFor, setShowLikesFor] = useState<number | null>(null)
  const userId = Number(localStorage.getItem('userId'))

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

  const toggleLike = async (murmurId: number) => {
    try {
      await axios.post('http://localhost:3001/api/likes/toggle', {
        userId,
        murmurId,
      })
      fetchTimeline()
    } catch (error) {
      console.error('Failed to toggle like:', error)
    }
  }

  return (
    <div className="page">
      <h2>Timeline</h2>

      <form onSubmit={handleSubmit} className="murmur-form">
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="murmur-textarea"
        />
        <button type="submit" className="murmur-submit-btn">
          Murmur
        </button>
      </form>

      {murmurs.length === 0 && <p>No murmurs to show.</p>}

      {murmurs.map((murmur) => {
        const likedByUser = murmur.likes.some(
          (like) => like.user.email === localStorage.getItem('userEmail'),
        )

        return (
          <div key={murmur.id} className="murmur">
            <p className="murmur-text">{murmur.text}</p>
            <small className="murmur-meta">
              By {murmur.user.name} | Likes: {murmur.likes.length} | Posted:{' '}
              {new Date(murmur.createdAt).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </small>

            <div className="murmur-buttons">
              <button
                className={`like-btn ${likedByUser ? 'liked' : ''}`}
                onClick={() => toggleLike(murmur.id)}
              >
                {murmur.isLiked ? 'Unlike' : 'Like'}
              </button>

              <button
                className="details-btn"
                onClick={() =>
                  setShowLikesFor(showLikesFor === murmur.id ? null : murmur.id)
                }
              >
                Details
              </button>
            </div>

            {showLikesFor === murmur.id && (
              <div className="likes-list">
                {murmur.likes.length > 0 ? (
                  <>
                    <strong>Liked by:</strong>
                    <ul>
                      {murmur.likes.map((like) => (
                        <li key={like.id}>
                          {like.user.name} ({like.user.email})
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>No likes yet.</p>
                )}
              </div>
            )}
          </div>
        )
      })}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles.css' // import global styles

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
  followers?: { id: number }[]
  following?: { id: number }[]
  murmurs?: Murmur[]
  isFollowing?: boolean
}

export default function UsersPage() {
  const userId = Number(localStorage.getItem('userId'))
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/except/${userId}`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
  }, [userId])

  const toggleFollow = async (followedId: number) => {
    try {
      await axios.post('http://localhost:3001/api/follows/toggle', {
        followerId: userId,
        followedId: followedId,
      })

      // Re-fetch updated data
      const res = await axios.get(
        `http://localhost:3001/api/users/except/${userId}`,
      )
      setUsers(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="users-container">
      <h2>Users</h2>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id} className="user-card">
            <div>
              <strong>{user.name}</strong>
              <p>
                {user.email} | Followers: {user.followers?.length || 0} |
                Following: {user.following?.length || 0}
              </p>
              <div className="murmurs-list">
                <strong>Murmurs:</strong>
                {user.murmurs && user.murmurs.length > 0 ? (
                  <ul>
                    {user.murmurs.map((murmur) => (
                      <li key={murmur.id} className="murmur-item">
                        {murmur.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No murmurs yet</p>
                )}
              </div>
            </div>
            <button
              className={`follow-btn ${user.isFollowing ? 'unfollow' : ''}`}
              onClick={() => toggleFollow(user.id)}
            >
              {user.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

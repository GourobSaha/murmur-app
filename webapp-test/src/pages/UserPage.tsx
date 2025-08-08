import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles.css' // import global styles

type User = {
  id: number
  name: string
  email: string
  followers?: { id: number }[]
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
    });

    // Re-fetch updated data
    const res = await axios.get(`http://localhost:3001/api/users/except/${userId}`);
    setUsers(res.data);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="users-container">
      <h2>Users</h2>
      <ul className="users-list">
        {users.map((user) => {
          return (
            <li key={user.id} className="user-card">
              <div>
                <strong>{user.name}</strong>
                <p>{user.email} | Followers: {user.followers?.length || 0}</p>
              </div>
              <button
                className={`follow-btn ${user.isFollowing ? 'unfollow' : ''}`}
                onClick={() => toggleFollow(user.id)}
              >
                {user.isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

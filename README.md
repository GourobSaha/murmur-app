# Murmur Web Application

A simple Twitter-like web application where users can post short messages called "murmurs", follow/unfollow other users, like murmurs, and browse a timeline of murmurs from users they follow.

---

## Tech Stack

- **Backend:** NestJS, TypeORM, MySQL  
- **Frontend:** React, Axios, React Router  
- **Styling:** Basic CSS (Tailwind CSS was considered but not used due to dependency conflicts)

---

## Features

- User registration and login (simple, no authentication tokens)
- Post murmurs (tweets)
- View timeline containing murmurs from followed users and self
- Like/unlike murmurs
- Follow/unfollow other users
- User profile pages showing user info and murmurs
- Paginated murmur timeline (10 per page)
- Navigation bar for easy access to Timeline, Profile, Users, Login and Logout

---

## API Endpoints (example)

- `POST /api/users/register` — Register new user  
- `POST /api/users/login` — Login user  
- `GET /api/murmurs/timeline?userId={id}&page={page}` — Get timeline murmurs for a user  
- `POST /api/murmurs/create` — Create a new murmur  
- `DELETE /api/murmurs/delete/:id` — Delete own murmur  
- `GET /api/users/:id` — Get user profile info  
- `GET /api/users/except/:id` — Get list of all users except the given user  
- `POST /api/follows/toggle` — Toggle follow/unfollow between users  
- `POST /api/murmurs/:id/like` — Like or unlike a murmur

---

## Project Structure

- **/server** — NestJS backend source code  
  - `entities/` — TypeORM entities for User, Murmur, Follow, Like  
  - `controllers/` — REST API controllers  
  - `services/` — Business logic  
- **/client/src** — React frontend source code  
  - `pages/` — Login, Register, Home, Users, Profile  
  - `components/` — Navbar, Murmur list, Pagination  
  - `api.ts` — API helper methods  
  - `styles.css` — Basic styling  

---

## Getting Started

### Backend

1. Configure `.env` with your MySQL credentials.  
2. Run `npm install` to install dependencies.  
3. Run `npm run start:dev` to start the backend server on port 3001.
4. Base URL `http://localhost:3000`

### Frontend

1. Navigate to `/client` folder.  
2. Run `yarn install` (or `npm install`) to install dependencies.  
3. Run `yarn start` (or `npm start`) to start React app on port 3000.  
4. Open browser at `http://localhost:3000`

---

## Notes

- Authentication is minimal — login returns user info without tokens.  
- Tailwind CSS was considered but dropped due to dependency conflicts.  
- Pagination is implemented for timeline murmurs only.  
- Follow/unfollow toggles update UI immediately by re-fetching user data.  

---

## Future Improvements

- Add proper JWT authentication and protected routes  
- Implement real-time updates via WebSocket for murmurs and likes  
- Improve UI styling and responsive design  
- Add user avatar/profile pictures  
- Add search functionality for murmurs and users

---

## Author

Gourob Saha

---

Feel free to clone, use, and improve this app!

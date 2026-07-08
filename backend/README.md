# Shoe Backend

This backend was added to support the frontend in the repository. It is intended to be resume-ready: simple, well-documented, and includes authentication, a product (shoe) model, CRUD endpoints, and database persistence using SQLite.

Features
- Node + Express API
- SQLite persistence via Sequelize ORM
- JWT authentication (register & login)
- Protected CRUD endpoints for shoes
- Seed script with example data
- Dockerfile for containerized runs

How to run (local)
1. cd backend
2. cp .env.example .env and edit if desired
3. npm install
4. npm run seed   # creates database and sample data
5. npm start

Default API endpoints
- GET /api/health
- POST /api/auth/register
- POST /api/auth/login
- GET /api/shoes
- GET /api/shoes/:id
- POST /api/shoes  (requires Authorization: Bearer <token>)
- PUT /api/shoes/:id (requires auth)
- DELETE /api/shoes/:id (requires auth)

Notes for frontend integration
- Development proxy: if using CRA, add `"proxy": "http://localhost:4000"` to frontend package.json
- Or call the API using the full URL: `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/shoes`

Resume bullet ideas
- Implemented a Node.js + Express backend with JWT authentication and CRUD endpoints for a shoe catalog
- Integrated SQLite via Sequelize for fast local development and reproducible seeds
- Wrote Dockerfile for containerized deployment and included seed data for demos


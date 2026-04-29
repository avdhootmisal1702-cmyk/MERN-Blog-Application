# MERN Blog Page

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Tech Stack

- **Frontend**: React, Tailwind CSS, Redux Toolkit, React-Quill
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT with bcryptjs
- **File Storage**: Cloudinary
- **Rich Text Editor**: React-Quill

## Project Structure

```
MERN Blog Page/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   └── .gitignore
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `CLOUDINARY_NAME`: Cloudinary account name
   - `CLOUDINARY_API_KEY`: Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Cloudinary API secret

5. Start the backend server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables:
   - `VITE_API_BASE_URL`: Backend API URL (default: http://localhost:5000/api)
   - `VITE_CLOUDINARY_NAME`: Your Cloudinary account name

5. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## Features (To Be Implemented)

- User authentication and registration
- Create, read, update, delete blog posts
- Rich text editing with React-Quill
- Image uploads to Cloudinary
- User profiles and dashboards
- Blog post comments
- Search and filter functionality
- JWT-based authentication

## Database Models

### User Model
- username, email, password (hashed)
- firstName, lastName
- profileImage, bio
- timestamps

### BlogPost Model
- title, content, excerpt
- author (reference to User)
- featuredImage
- tags, category
- published status
- views, likes

### Comment Model
- content
- author (reference to User)
- post (reference to BlogPost)
- timestamps

## API Endpoints (To Be Implemented)

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Blog Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile (protected)

### Comments
- `GET /api/posts/:id/comments` - Get post comments
- `POST /api/posts/:id/comments` - Create comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)

## Configuration Files

- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `vite.config.js` - Vite build configuration
- `.env.example` - Environment variables template

## Development

To run both frontend and backend simultaneously, you can use two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Build for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Support

For support, please open an issue in the repository.

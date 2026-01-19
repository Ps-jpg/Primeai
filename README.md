# Backend Developer Dashboard

for live api doc 'https://primeai-6l1t.onrender.com/api-docs/'

A **scalable REST API** with Authentication, Role-Based Access Control (RBAC), and a modern React frontend for task management.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## 📋 Features

### Backend
- ✅ User registration & login with **password hashing (bcrypt)**
- ✅ **JWT-based authentication** with token expiration
- ✅ **Role-based access control** (User vs Admin)
- ✅ Complete **CRUD APIs** for task management
- ✅ **API versioning** (`/api/v1`)
- ✅ Input **validation** & **sanitization**
- ✅ Comprehensive **error handling**
- ✅ **Rate limiting** for API security
- ✅ **Swagger/OpenAPI documentation**
- ✅ **Helmet.js** for security headers

### Frontend
- ✅ Modern **React.js** application with Vite
- ✅ User registration & login pages
- ✅ **Protected dashboard** (JWT required)
- ✅ Full **task CRUD** operations
- ✅ **Dark theme** with glassmorphism design
- ✅ Success/error message handling
- ✅ Responsive design

## 🏗️ Project Structure

```
backend-dev-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/       # Auth, validation, error handling
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/v1/        # API routes (versioned)
│   │   └── validators/       # Input validation
│   ├── server.js             # Express entry point
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # Auth context
│   │   ├── pages/            # Page components
│   │   └── services/         # API client
│   ├── package.json
│   └── vite.config.js
└── docs/
    ├── SCALABILITY.md
    └── postman_collection.json
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ 
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Edit .env with your MongoDB URI and JWT secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## 📚 API Documentation

### Interactive Documentation
Access the Swagger UI at: `http://localhost:5000/api-docs`

### API Endpoints

#### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/auth/register` | Public | Register new user |
| POST | `/api/v1/auth/login` | Public | Login and get JWT |
| GET | `/api/v1/auth/me` | Private | Get current user |
| GET | `/api/v1/auth/users` | Admin | Get all users |

#### Tasks
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/tasks` | Private | List all user's tasks |
| GET | `/api/v1/tasks/:id` | Private | Get single task |
| POST | `/api/v1/tasks` | Private | Create new task |
| PUT | `/api/v1/tasks/:id` | Private | Update task |
| DELETE | `/api/v1/tasks/:id` | Private | Delete task |

### Authentication
Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Example Requests

**Register User:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

**Create Task:**
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "Complete project", "description": "Finish the API", "priority": "high"}'
```

## 🔐 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet.js**: Security headers (XSS, CORS, etc.)
- **Input Validation**: express-validator for all inputs
- **Role-Based Access**: User and Admin permissions

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'user' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  title: String,
  description: String,
  status: 'pending' | 'in-progress' | 'completed',
  priority: 'low' | 'medium' | 'high',
  dueDate: Date,
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 📈 Scalability

See [SCALABILITY.md](./docs/SCALABILITY.md) for detailed notes on:
- Microservices architecture
- Redis caching strategies
- Load balancing approaches
- Docker deployment
- Database optimization

## 🧪 Testing

### Using Postman
Import the Postman collection from `docs/postman_collection.json`

### Using Swagger
1. Start the backend server
2. Navigate to `http://localhost:5000/api-docs`
3. Use the interactive documentation to test endpoints

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/backend_dashboard |
| `JWT_SECRET` | Secret key for JWT signing | (required) |
| `JWT_EXPIRE` | Token expiration time | 7d |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |
| `NODE_ENV` | Environment mode | development |

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ for the Backend Developer Internship Assignment**

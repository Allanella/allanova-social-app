import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectToDataBase } from './database/connectionToDataBase.js';
import authRoutes from './routes/myAuthRoutes.js';

// Connect to database
connectToDataBase();

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'I love you Lord!!!',
    status: 'Server is running successfully',
  });
});

// API routes
app.use('/api/auth', authRoutes);

// Use environment variable for port, fallback to 3000 for local development
const PORT = process.env.PORT || 3000;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for Vercel
export default app;

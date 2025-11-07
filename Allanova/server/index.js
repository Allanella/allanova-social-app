import 'dotenv/config'; // Load environment variables FIRST
import express from 'express';
import { connectToDataBase } from './database/connectionToDataBase.js';
import authRoutes from './routes/myAuthRoutes.js';

console.log('=== ENVIRONMENT CHECK ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGO_URI present:', process.env.MONGO_URI ? 'Yes' : 'No');
console.log('MONGODB_URI present:', process.env.MONGODB_URI ? 'Yes' : 'No');
console.log('PORT:', process.env.PORT);

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

// Use environment variable for port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
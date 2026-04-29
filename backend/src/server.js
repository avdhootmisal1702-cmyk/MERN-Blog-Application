import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import seedData from './utils/seedData.js';

dotenv.config();

const app = express();



app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://fabulous-tulumba-3417f8.netlify.app" 
  ],
  credentials: true
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');

    await seedData();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/blogs/:postId/comments', commentRoutes);



app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});



app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});



const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
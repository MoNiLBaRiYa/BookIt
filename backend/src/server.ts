import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDatabase from './config/database';
import experienceRoutes from './routes/experiences';
import bookingRoutes from './routes/bookings';
import promoRoutes from './routes/promo';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'BookIt API is running', version: '1.0.0' });
});

app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/promo', promoRoutes);

// Health check
app.get('/health', (req: express.Request, res: express.Response) => {
  res.json({ status: 'ok', message: 'BookIt API is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Database connection and server start
const startServer = async () => {
  // Start server first, then try database connection
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check available at /health`);
    console.log(`API Base URL: /api`);
  });

  // Try to connect to database in background
  try {
    await connectDatabase();
    console.log('Database connected successfully');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Database connection failed, running with mock data:', errorMessage);
    console.log('All API endpoints will use mock data');
  }
  
  return server;
};

startServer();

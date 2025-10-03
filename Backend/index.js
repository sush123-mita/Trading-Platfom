import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

// ✅ import routes
import authRoutes from './routes/auth.js';
import tradeRoutes from './routes/trade.js';
import marketRoutes from './routes/market.js';

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
  crossOriginResourcePolicy: false
}));

// ✅ register routes
app.use('/api/auth', authRoutes);
app.use('/api/trade', tradeRoutes);
app.use('/api/market', marketRoutes);

// mongo connection + server start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ Mongo connection error:", err));

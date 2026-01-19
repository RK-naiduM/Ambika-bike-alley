const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // <--- New Import
const cors = require('cors'); // <--- New Import
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route Imports
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORS CONFIGURATION ---
// This allows the Frontend to talk to the Backend
const allowedOrigins = [
  'http://localhost:5173',                  // Vite Local
  'http://localhost:3000',                  // Alternative Local
  'https://your-vercel-app.vercel.app',     // <--- REPLACE THIS LATER with your actual Vercel URL
  'https://bike-shop-frontend.vercel.app'   // Example placeholder
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or mobile apps)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Essential for Cookies to work
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // <--- Middleware to parse cookies

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// PayPal Config
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
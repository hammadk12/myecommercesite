require('dotenv').config();

const connectDB = require("./database");
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routes
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/user');

app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/reviews', reviewRoutes);
app.use('/user', userRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the E-Commerce API!');
});

// Global Error Handling Middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something broke!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
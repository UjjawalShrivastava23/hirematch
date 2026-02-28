const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userModel = require('./models/User');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'))
// Test route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'HireMatch server is running' });
});

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(8000, () => console.log('Server running on port 8000'));
  })
  .catch(err => console.log(err));



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userModel = require('./models/User');
const app = express();
const axios = require('axios')
app.use(cors());
app.use(express.json());
app.use('/api/analysis', require('./routes/analysis'))

app.use('/api/auth', require('./routes/auth'))
// Test route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'HireMatch server is running' });
});

// Connect to MongoDB then start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("DB ERROR:", err));



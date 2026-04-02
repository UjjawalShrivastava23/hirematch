const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/analysis', require('./routes/analysis'))

app.use('/api/auth', require('./routes/auth'))
// Test route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'HireMatch server is running' });
});

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.log('DB ERROR:', error)
    process.exit(1)
  }
}

startServer()


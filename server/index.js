
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB MongoDb URI', process.env.MONGODB_URL))  
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

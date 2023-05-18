const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.js');
const articleRoutes = require('./routes/articles.js');

const app = express();

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://yosserayadiiii:2dmwmtekup@cluster0.9cpybxz.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(error));

// Parse incoming requests with JSON payloads
app.use(express.json());

// Use user routes for /users endpoint
app.use('/users', userRoutes);

// Use article routes for /articles endpoint
app.use('/articles', articleRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start listening for incoming requests

app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});

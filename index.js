const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.js');
const articleRoutes = require('./routes/articles.js');

const app = express();

mongoose.connect('mongodb+srv://yosserayadiiii:2dmwmtekup@cluster0.9cpybxz.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(error));

app.use(express.json());

app.use('/users', userRoutes);

app.use('/articles', articleRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});


app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});

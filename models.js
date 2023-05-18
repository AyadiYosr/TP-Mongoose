
const mongoose = require('mongoose');
// THATS THE USER MODEL
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
});

const User = mongoose.model('User', userSchema);

// THATS THE ARTICLE MODEL
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = { User, Article };

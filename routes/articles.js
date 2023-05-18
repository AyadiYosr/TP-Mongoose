const express = require('express');
const router = express.Router();
const { Article } = require('../models');

// GET all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//GET one article
router.get('/:id', getArticle, (req, res) => {
  res.json(res.article);
});

//CREATE one article
router.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//UPDATE one article
router.put('/:id', getArticle, async (req, res) => {
  if (req.body.title != null) {
    res.article.title = req.body.title;
  }
  if (req.body.description != null) {
    res.article.description = req.body.description;
  }

  try {
    const updatedArticle = await res.article.save();
    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//DELETE one article
router.delete('/:id', getArticle, async (req, res) => {
  try {
    await res.article.remove();
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Middleware function to get article by id
async function getArticle(req, res, next) {
  try {
    const article = await Article.findById(req.params.id);
    if (article == null) {
      return res.status(404).json({ message: 'Cannot find article' });
    }
    res.article = article;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
module.exports = router;

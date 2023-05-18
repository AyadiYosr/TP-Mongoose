const express = require("express");
const router = express.Router();
const { User, Article } = require("../models");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// Create a user
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user
router.put("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }

  if (req.body.email != null) {
    res.user.email = req.body.email;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all articles for a user
router.get("/:id/articles", getUser, async (req, res) => {
  try {
    const articles = await Article.find({ userId: req.params.id });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an article for a user
router.post("/:id/articles", getUser, async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    userId: req.params.id,
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    res.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;

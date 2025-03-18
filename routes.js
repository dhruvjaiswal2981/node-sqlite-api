const express = require("express");
const db = require("./db");
const { fetchData } = require("./utils");

const router = express.Router();

// Load data from external API into SQLite
router.get("/load", async (req, res) => {
  try {
    const users = await fetchData();
    if (!users) return res.status(500).send("Failed to fetch data.");

    const insertUser = db.prepare("INSERT INTO users (id, name, username, email) VALUES (?, ?, ?, ?)");
    const insertPost = db.prepare("INSERT INTO posts (id, userId, title, body) VALUES (?, ?, ?, ?)");
    const insertComment = db.prepare("INSERT INTO comments (id, postId, name, email, body) VALUES (?, ?, ?, ?, ?)");

    users.forEach(user => {
      insertUser.run(user.id, user.name, user.username, user.email);
      user.posts.forEach(post => {
        insertPost.run(post.id, post.userId, post.title, post.body);
        post.comments.forEach(comment => {
          insertComment.run(comment.id, comment.postId, comment.name, comment.email, comment.body);
        });
      });
    });

    res.status(200).send("Data loaded successfully.");
  } catch (error) {
    console.error("Error loading data:", error.message);
    res.status(500).send("Internal Server Error.");
  }
});

// Delete all users
router.delete("/users", (req, res) => {
  db.run("DELETE FROM users", (err) => {
    if (err) return res.status(500).send("Error deleting users.");
    res.status(204).send();
  });
});

// Delete a specific user by ID
router.delete("/users/:userId", (req, res) => {
  const { userId } = req.params;
  db.run("DELETE FROM users WHERE id = ?", [userId], function (err) {
    if (err) return res.status(500).send("Error deleting user.");
    if (this.changes === 0) return res.status(404).send("User not found.");
    res.status(204).send();
  });
});

// Get a user and their posts and comments
router.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  db.get("SELECT * FROM users WHERE id = ?", [userId], (err, user) => {
    if (err) return res.status(500).send("Error retrieving user.");
    if (!user) return res.status(404).send("User not found.");

    db.all("SELECT * FROM posts WHERE userId = ?", [userId], (err, posts) => {
      if (err) return res.status(500).send("Error retrieving posts.");

      const postIds = posts.map((post) => post.id);
      if (postIds.length === 0) return res.json({ user, posts });

      db.all(`SELECT * FROM comments WHERE postId IN (${postIds.join(",")})`, (err, comments) => {
        if (err) return res.status(500).send("Error retrieving comments.");

        posts.forEach(post => {
          post.comments = comments.filter(comment => comment.postId === post.id);
        });

        res.json({ user, posts });
      });
    });
  });
});

// Create a new user
router.put("/users", express.json(), (req, res) => {
  const { id, name, username, email } = req.body;

  db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
    if (user) return res.status(409).send("User already exists.");
    
    db.run("INSERT INTO users (id, name, username, email) VALUES (?, ?, ?, ?)", [id, name, username, email], function (err) {
      if (err) return res.status(500).send("Error inserting user.");
      res.status(201).header("Location", `/users/${id}`).send("User created.");
    });
  });
});

module.exports = router;

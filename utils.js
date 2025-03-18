const axios = require("axios");

// Fetch users, posts, and comments from JSONPlaceholder API
const fetchData = async () => {
  try {
    const users = await axios.get("https://jsonplaceholder.typicode.com/users");
    for (let user of users.data) {
      const posts = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
      );

      for (let post of posts.data) {
        const comments = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
        );
        post.comments = comments.data;
      }
      user.posts = posts.data;
    }
    return users.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};

module.exports = { fetchData };

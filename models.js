module.exports = {
  User: {
    id: Number,
    name: String,
    username: String,
    email: String,
  },
  Post: {
    id: Number,
    userId: Number,
    title: String,
    body: String,
  },
  Comment: {
    id: Number,
    postId: Number,
    name: String,
    email: String,
    body: String,
  },
};

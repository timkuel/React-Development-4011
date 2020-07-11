const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('userPosts', postsSchema);

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatar: { type: String, default: ''},
  bio: { type: String, default: ''},
  roles: [String]
}, {collection: 'users' });

module.exports = mongoose.model("User", userSchema);
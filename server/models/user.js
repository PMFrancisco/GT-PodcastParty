const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  favorites: {
    type: Array,
    default: [],
  },
  lastListened: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);

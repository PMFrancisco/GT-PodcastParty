const mongoose = require("mongoose");
const bCrypt = require("bcrypt");

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
  favorites: {
    type: Array,
    default: [],
  },
  lastListened: {
    type: String,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bCrypt.genSalt(10);
  this.password = await bCrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);

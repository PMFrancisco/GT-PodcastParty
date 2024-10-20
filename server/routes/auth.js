const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bCrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = await bCrypt.genSalt(10);
    const hashedPassword = await bCrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

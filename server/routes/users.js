const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userIdFromToken = req.user.id;
      const user = await User.findById(userIdFromToken);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        favorites: user.favorites,
        lastListened: user.lastListened,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.post(
  "/lastListened/:podcastId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.user;
    const podcastId = req.params.podcastId;
    if (!podcastId) {
      return res.status(400).json({ message: "Podcast ID is required" });
    }
    try {
      const user = await User.findById(id);
      const existingIndex = user.lastListened.indexOf(podcastId);
      if (existingIndex !== -1) {
        user.lastListened.splice(existingIndex, 1);
        user.lastListened.unshift(podcastId);
        await user.save();
        res
          .status(200)
          .json({ message: "Podcast moved to the top of last listened" });
      } else {
        user.lastListened.unshift(podcastId);

        if (user.lastListened.length > 10) {
          user.lastListened.pop();
        }
        await user.save();
        res.status(200).json({ message: "Podcast added to last listened" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;

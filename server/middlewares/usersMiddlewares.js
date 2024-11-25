const User = require("../models/user");

const getUserData = async (req, res) => {
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
};

const updateLastListened = async (req, res) => {
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
};

module.exports = {
  getUserData,
  updateLastListened,
};

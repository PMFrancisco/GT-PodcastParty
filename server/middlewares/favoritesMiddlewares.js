const User = require("../models/user");

const addFavorite = async (req, res) => {
  const { id } = req.user;
  const podcastId = req.params.podcastId;

  if (!podcastId) {
    return res.status(400).json({ message: "Podcast ID is required" });
  }

  try {
    const user = await User.findById(id);

    if (user.favorites.includes(podcastId)) {
      return res.status(400).json({ message: "Podcast already favorited" });
    }

    user.favorites.push(podcastId);
    await user.save();

    res.status(200).json({ message: "Podcast favorited successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFavorite = async (req, res) => {
  const { id } = req.user;
  const podcastId = req.params.podcastId;

  try {
    const user = await User.findById(id);

    const favoriteIndex = user.favorites.indexOf(podcastId);
    if (favoriteIndex === -1) {
      return res
        .status(400)
        .json({ message: "Podcast not found in favorites" });
    }

    user.favorites.splice(favoriteIndex, 1);
    await user.save();

    res
      .status(200)
      .json({ message: "Podcast removed from favorites successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
};

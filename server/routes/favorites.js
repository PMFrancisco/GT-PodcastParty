const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddlewares");
const {
  addFavorite,
  removeFavorite,
} = require("../middlewares/favoritesMiddlewares");

router.post("/:podcastId", authenticate, addFavorite);

router.delete("/:podcastId", authenticate, removeFavorite);

module.exports = router;

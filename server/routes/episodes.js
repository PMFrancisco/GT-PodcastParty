const express = require("express");
const router = express.Router();
const {
  getEpisodes,
  getEpisodeById,
} = require("../middlewares/episodesMiddlewares");

router.get("/", getEpisodes);
router.get("/:id", getEpisodeById);

module.exports = router;

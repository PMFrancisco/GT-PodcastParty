const express = require("express");
const router = express.Router();
const {
  getEpisodesPaginated,
  getEpisodeById,
  getEpisodeIds
} = require("../middlewares/episodesMiddlewares");

router.get("/", getEpisodesPaginated);
router.get("/ids", getEpisodeIds);
router.get("/:id", getEpisodeById);

module.exports = router;

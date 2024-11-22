const express = require("express");
const router = express.Router();
const {
  getEpisodesPaginated,
  getEpisodeById,
  getEpisodeIds
} = require("../middlewares/episodesMiddlewares");

router.get("/", getEpisodesPaginated);
router.get("/:id", getEpisodeById);
router.get("/ids", getEpisodeIds);

module.exports = router;

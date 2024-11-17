const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddlewares");
const {
  getUserData,
  updateLastListened,
} = require("../middlewares/usersMiddlewares");

router.get("/", authenticate, getUserData);

router.post(
  "/lastListened/:podcastId",
  authenticate,
  updateLastListened
);

module.exports = router;

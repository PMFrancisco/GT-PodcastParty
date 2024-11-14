const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["episode1", "episode2"]
 *                 lastListened:
 *                   type: string
 *                   example: "episode3"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

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

/**
 * @swagger
 * /users/lastListened/{podcastId}:
 *   post:
 *     summary: Update last listened podcast
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: podcastId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the podcast to be marked as last listened
 *     responses:
 *       '200':
 *         description: Podcast updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Podcast added to last listened"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Podcast ID is required"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

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

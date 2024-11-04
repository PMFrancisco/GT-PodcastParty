const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: User's podcast favorites management
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * /fav/{podcastId}:
 *   post:
 *     summary: Add a podcast to the user's favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: podcastId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the podcast to add to favorites
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Podcast favorited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Podcast favorited successfully"
 *       '400':
 *         description: Podcast ID missing or already favorited
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Podcast already favorited"
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

router.post(
  "/:podcastId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

/**
 * @swagger
 * /fav/{podcastId}:
 *   delete:
 *     summary: Remove a podcast from the user's favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: podcastId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the podcast to remove from favorites
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Podcast removed from favorites successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Podcast removed from favorites successfully"
 *       '400':
 *         description: Podcast ID missing or not found in favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Podcast not found in favorites"
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

router.delete(
  "/:podcastId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

module.exports = router;

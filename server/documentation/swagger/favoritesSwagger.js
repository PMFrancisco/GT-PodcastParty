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

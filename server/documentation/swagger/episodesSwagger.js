/**
 * @swagger
 * tags:
 *   name: Episodes
 *   description: Episode fetch
 */

/**
 * @swagger
 * /episodes:
 *   get:
 *     summary: Get paginated episodes
 *     description: Retrieve episodes in paginated format. Each page contains 20 episodes.
 *     tags: [Episodes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number to retrieve (default is 1)
 *     responses:
 *       '200':
 *         description: A list of episodes for the specified page
 *         content:
 *           application/json:
 *             schema:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "Episode Title"
 *                       link:
 *                         type: string
 *                         example: "http://example.com/episode"
 *                       pubDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-10-01T00:00:00Z"
 *                       content:
 *                         type: string
 *                         example: "Episode content"
 *                       id:
 *                         type: string
 *                         example: "61641297"
 *                       duration:
 *                         type: string
 *                         example: "00:30:00"
 *                       audioInfo:
 *                         type: object
 *                         properties:
 *                           url:
 *                             type: string
 *                             example: "http://example.com/audio.mp3"
 *                           length:
 *                             type: string
 *                             example: "12345678"
 *                           type:
 *                             type: string
 *                             example: "audio/mpeg"
 *                       image:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *       '404':
 *         description: No episodes found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontraron episodios"
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener el feed RSS"
 */

/**
 * @swagger
 * /episodes/{id}:
 *   get:
 *     summary: Retrieve an episode by its ID
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the episode (GUID suffix)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The episode with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "Episode Title"
 *                 link:
 *                   type: string
 *                   example: "http://example.com/episode"
 *                 pubDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T00:00:00Z"
 *                 duration:
 *                     type: string
 *                     example: "00:30:00"
 *                 audioInfo:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: "http://example.com/audio.mp3"
 *                     length:
 *                       type: string
 *                       example: "12345678"
 *                     type:
 *                       type: string
 *                       example: "audio/mpeg"
 *                 image:
 *                   type: string
 *                   example: "http://example.com/image.jpg"
 *       '404':
 *         description: Episode not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontró el episodio"
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener el feed RSS"
 */

/**
 * @swagger
 * /episodes/ids:
 *   get:
 *     summary: Retrieve all episode IDs
 *     tags: [Episodes]
 *     responses:
 *       '200':
 *         description: A list of episode IDs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "61641297"
 *       '404':
 *         description: No episodes found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontraron episodios"
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener el feed RSS"
 */

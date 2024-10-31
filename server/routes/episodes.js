const express = require("express");
const router = express.Router();
const Parser = require("rss-parser");
const parser = new Parser();

const FEED_URL = "https://pod.link/1285264897.rss";

const fetchFeed = async () => {
  try {
    return await parser.parseURL(FEED_URL);
  } catch (error) {
    throw new Error("Error al obtener el feed RSS");
  }
};

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
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalItems:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 episodes:
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


router.get("/", async (req, res) => {
  try {
    const feed = await fetchFeed();

    if (feed.items && feed.items.length > 0) {
      const page = parseInt(req.query.page) || 1;
      const limit = 20;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const paginatedEpisodes = feed.items.slice(startIndex, endIndex);

      const formattedEpisodes = paginatedEpisodes.map((item) => {
        const idNumber = item.guid.match(/\d+$/)[0];

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          content: item.content,
          id: idNumber,
          duration: item.itunes.duration,
          audioInfo: item.enclosure,
          image: item.itunes.image,
        };
      });

      res.json(formattedEpisodes);
    } else {
      res.status(404).json({ message: "No se encontraron episodios" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

router.get("/:id", async (req, res) => {
  try {
    const feed = await fetchFeed();

    const id = req.params.id;

    const episode = feed.items.find((item) => item.guid.endsWith(id));

    if (episode) {
      res.json({
        title: episode.title,
        link: episode.link,
        pubDate: episode.pubDate,
        duration: item.itunes.duration,
        audioInfo: episode.enclosure,
        image: item.itunes.image,
      });
    } else {
      res.status(404).json({ message: "No se encontró el episodio" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

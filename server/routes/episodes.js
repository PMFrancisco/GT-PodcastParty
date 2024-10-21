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
 */

/**
 * @swagger
 * /episodes:
 *   get:
 *     summary: Get the latest 20 episodes
 *     tags: [Episodes]
 *     responses:
 *       '200':
 *         description: A list of the latest 20 episodes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "Episode Title"
 *                   link:
 *                     type: string
 *                     example: "http://example.com/episode"
 *                   pubDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-01T00:00:00Z"
 *                   id:
 *                     type: string
 *                     example: "61641297"
 *                   duration:
 *                     type: string
 *                     example: "00:30:00"
 *                   audioInfo:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         example: "http://example.com/audio.mp3"
 *                       length:
 *                         type: string
 *                         example: "12345678"
 *                       type:
 *                         type: string
 *                         example: "audio/mpeg"
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
      const last20Episodes = feed.items.slice(0, 20);

      const formattedEpisodes = last20Episodes.map((item) => {
        const idNumber = item.guid.match(/\d+$/)[0];

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          id: idNumber,
          duration: item.itunes.duration,
          audioInfo: item.enclosure,
          image: item.itunes.image
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
 *     summary: Get an episode by publication date
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name/episodes: id
 *         required: true
 *         description: The publication date of the episode
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       '200':
 *         description: The episode with the specified publication date
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
 *                   type: string
 *                   example: "00:30:00"
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
        duration: episode.itunes.duration,
        audioInfo: episode.enclosure,
        image: item.itunes.image
      });
    } else {
      res.status(404).json({ message: "No se encontró el episodio" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

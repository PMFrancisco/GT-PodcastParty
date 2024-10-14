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

router.get("/", async (req, res) => {
  try {
    const feed = await fetchFeed();

    if (feed.items && feed.items.length > 0) {
      const last20Episodes = feed.items.slice(0, 20);

      const formattedEpisodes = last20Episodes.map((item) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        duration: item.itunes.duration,
        audioInfo: item.enclosure,
      }));

      res.json(formattedEpisodes);
    } else {
      res.status(404).json({ message: "No se encontraron episodios" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:pubDate", async (req, res) => {
  try {
    const feed = await fetchFeed();

    const episode = feed.items.find(
      (item) => item.pubDate === req.params.pubDate
    );

    if (episode) {
      res.json({
        title: episode.title,
        link: episode.link,
        pubDate: episode.pubDate,
        duration: episode.itunes.duration,
        audioInfo: episode.enclosure,
    });
    } else {
      res.status(404).json({ message: "No se encontró el episodio" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
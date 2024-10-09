const express = require("express")
const router = express.Router();

const Parser = require('rss-parser');
const parser = new Parser();

router.get('/', async (req, res) => {
  try {
    const feedUrl = 'https://pod.link/1285264897.rss';
    const feed = await parser.parseURL(feedUrl);

    if (feed.items && feed.items.length > 0) {
      const last20Episodes = feed.items.slice(0, 20);

      const formattedEpisodes = last20Episodes.map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        length: item.enclosure.length
      }));

      res.json(formattedEpisodes);
    } else {
      res.status(404).json({ message: 'No se encontraron episodios' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los episodios', error });
  }
});

module.exports = router;
const { fetchFeed } = require("../services/feedService");

const formatEpisodes = (episodes) => {
  return episodes.map((item) => {
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
};

const getEpisodes = async (req, res) => {
  try {
    const feed = await fetchFeed();

    if (feed.items && feed.items.length > 0) {
      const page = parseInt(req.query.page) || 1;
      const limit = 20;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const paginatedEpisodes = feed.items.slice(startIndex, endIndex);
      const formattedEpisodes = formatEpisodes(paginatedEpisodes);

      res.json(formattedEpisodes);
    } else {
      res.status(404).json({ message: "No se encontraron episodios" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEpisodeById = async (req, res) => {
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
        image: episode.itunes.image,
      });
    } else {
      res.status(404).json({ message: "No se encontró el episodio" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEpisodes,
  getEpisodeById,
};

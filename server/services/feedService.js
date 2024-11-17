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

module.exports = { fetchFeed };

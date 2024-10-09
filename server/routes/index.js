const express = require("express");
const router = express.Router();

router.use("/episodes", require("./episodes"))

module.exports = router;
const express = require("express");
const router = express.Router();

router.use("/episodes", require("./episodes"))
router.use("/auth", require("./auth"))
router.use("/fav", require("./favorites"))

module.exports = router;
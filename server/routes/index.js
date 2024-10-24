const express = require("express");
const router = express.Router();

router.use("/episodes", require("./episodes"))
router.use("/auth", require("./auth"))

module.exports = router;
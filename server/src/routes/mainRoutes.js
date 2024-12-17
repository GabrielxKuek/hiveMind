const express = require("express");
const router = express.Router();

// define routes
const miscRoute = require("./miscRoute");

// use routes
router.use("/misc", miscRoute);

module.exports = router;

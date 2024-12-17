// INCLUDES
const express = require("express");
const router = express.Router();
const openaiMiddleware = require("../middlewares/openaiMiddleware");
const tavilyMiddleware = require("../middlewares/tavilyMiddleware");
const miscController = require("../controllers/miscController");

// CONTROLLERS
router.get("/", tavilyMiddleware.contextTrend, openaiMiddleware.explainTrend, miscController.explainTrend);

module.exports = router;

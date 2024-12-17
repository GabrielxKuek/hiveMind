require('dotenv').config();
const { tavily } = require("@tavily/core");

// config 
const TAVILY_KEY = process.env.TAVILY_KEY;

// logic
const tvly = tavily({ apiKey: TAVILY_KEY });

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR RESEARCHING TREND
//////////////////////////////////////////////////////
module.exports.researchTrend = async (req, res, next) => {
    const trend = req.body.trend;

    try {
        if (!trend) {
            throw new Error('Missing trend');
        }

        const response = await tvly.search(`What is ${trend}`);
        res.locals.research = response;
        next();
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Error fetching articles' });
    }
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR GENERATING CONTEXT ON TREND
//////////////////////////////////////////////////////
module.exports.contextTrend = async (req, res, next) => {
    const trend = req.body.trend;

    try {
        if (!trend) {
            throw new Error('Missing trend');
        }

        const response = await tvly.searchContext(trend);
        res.locals.context = response;
        next();
    } catch (error) {
        console.error('Error fetching context:', error);
        res.status(500).json({ error: 'Error fetching context' });
    }
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR ANSWERING QUESTION ABOUT TREND
//////////////////////////////////////////////////////
module.exports.answerQNA = async (req, res, next) => {
    const question = req.body.question;
    try {
        if (!question) {
            throw new Error('Missing question');
        }

        const response = await tvly.searchQNA(`${question}`);
        res.locals.answerQNA = response;
        next();
    } catch (error) {
        console.error('Error getting answer:', error);
        res.status(500).json({ error: 'Error getting answer' });
    }
};
require('dotenv').config();
const OpenAI = require("openai");

const OPENAI_KEY = process.env.OPENAI_KEY;

const openai = new OpenAI({ apiKey: `${OPENAI_KEY}` });

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR EXPLAINING TREND
//////////////////////////////////////////////////////
module.exports.explainTrend = async (req, res, next) => {
    const context = res.locals.context;

    try {
        if (!context) {
            throw new Error('Missing context');
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an assistant that helps content creators keep up with trends quickly and reliably, providing concise and accurate explanations of the latest trends." },
                { role: "user", content: `Explain the following trend: ${context}` }
            ],
            stream: false,
        });

        const explanation = response.choices[0]?.message?.content || "No explanation available.";
        res.locals.explanation = explanation;
        next();
    } catch (error) {
        console.error('Error explaining trend:', error);
        res.status(500).json({ error: 'Error explaining trend' });
    }
};
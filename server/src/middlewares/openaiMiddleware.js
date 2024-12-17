require('dotenv').config();
const OpenAI = require("openai");

// config
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
                { role: "user", content: `Based on the following context, summarize the TikTok trend in a concise and engaging way. what it involves, why it resonates with users. Focus on key points and cultural relevance while avoiding unnecessary details or links. keep what you say short and to the point. base your information off of this data: ${context}` }
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
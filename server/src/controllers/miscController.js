// this is misc controller
// this controller is used for miscellaneous functions

module.exports.explainTrend = (req, res, next) => {
    // this function groups the information from tavily and openai to explain the trend
    try {
        const context = res.locals.context;

        res.status(200).json({ explanation: context });

    } catch (error) {
        console.error("Error createNewUser:", error);
        res.status(500).json(error);
    }
};

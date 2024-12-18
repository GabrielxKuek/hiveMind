// this middleware is in charge of fetching video data from tiktok tags
// this uses tiktok-trending-data (my own repo i made for this hackathon) 
// to fetch data on the most popular trends in a configurable day (as of 
// writing this it is set to one day)

////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR FETCHING TRENDING VIDEOS
////////////////////////////////////////////////////
module.exports.fetchTrendingVideos = async (req, res, next) => {
    const { tag, day } = req.body;

    try {
        if (!tag) {
            throw new Error('Missing tag');
        }

        const response = await fetchTrendingVideos(tag, day);
        res.locals.trendingVideos = response;
        next();
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'Error fetching videos' });
    }
}
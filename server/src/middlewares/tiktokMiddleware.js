// this middleware is in charge of fetching video data from tiktok tags
// this uses tiktok-trending-data (my own repo i made for this hackathon) 
// to fetch data on the most popular trends in a configurable day (as of 
// writing this it is set to one day)

////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR FETCHING TRENDING VIDEOS
////////////////////////////////////////////////////
module.exports.fetchTrendingVideos = async (req, res, next) => {
    const { tag, day } = req.body;

    const url = "https://example.org/products.json";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }

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

////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR FETCHING TRENDING TAGS
////////////////////////////////////////////////////

module.exports.fetchTrendingTags = async (req, res, next) => {
    const url = "https://us.tiktok.com/node/share/discover";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching trending tags.\nResponse status: ${response.status}`);
        }

        const json = await response.json();
        let data = json.body[1].exploreList.filter((index) => {
            return index.cardItem.type == 3;
        })
        let trendingTagsList = data.map((index) => {
            return "www.tiktok.com" + index.cardItem.link;
        })

        res.locals.trendingTagsList = trendingTagsList;

        next();

    } catch (error) {
        res.status(500).json({ error: error });
        console.error(error.message);
    }

}

////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR FETCHING TRENDING AUDIO
////////////////////////////////////////////////////

module.exports.fetchTrendingAudio = async (req, res, next) => {
    const url = "https://us.tiktok.com/node/share/discover";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching trending audio.\nResponse status: ${response.status}`);
        }

        const json = await response.json();
        let data = json.body[2].exploreList.filter((index) => {
            return index.cardItem.type == 1;
        })
        let trendingAudioList = data.map((index) => {
            return "www.tiktok.com" + index.cardItem.link;
        })

        res.locals.trendingAudioList = trendingAudioList;

        next();

    } catch (error) {
        res.status(500).json({ error: error });
        console.error(error.message);
    }

}
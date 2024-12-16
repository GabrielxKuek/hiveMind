from TikTokApi import TikTokApi

def get_trending():
    with TikTokApi() as api:
        videos = api.trending.videos(count=30)
        for video in videos:
            print(f"Video ID: {video.id}")

if __name__ == "__main__":
    get_trending()
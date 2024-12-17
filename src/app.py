from flask import Flask, render_template, send_from_directory
import pickle
import os
from collections import defaultdict

app = Flask(__name__)

# Replace the following dictionaries with your data
with open('video_id_name_list.pickle', 'rb') as handle:
    video_id_name_list = pickle.load(handle)

with open('duration_data.pickle', 'rb') as handle:
    duration_data = pickle.load(handle)

with open('clips_data.pickle', 'rb') as handle:
    clips_data = pickle.load(handle)

VIDEO_DIRECTORY = os.path.join(os.path.dirname(os.path.realpath(__file__)), "classify")

@app.route('/<path:filename>')
def serve_video(filename):
    print(VIDEO_DIRECTORY, filename)
    return send_from_directory(directory=VIDEO_DIRECTORY, path=filename)

def get_top_clips(clips_data, num_clips=3):
    top_clips = defaultdict(list)
    for video in clips_data['data']:
        video_id = video['video_id']
        unique_prompts = set()
        for clip_class in video['classes']:
            for clip in clip_class['clips']:
                if clip['prompt'] not in unique_prompts and len(unique_prompts) < num_clips:
                    top_clips[video_id].append(clip)
                    unique_prompts.add(clip['prompt'])
    return top_clips

@app.route('/')
def home():
    video_id_name_dict = {video['video_id']: video['video_name'] for video in video_id_name_list}
    top_clips = get_top_clips(clips_data)
    return render_template('index.html', video_mapping=video_id_name_dict, duration_data=duration_data, top_clips=top_clips)


if __name__ == '__main__':
    app.run(debug=True)
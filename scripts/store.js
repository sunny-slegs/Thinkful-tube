'use strict';

const store = ( function() {
  
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
  const API_KEY = 'AIzaSyBVLPcIuJcvy3Z690ya4qpXQo_4Fv_t1GM';

  const fetchVideos = function(searchTerm, callback) {
    $.getJSON(BASE_URL,
      {
        q: searchTerm,
        key: API_KEY,
        part: 'snippet'
      },
      callback
    );
  };

  const decorateResponse = function(response) {
    return response.items.map(function(item) {
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url
      };
    });
  };
  
  const addVideosToStore = function(videos) {
    store.videos = videos;
    console.log(store.videos);
  };
  
  
  return {
    videos: [],
    fetchVideos,
    decorateResponse,
    addVideosToStore,
  };

}() );
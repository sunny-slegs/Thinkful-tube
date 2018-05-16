'use strict';
/* global store*/
const youTubePage = (function() {

  const generateVideoItemHtml = function(video) {
    return `<li>${video.title}</li>
            <li>${video.id}<li>
            <img src=${video.thumbnail}><img>`;
  };
  
  const render = function() {
    let videoHtmlArray = store.videos.map(function(video) {
      return generateVideoItemHtml(video);
    });
    const videoHtmlString = videoHtmlArray.join('');
    $('.results').html(videoHtmlString);
  };

  const handleFormSubmit = function() {
    $('form').submit(function(event) {
      event.preventDefault();
      const searchTerm = $(event.currentTarget)
        .parent()
        .find('#search-term')
        .val();
      $(event.currentTarget).parent().find('#search-term').val('');
      store.fetchVideos(searchTerm, function(response) {
        let decoratedResponse = store.decorateResponse(response);
        store.addVideosToStore(decoratedResponse);
        render();
      });
    });
  };
   
  const bindEventListeners = function() {
    handleFormSubmit();
  };

  return {
    render, 
    bindEventListeners,
  };


}());
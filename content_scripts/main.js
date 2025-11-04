function addWatchLaterButton(videoElement) {
  // Prevent adding duplicate buttons
  if (videoElement.querySelector('.watch-later-button')) {
    return;
  }

  const watchLaterButton = document.createElement('button');
  watchLaterButton.innerText = 'Add to Watch Later';
  watchLaterButton.className = 'watch-later-button';
  watchLaterButton.style.marginTop = '10px';
  watchLaterButton.style.display = 'none'; // Initially hidden

  videoElement.addEventListener('mouseenter', () => {
    watchLaterButton.style.display = 'block';
  });

  videoElement.addEventListener('mouseleave', () => {
    watchLaterButton.style.display = 'none';
  });

  watchLaterButton.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();

    let linkElement, titleElement, thumbnailElement, channelElement;

    // Try selectors for search results page
    linkElement = videoElement.querySelector('a#video-title');
    if (linkElement) {
      titleElement = linkElement.querySelector('yt-formatted-string');
      thumbnailElement = videoElement.querySelector('img.ytCoreImageLoaded');
      channelElement = videoElement.querySelector('ytd-channel-name yt-formatted-string#text');
    } else {
      // Try selectors for home feed
      linkElement = videoElement.querySelector('a.yt-lockup-metadata-view-model__title');
      if (linkElement) {
        titleElement = linkElement.querySelector('span');
        thumbnailElement = videoElement.querySelector('img.ytCoreImageLoaded');
        channelElement = videoElement.querySelector('a.yt-core-attributed-string__link');
      }
    }

    if (linkElement && titleElement && thumbnailElement && channelElement) {
      const video = {
        url: linkElement.href,
        title: titleElement.innerText,
        thumbnail: thumbnailElement.src,
        channelName: channelElement.innerText,
      };

      browser.runtime.sendMessage({ action: 'saveVideo', video });
    } else {
      console.error('Could not find all required elements');
    }
  });

  const metadata = videoElement.querySelector('#meta, .yt-lockup-metadata-view-model__text-container');
  if (metadata) {
    metadata.appendChild(watchLaterButton);
  } else {
    videoElement.appendChild(watchLaterButton);
  }
}

function observeDOM() {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.matches('ytd-rich-item-renderer, ytd-video-renderer')) {
              addWatchLaterButton(node);
            } else {
              const videos = node.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer');
              videos.forEach(addWatchLaterButton);
            }
          }
        });
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Initial run for already loaded videos
const initialVideos = document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer');
initialVideos.forEach(addWatchLaterButton);

// Observe for dynamically loaded videos
observeDOM();
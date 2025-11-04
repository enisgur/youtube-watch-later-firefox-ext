browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'saveVideo') {
    console.log('Received video in background script:', message.video);
    browser.storage.local.get('videos').then((result) => {
      const videos = result.videos || [];
      videos.push(message.video);
      browser.storage.local.set({ videos });
    });
  }
});
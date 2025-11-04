document.addEventListener('DOMContentLoaded', () => {
  const videoList = document.getElementById('video-list');

  function renderVideoList() {
    browser.storage.local.get('videos').then((result) => {
      const videos = result.videos || [];
      videoList.innerHTML = '';
      videos.forEach((video, index) => {
        const listItem = document.createElement('li');

        const thumbnail = document.createElement('img');
        thumbnail.src = video.thumbnail;

        const videoInfo = document.createElement('div');
        videoInfo.className = 'video-info';

        const titleLink = document.createElement('a');
        titleLink.href = video.url;
        titleLink.target = '_blank';
        const title = document.createElement('div');
        title.className = 'video-title';
        title.textContent = video.title;
        titleLink.appendChild(title);

        const channelName = document.createElement('div');
        channelName.className = 'channel-name';
        channelName.textContent = video.channelName;

        videoInfo.appendChild(titleLink);
        videoInfo.appendChild(channelName);

        const actions = document.createElement('div');
        actions.className = 'actions';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          deleteVideo(index);
        });

        actions.appendChild(deleteButton);

        listItem.appendChild(thumbnail);
        listItem.appendChild(videoInfo);
        listItem.appendChild(actions);

        videoList.appendChild(listItem);
      });
    });
  }

  function deleteVideo(index) {
    browser.storage.local.get('videos').then((result) => {
      const videos = result.videos || [];
      videos.splice(index, 1);
      browser.storage.local.set({ videos }).then(() => {
        renderVideoList();
      });
    });
  }

  renderVideoList();
});
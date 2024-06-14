// Function to check for ads and handle them
function checkForAds(mutations) {
  const adExist = document.getElementsByClassName("ad-showing").length > 0;
  const video = document.getElementsByClassName("video-stream html5-main-video")[0];
  
  if (video) {
    if (adExist) {
      video.playbackRate = 16; // Speed up the video during ads
      video.muted = true; // Mute the video during ads
    } else {
      video.playbackRate = 1; // Reset the playback rate to normal
      video.muted = false; // Unmute the video when ads are not showing
    }
  }

  const skipButton = document.getElementsByClassName("ytp-ad-skip-button ytp-button")[0];
  if (skipButton && !skipButton.clicked) {
    skipButton.click();
    skipButton.clicked = true;
    chrome.runtime.sendMessage({ adsSkipped: true });
  } else if (!adExist) {
    if (skipButton) skipButton.clicked = false;
  }
}

// Set up a MutationObserver to monitor changes in the DOM
const observer = new MutationObserver(checkForAds);
observer.observe(document, { childList: true, subtree: true });

// Initial check for ads
checkForAds();

// Add an interval as a fallback to ensure ads are handled
setInterval(checkForAds, 500);

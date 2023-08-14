// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

const video = document.getElementById('video');
const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

function toggleVideo() {
  video.paused ? video.play() : video.pause();
}

function updatePlayButtonIcon() {
  playButton.innerHTML = video.paused ? '<i class="fa fa-play fa-2x"></i>' : '<i class="fa fa-pause fa-2x"></i>';
}

function updateProgressAndTimestamp() {
  progress.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60).toString().padStart(2, '0');
  let secs = Math.floor(video.currentTime % 60).toString().padStart(2, '0');

  timestamp.textContent = `${mins}:${secs}`;
}

function setVideoProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Event listeners
video.addEventListener('click', toggleVideo);
video.addEventListener('pause', updatePlayButtonIcon);
video.addEventListener('play', updatePlayButtonIcon);
video.addEventListener('timeupdate', updateProgressAndTimestamp);

playButton.addEventListener('click', toggleVideo);
stopButton.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);

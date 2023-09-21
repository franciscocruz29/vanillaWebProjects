// Get DOM elements 
const musicContainer = document.getElementById('music-container'); // main container
const playBtn = document.getElementById('play'); // play button 
const prevBtn = document.getElementById('prev'); // previous song button
const nextBtn = document.getElementById('next'); // next song button

const audio = document.getElementById('audio'); // audio element
const progress = document.getElementById('progress'); // progress bar
const progressContainer = document.getElementById('progress-container'); // progress bar container
const title = document.getElementById('title'); // song title 
const cover = document.getElementById('cover'); // album cover
const currTime = document.querySelector('#currTime'); // current time
const durTime = document.querySelector('#durTime'); // duration

// Song titles
const songs = ['hey', 'summer', 'ukulele']; // array of song titles

// Keep track of song
let songIndex = 2; // current song index

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Load song details 
function loadSong(song) {
  title.innerText = song; // set title
  audio.src = `music/${song}.mp3`; // set audio source
  cover.src = `images/${song}.jpg`; // set cover image
}

// Play song
function playSong() {
  musicContainer.classList.add('play'); // add play class
  playBtn.querySelector('i.fas').classList.remove('fa-play'); // change icon
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play(); // play the song
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play'); // remove play class 
  playBtn.querySelector('i.fas').classList.add('fa-play'); // change icon
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause(); // pause the song
}

// Previous song
function prevSong() {
  songIndex--; // decrement index

  if (songIndex < 0) {
    songIndex = songs.length - 1; // go to last song if first song
  }

  loadSong(songs[songIndex]); // load new song
  playSong(); // play new song
}

// Next song
function nextSong() {
  songIndex++; // increment index

  if (songIndex > songs.length - 1) {
    songIndex = 0; // go to first song if last song
  }

  loadSong(songs[songIndex]); // load new song
  playSong(); // play new song
}

// Update progress bar 
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement; // get duration and current time
  const progressPercent = (currentTime / duration) * 100; // calculate percentage
  progress.style.width = `${progressPercent}%`; // update progress bar width
}

// Click on progress bar
function setProgress(e) {
  const width = this.clientWidth; // get progress bar width
  const clickX = e.offsetX; // click position
  const duration = audio.duration; // audio duration

  audio.currentTime = (clickX / width) * duration; // set audio current time
}

// Update duration and current time displays
function DurTime(e) {
  // Get duration and currentTime
  const { duration, currentTime } = e.srcElement;

  // Calculate minutes and seconds
  let min = Math.floor(currentTime / 60);
  min = min < 10 ? '0' + min : min;

  let sec = Math.floor(currentTime % 60);
  sec = sec < 10 ? '0' + sec : sec;

  // Update currentTime display
  currTime.innerText = `${min}:${sec}`;

  // Calculate duration minutes and seconds
  let min_d = Math.floor(duration / 60);
  min_d = min_d < 10 ? '0' + min_d : min_d;

  let sec_d = Math.floor(duration % 60);
  sec_d = sec_d < 10 ? '0' + sec_d : sec_d;

  // Update duration display
  durTime.innerText = `${min_d}:${sec_d}`;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

audio.addEventListener('timeupdate', DurTime);

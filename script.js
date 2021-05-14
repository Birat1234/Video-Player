const video = document.querySelector('video');
const progessRange = document.querySelector('.progress-range'); 
const progessBar = document.querySelector('.progress-bar'); 
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range'); 
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');
const player = document.querySelector('.player');
const controlsContainer = document.querySelector('controls-container');

// Play & Pause ----------------------------------- //

function showPlayicon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}


function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    }else{
        video.pause();
        showPlayicon();
    }
}

// On video ended show play button icon
video.addEventListener('ended' , showPlayicon);


// Progress Bar ---------------------------------- //

function calculateTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

function updateProgress() {
    progessBar.style.width = `${(video.currentTime/video.duration) * 100}%`;
    currentTime.textContent = `${calculateTime(video.currentTime)} |`;
    duration.textContent = `${calculateTime(video.duration)}`;
}

function setProgress(e) {
    
    const time = (e.offsetX / progessRange.offsetWidth);
    progessBar.style.width = `${time * 100}%`;
    video.currentTime = time * video.duration;
}


// Volume Controls --------------------------- //
let lastVolume = 1;


function changeVolume(e) {
    let volume = (e.offsetX / volumeRange.offsetWidth);
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;

    //Change volume icon depending on volume
    volumeIcon.className = '';
    if (volume > 0.5) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    }else if (volume < 0.5 && volume > 0){
        volumeIcon.classList.add('fas', 'fa-volume-down');
    }else if (volume === 0){
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }

    lastVolume = volume;
    console.log(lastVolume);
}

// Mute Volume
function toggleMute() {

    volumeIcon.className = '';

    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0; 
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title' , 'Unmute');
    }else{
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        if (lastVolume > 0.5) {
            volumeIcon.classList.add('fas', 'fa-volume-up');
        }else if (lastVolume < 0.5 && lastVolume > 0){
            volumeIcon.classList.add('fas', 'fa-volume-down');
        }else if (lastVolume === 0){
            volumeIcon.classList.add('fas', 'fa-volume-off');
        }
    }
}


// Change Playback Speed -------------------- //

function changeSpeed() {
    video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    /*video.classList.add('video-fullscreen');*/
    /*video.classList.add('controls-container');*/
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    /*video.classList.remove('video-fullscreen');*/
  }

  let fullscreen = false; 

  // Toggle Full Screen

  function toggleFullscreen() {
      if (!fullscreen){
        openFullscreen(video);
      } else {
          closeFullscreen(video);
      }
      fullscreen = !fullscreen; 
  }

//Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progessRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
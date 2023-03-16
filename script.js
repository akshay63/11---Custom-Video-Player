/*
 **--------- Project11: Custom Video Player ---------**
 */

//1. Select elements =========================//
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = progress.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip");
const fullScreenBtn = player.querySelector(".fullscreen-btn");

//2. Build out functions =========================//
//togglePlay() - it will implement play() or pause() feature
function togglePlay() {
  // FACT on HTML5 video property: There is no play property but only has 'paused' property
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  // other consise way to implement play()/pause():
  // const method = video.paused ? "play" : "pause";
  // video[method]();
}

//Updating the play/pause icon when we click on video
function updateButton() {
  const icon = this.paused ? "▶" : "⏸";
  toggle.textContent = icon;
}

//Updating the playback time in the video using skip buttons
function skip() {
  // console.log("skipping", typeof this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

//Updating the Volume and PlaybackSpeed
function handleRangeUpdate() {
  // console.log(this);
  // console.log(this.name); //video.volume, video.playbackRate both are the properties of video that we are manipulating here
  // console.log(this.value); //video.value
  video[this.name] = this.value;
}

//Updating the progress bar: a) when we click on play button
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`; //sets the flex-basis CSS property based on percent value set using currentTime and duration properties of video
}
//b) when we drag the progress bar the video time should be changed in Real time: using OffsetX value and offsetWidth of progress element
function scrub(e) {
  // console.log(e);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//Changing video screen size
function fullScreen() {
  video.requestFullscreen();
  // let w = video.videoWidth;
  // let h = video.videoHeight;
  // console.log(w, h);
  // if (w && h) {
  //   video.style.width = w;
  //   video.style.height = h;
  // }
}

//3. Add Event listeners =========================//
//Adding Event Listener on player and play/pause button to trigger togglePlay():
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);

//Adding Event listener on [skip-buttons] elements
skipButtons.forEach((button) => button.addEventListener("click", skip));

//Adding Event listener on range elements
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

//Adding Event listener on video element
video.addEventListener("timeupdate", handleProgress); //timeupdate(updates on time duration) or Try 'progress'(updates on skip buttons) event can be used when the video is updating its timecode

//Adding Event listener on progress element using mouseclick and drag events
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => {
  if (mousedown) {
    scrub(e);
  }

  // new trick instead of above conditional
  // mousedown && scrub(e)
});

progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullScreenBtn.addEventListener("click", fullScreen);

// video.addEventListener("resize", fullScreen);

// THINGS THAT I LEARNED:
//play/pause functionality: use 'paused' property and 'play()' & 'pause()' methods, 'play' & 'pause' events
//skip functionality: use 'currentTime' property
//volume/playbackspeed functionalities: use 'volume' & 'playbackRate' properties
//progress functionality: use 'currentTime' & 'duration' properties, 'timeupdate' event
//fullscreen functionality: use 'requestFullscreen()' API

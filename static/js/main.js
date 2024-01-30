// Fade in when in viewport
const classConfig = {
  "fade-hidden": "fade-show",
  "fade-left-hidden": "fade-left-show",
  "fade-right-hidden": "fade-right-show",
  "fade-top-hidden": "fade-top-show",
  "fade-bottom-hidden": "fade-bottom-show",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    Object.keys(classConfig).forEach(className => {
      if (entry.isIntersecting && entry.target.classList.contains(className)) {
        entry.target.classList.add(classConfig[className]);
      } else {
        entry.target.classList.remove(classConfig[className]);
      }
    });
  });
});

Object.keys(classConfig).forEach(className => {
  const elements = document.querySelectorAll('.' + className);
  elements.forEach((el) => observer.observe(el));
});



// Modal function
var btns = document.querySelectorAll(".modal-button");
var spans = document.querySelectorAll(".close");

btns.forEach(btn => {
  btn.onclick = function() {
    var modal = document.getElementById(this.dataset.modal);
    modal.style.display = "flex";
    window.getComputedStyle(modal).opacity;
    modal.style.opacity = 1;
  }
});

spans.forEach(span => {
  span.onclick = function() {
    var modal = this.parentElement.parentElement;
    modal.style.opacity = 0;
    setTimeout(function() {
      modal.style.display = "none";
    }, 500);
  }
});

window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    var modal = event.target;
    modal.style.opacity = 0;
    setTimeout(function() {
      modal.style.display = "none";
    }, 500);
  }
};

// Email obfuscation
function openEmail() {
  var emailAddress = "welcome@histeward.com";
  var subject = "I want to get in touch!";
  var body = "Hi Steward!";

  var mailtoLink = 'mailto:' + encodeURIComponent(emailAddress) +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);

  window.location.href = mailtoLink;
}

function toggleNav() {
  const navContainer = document.querySelector(".nav-container");
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((nav) => {
    nav.classList.toggle("open");
  });
  navContainer.classList.toggle("open");
}

function toggleTheme() {
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.getAttribute('data-theme');

  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  htmlElement.setAttribute('data-theme', newTheme);
}

function checkThemePreference() {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const htmlElement = document.documentElement;

  if (prefersDarkMode) {
    htmlElement.setAttribute('data-theme', "dark");
  } else {
    htmlElement.setAttribute('data-theme', "light");
  }
}

checkThemePreference()


// mp3 function
const mp3FileUrl = 'static/other/hero_audio_file.mp3';

const audio = new Audio(mp3FileUrl);
const playPauseButton = document.getElementById('playPause');
const progressBarFill = document.querySelector('.progress-bar-fill');

audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', handleAudioEnded);

function updatePlayPauseButtonState() {
  playPauseButton.classList.toggle('playing');
}

function resetSong() {
  audio.currentTime = 0;
  if (audio.paused) {
    audio.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
  }
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    console.log("playing supposedly")
  } else {
    audio.pause();
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    console.log("pausing supposedly")
  }
  updatePlayPauseButtonState();
}


function updateProgressBar() {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBarFill.style.width = `${percentage}%`;
}

function handleAudioEnded() {
  updatePlayPauseButtonState();
}

let mybutton = document.getElementById("scrollUp");

function goHome() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

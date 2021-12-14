//START AUDIO PROGRAMMING

// for legacy browsers
var audio_context = new (window.AudioContext || window.webkitAudioContext)();
var max = 0;
// get the audio element
const audio_element = document.querySelector('audio');

// pass it into the audio context
const source = audio_context.createMediaElementSource(audio_element);
audio_element.loop = true;

//Analyser Node Setup

const analyser = audio_context.createAnalyser();

source.connect(analyser);
analyser.connect(audio_context.destination)

// select our play button
const playButton = document.querySelector('.play');

playButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audio_context.state === 'suspended') {
        audio_context.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
      audio_element.play();
      this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
      audio_element.pause();
      this.dataset.playing = 'false';
    }

}, false);

var freqDomain = new Uint8Array(analyser.frequencyBinCount);
var volume;

//START D3 SECTION
var width = Math.max(960, innerWidth),
    height = Math.max(500, innerHeight);

var x1 = width / 2,
    y1 = height / 2,
    x0 = x1,
    y0 = y1,
    i = 0,
    r = Math.max(width,height) / 2,
    τ = 2 * Math.PI
;

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height)
    

var context = canvas.node().getContext("2d");
context.globalCompositeOperation = "lighter";




d3.timer(function() {
  analyser.getByteFrequencyData(freqDomain);
  let lows = Math.max(...freqDomain.slice(0,300));
  let mids = Math.max(...freqDomain.slice(300,750));
  let highs = Math.max(...freqDomain.slice(750,-1));
  duration = (mids/500+(highs-(lows/7.5))/100);
  context.clearRect(0, 0, width, height);

  var i = 200;
  var z = d3.hsl(++i % 360, 1, duration).rgb(),
      c = "rgba(" + .1*z.r + "," + .4*z.g + "," + 1.5*(z.b) + ",",
      x = x0 += (x1 - x0) * .1,
      y = y0 += (y1 - y0) * .1;

    //   "easeElastic",
    // "easeBounce",
    // "easeLinear",
    // "easeSin",
    // "easeQuad",
    // "easeCubic",
    // "easePoly",
    // "easeCircle",
    // "easeExp",
    // "easeBack"
  d3.select({}).transition()
      .duration(2000000/Math.pow(highs, 1.25))
      .ease("easeExp")
      .tween("circle", function() {
        return function(t) {
          context.strokeStyle = c + (1 - t) + ")";
          context.beginPath();
          context.arc(x, y, r * t, 0, τ);
          context.stroke();
          context.lineWidth = max/20;
          
        };
      });
});

/*
function move() {
  var mouse = d3.mouse(this);
  x1 = mouse[0];
  y1 = mouse[1];
  d3.event.preventDefault();
}
*/

// Track idle state and hide the play/pause button if there's no movement
document.addEventListener('mousemove', resetIdle)
document.addEventListener('click', resetIdle)
document.addEventListener('touchstart', resetIdle)
document.addEventListener('DOMContentLoaded', resetIdle)

var idleTimeout;
function resetIdle() {
  clearTimeout(idleTimeout)
  idleTimeout = setTimeout(idle, 2500)
  playButton.classList.remove('idle')
}

function idle() {
  playButton.classList.add('idle')
}

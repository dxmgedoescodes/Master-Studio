// Mini Web DAW - app.js
// Quick single-file DAW logic using Web Audio API

const pxPerSec = 120; // zoom for timeline
const timelineEl = document.getElementById('timeline');
const rulerEl = document.getElementById('ruler');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const timeDisplay = document.getElementById('timeDisplay');
const addTrackBtn = document.getElementById('addTrackBtn');
const tracksContainer = document.getElementById('tracksContainer');
const filePicker = document.getElementById('filePicker');
const masterVolEl = document.getElementById('masterVol');
const exportBtn = document.getElementById('exportBtn');
const recordMicBtn = document.getElementById('recordMicBtn');
const playheadEl = document.getElementById('playhead');

let audioCtx = null;
let masterGain = null;
let dest = null;

function ensureAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = parseFloat(masterVolEl.value || 1);
    masterGain.connect(audioCtx.destination);
  }
}

masterVolEl.addEventListener('input', () => {
  if (masterGain) masterGain.gain.value = parseFloat(masterVolEl.value);
});

// Data model
let tracks = [];
let nextTrackId = 1;

// Transport
const transport = {
  playing: false,
  startTimestamp: 0, // audioCtx.currentTime when

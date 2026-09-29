console.log("fileInput element:", document.getElementById("fileInput"));

const songs = [
  {
    title: "SoundHelix Song 1",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/id/1015/300"
  },
  {
    title: "SoundHelix Song 2",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/id/1025/300"
  },
  {
    title: "SoundHelix Song 3",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/id/1035/300"
  }
];
let index = 0;
let isShuffle = false;
let repeatMode = "off"; // off -> all -> one -> off

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const seek = document.getElementById("seek");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const muteBtn = document.getElementById("muteBtn");
const playlistEl = document.getElementById("playlistItems");
const countEl = document.getElementById("count");

function loadSong(i) {
  if (i < 0 || i >= songs.length) return;

  index = i;
  const song = songs[i];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  audio.load();
  renderPlaylist();
}

function playSong() {
  const playPromise = audio.play();
  if (playPromise) {
    playPromise.catch(err => console.log("Play blocked:", err));
  }
  playBtn.textContent = "⏸";
  cover.classList.add("spinning");
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶";
  cover.classList.remove("spinning");
}

playBtn.addEventListener("click", () => {
  if (audio.paused) playSong();
  else pauseSong();
});

function nextSong() {
  if (!songs.length) return;

  index = isShuffle
    ? Math.floor(Math.random() * songs.length)
    : (index + 1) % songs.length;
  loadSong(index);
  playSong();
}

function prevSong() {
  if (!songs.length) return;

  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
});

repeatBtn.addEventListener("click", () => {
  if (repeatMode === "off") { repeatMode = "all"; repeatBtn.textContent = "🔁"; }
  else if (repeatMode === "all") { repeatMode = "one"; repeatBtn.textContent = "🔂"; }
  else { repeatMode = "off"; repeatBtn.textContent = "🔁"; }
  repeatBtn.classList.toggle("active", repeatMode !== "off");
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  seek.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});
seek.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (seek.value / 100) * audio.duration;
});

volume.addEventListener("input", () => { audio.volume = volume.value; });
muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? "🔇" : "🔊";
});

audio.addEventListener("ended", () => {
  if (repeatMode === "one") { audio.currentTime = 0; playSong(); }
  else if (repeatMode === "off" && index === songs.length - 1 && !isShuffle) { pauseSong(); }
  else { nextSong(); }
});

function renderPlaylist() {
  if (!playlistEl) return;

  playlistEl.innerHTML = "";
  songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} — ${song.artist}`;
    if (i === index) li.classList.add("playing");
    li.addEventListener("click", () => {
      index = i;
      loadSong(index);
      playSong();
    });
    playlistEl.append(li);
  });

  if (countEl) {
    countEl.textContent = `${songs.length} songs`;
  }
}

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", (e) => {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;

  const firstUploadedIndex = songs.length;

  files.forEach(file => {
    const url = URL.createObjectURL(file);
    songs.push({
      title: file.name.replace(/\.[^/.]+$/, "") || file.name,
      artist: "Uploaded",
      src: url,
      cover: "https://picsum.photos/id/1015/300"
    });
  });

  index = firstUploadedIndex;
  renderPlaylist();
  loadSong(index);

  fileInput.value = "";
});

loadSong(index);
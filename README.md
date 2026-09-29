# CodSoft Frontend Internship: Task 4, Music Player

A web-based music player built with vanilla HTML, CSS, and JavaScript, using the native `<audio>` element. Includes a playlist, shuffle, repeat modes, and local file upload.

## Features

- Play, pause, next, and previous controls
- Displays song title, artist, album art, and duration
- Seekable progress bar synced to playback
- Volume control with mute toggle
- Auto-updating playback time
- Responsive layout for desktop and mobile
- **Bonus:** playlist panel, shuffle mode, repeat modes (off / repeat-all / repeat-one), auto-play next track, rotating album art
- **Bonus:** upload your own local audio files, added instantly to the playlist

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (Flexbox, backdrop-filter, media queries) |
| Logic | JavaScript (ES6) |
| Audio | HTMLMediaElement API (`<audio>`) |
| File upload | File API (`URL.createObjectURL`) |

## Project Structure

```
CODSOFT_TASK4/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Clone the repository:
```bash
   git clone <your-repo-url>
```
2. Open the `CODSOFT_TASK04` folder.
3. Open `index.html` in any modern browser (or use VS Code Live Server).
4. Click "+ Add Music" to upload your own tracks, or use the pre-loaded demo playlist.

No installation or build step is required.

## How It Works

- Songs are stored as an array of objects: `{ title, artist, src, cover }`.
- `loadSong()` updates the title, artist, cover art, and audio source; `renderPlaylist()` rebuilds the playlist UI and highlights the currently playing track.
- Play/pause state is tracked via `audio.paused`; the button icon and spinning album art update in sync.
- The seek bar listens to the audio's `timeupdate` event to move automatically, and lets the user drag it to jump to any point in the track.
- Uploaded files are converted to a temporary playable URL with `URL.createObjectURL()` and pushed into the same songs array, so they inherit all existing playlist/shuffle/repeat behavior.
- Uploaded tracks are session-only (they don't persist after a refresh), since they're local blob URLs rather than stored files.

## Known Limitations

- Uploaded songs are not saved between sessions (no backend or IndexedDB storage).
- Demo playlist uses external sample audio; for submission, replace with royalty-free tracks (Pixabay Music, Free Music Archive, or YouTube Audio Library).

## Author

**Sudhanshu**
Final-year B.Tech CSE (AI & ML), Khwaja Moinuddin Chishti Language University
LinkedIn: <https://www.linkedin.com/in/sudhanshu-singh-6816642a6/v>

#codsoft #internship #webdevelopment
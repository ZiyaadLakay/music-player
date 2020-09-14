const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName:'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName:'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName:'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName:'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
]

// Check if Playing
let isPlaying = false;

// Play
const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause')
    music.play();
}

// Pause
const pauseSong = () => {
    isPlaying = false
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('title','Play')
    music.pause();
}

// Play/Pause Event Listener
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

// Update DOM
const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

// Current Song
let songIndex = 0

const prevSong = () => {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
const nextSong = () => {
    songIndex++;
    if(songIndex === songs.length){
        songIndex = 0
    }
    loadSong(songs[songIndex]);
    playSong();
}


// On Load - Select first song
loadSong(songs[songIndex])

// Update Progress Bar
const updateProgressBar = (e) => {
    if (isPlaying){
        const {duration, currentTime} = e.srcElement;
        // Update Progress Bar
        const percent = (currentTime / duration) * 100
        progress.style.width = `${percent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }
        // Delay switching duration to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        
        // Calculate display for currentTime
        const currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if(currentTimeSeconds < 10){
            currentTimeSeconds = `0${currentTimeSeconds}`
        }
        // Delay switching duration to avoid NaN
        if(currentTimeSeconds){
            currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
        }
    }
}

const setProgressBar = (e) => {

    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;

    music.currentTime = (clickX / width) * duration;
} 

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate', updateProgressBar)
music.addEventListener('ended',nextSong)
progressContainer.addEventListener('click', setProgressBar)
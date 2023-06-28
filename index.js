console.log("Welcome to Spotify")

let songIndex = 0;//ki konsa song chl rha h
let AudioElement = new Audio('songs/1.mp3')
//AudioElement.play()
let masterPlay = document.getElementById('masterPlay')
let progressbar = document.getElementById('progressbar')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem'))
let masterplaysong = document.getElementById('masterplaysong')

let songs = [
    {songName: 'Hawa banke ', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg'},
    {songName: 'Rabba janta', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg'},
    {songName: 'Ishq Kru', filePath: 'songs/3.mp3', coverPath: 'covers/3.jpg'},
    {songName: 'Salam-e-Ishq', filePath: 'songs/4.mp3', coverPath: 'covers/4.jpg'},
    {songName: 'Rabta - Salam-e-Ishq', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg'},
    {songName: 'Sodiye - Salam-e-Ishq', filePath: 'songs/6.mp3', coverPath: 'covers/6.jpg'},
    {songName: 'Mahi-ve - Salam-e-Ishq', filePath: 'songs/7.mp3', coverPath: 'covers/7.jpg'},
    {songName: 'Raste - Salam-e-Ishq', filePath: 'songs/8.mp3', coverPath: 'covers/8.jpg'},
    {songName: 'No Entry - Salam-e-Ishq', filePath: 'songs/9.mp3', coverPath: 'covers/9.jpg'},
    {songName: 'Salam-e-Ishq', filePath: 'songs/10.mp3', coverPath: 'covers/10.jpg'}
]

songItems.forEach((element,i) => {
    // console.log(element,i)
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songname')[0].innerText = songs[i].songName
});


//handle play/pause click
masterPlay.addEventListener('click', () => {
    if(AudioElement.paused || AudioElement.currentTime <= 0){
        AudioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1
    }
    else{
        AudioElement.pause()
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0
    }
})

//listen to events
//slide ki time change krne k lie event = timeUpdate
AudioElement.addEventListener('timeupdate', () => {
    //seekbar ko update krna h
    let progressInPercentage = parseInt((AudioElement.currentTime/AudioElement.duration)*100)
    //currtime shows how much played and duration shows the whole time
    // console.log(progressInPercentage)
    progressbar.value = progressInPercentage
})
progressbar.addEventListener('change', () => {
    AudioElement.currentTime = (progressbar.value * AudioElement.duration)/100
})

//makeAllPlays function
function makeAllPlays(){
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle')
       element.classList.add('fa-play-circle')
   })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
     element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id)
        makeAllPlays()
        e.target.classList.remove('fa-play-cicle')
        e.target.classList.add('fa-pause-circle')
        AudioElement.src = `songs/${songIndex+1}.mp3`
        masterplaysong.innerText = songs[songIndex].songName;
        AudioElement.currentTime = 0
       
        AudioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1
        
     })
})


//preveous and next button functionality
document.getElementById('next').addEventListener('click', () => {
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1
    }
    AudioElement.src = `songs/${songIndex+1}.mp3`
    masterplaysong.innerText = songs[songIndex].songName;
    AudioElement.currentTime = 0
    // masterplaysong.innerText = songs[songIndex].songName
    AudioElement.play()
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity = 1
})

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex<=0){
        songIndex = 9
    }
    else{
        songIndex -= 1
    }
    AudioElement.src = `songs/${songIndex+1}.mp3`
    masterplaysong.innerText = songs[songIndex].songName;
    AudioElement.currentTime = 0
    // masterplaysong.innerText = songs[songIndex].songName
    AudioElement.play()
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity = 1
})


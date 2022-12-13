console.log('welcome to my spotify')

// Initialize the Variables
let songIndex = 0
let audioElement = new Audio('Songs/1.mp3')
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar")
// let gif = document.getElementById("gif")
let CMinute = document.getElementById("CMinute")
let CSecond = document.getElementById("CSecond")
let DMinute = document.getElementById("DMinute")
let DSecond = document.getElementById("DSecond")
let songBannerImg = document.getElementById("songBannerImg")
let masterSongName = document.getElementById("masterSongName")
let songItems = Array.from(document.getElementsByClassName('songItem'))
let first = Array.from(document.getElementsByClassName('first'))
let songs = [
    {songName: "Chandaliyo Ugyo Re", filePath: "Songs/1.mp3", coverPath: "Covers/1.jpg", audioLen: "02:21"},
    {songName: "Ik Tu Hi", filePath: "Songs/2.mp3", coverPath: "Covers/2.jpg", audioLen: "03:16"},
    {songName: "Main Nahi To Kon Be", filePath: "Songs/3.mp3", coverPath: "Covers/3.jpg", audioLen: "02:43"},
    {songName: "Ram Ram", filePath: "Songs/4.mp3", coverPath: "Covers/4.jpg", audioLen: "03:33"},
    {songName: "Summer High", filePath: "Songs/5.mp3", coverPath: "Covers/5.jpg", audioLen: "02:57"},
]

songItems.forEach((Element,i) => {
    // console.log(Element,i)+
    Element.getElementsByTagName('img')[0].src = songs[i].coverPath
    Element.getElementsByClassName('songName')[0].innerText = songs[i].songName
    Element.getElementsByClassName('timestamp')[0].innerText = songs[i].audioLen 
})
// audioElement.play()
// Handle Banner Img 


// Handle play/pause click 

masterPlay.addEventListener('click', ()=>{
    console.log("MasterPlay")
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play()
        let a = audioElement.src.slice(-5,-4)
        console.log(a)
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        // gif.style.opacity = "1"
        songBannerImg.style.opacity = "1"
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
            if(element.id==(a-1))
            {
                console.log("a")
                element.classList.remove("fa-circle-play")
                element.classList.add("fa-circle-pause")
                element.parentNode.parentNode.firstElementChild.style.animation = "loop 1.5s infinite linear"
            }
        })
        // Array.from(document.getElementsByClassName('songItem')).forEach((element)=> {
            // console.log(element.firstChild.nextSibling)
            // if(element.children.src == `Covers/${songIndex+1}.jpg`){
            //     console.log(element.children)
            //     console.log("jznksb")
            // }
        // })
    }
    else
    {
        audioElement.pause()
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        // gif.style.opacity = "0"
        songBannerImg.style.opacity = "0"
        makeAllPlays()
        makeLoopPause()
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=> {
    // Update Seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress

    // console.log(audioElement.duration)
    DMinute.innerText = parseInt(isNaN(audioElement.duration) ? "00" : audioElement.duration/60)
    DSecond.innerText = parseInt(isNaN(audioElement.duration) ? "00" : audioElement.duration%60)

    CMinute.innerText = parseInt(audioElement.currentTime/60)
    CSecond.innerText = parseInt(audioElement.currentTime%60)
    if(audioElement.currentTime === audioElement.duration)
    {
        console.log("equal to")
        audioElement.pause()
        console.log(songIndex)

        if(songIndex<4)
        songIndex = songIndex+1
        else
        songIndex = 0

        makeAllPlays()
        makeLoopPause()
        audioElement.src = `Songs/${songIndex+1}.mp3`
        let x = songIndex
        console.log(x)
        songBannerImg.src = songs[songIndex].coverPath
        songBannerImg.style.opacity = "1"
        masterSongName.innerText = songs[songIndex].songName
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
            if(element.id==(x))
            {
                console.log("a")
                element.classList.remove("fa-circle-play")
                element.classList.add("fa-circle-pause")
                element.parentNode.parentNode.firstElementChild.style.animation = "loop 1.5s infinite linear"
            }
            console.log(element.firstChild)
        })
        audioElement.play()

    }
})

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
        
    })
}
const makeLoopPause = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        element.parentNode.parentNode.firstElementChild.style.animation = "none"
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
    element.addEventListener('click',(e)=>{
        
        let targetParent = e.target.parentNode
        let targetParentParent = targetParent.parentNode
        let targetSibling = targetParentParent.firstElementChild
        
        // console.log(targetParent.innerHTML+"ajdhksbdsbdjy")
        // console.log(targetSibling.src+"ajdhksbdsbdjy")
        if(e.target.className.match('fa-circle-play'))
        {
            makeAllPlays()

            songIndex = parseInt(e.target.id)
            masterSongName.innerText = songs[songIndex].songName
            songBannerImg.src = songs[songIndex].coverPath
            songBannerImg.style.opacity = "1"
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            audioElement.src = `Songs/${songIndex+1}.mp3`
            audioElement.currentTime = 0
            audioElement.play()
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
            // gif.style.opacity = "1"
            console.log("It's Work")
            // console.log(e.target.previousElementSibling+"helloooo")
            
            // e.target.firstChild.style.animation = "loop 1.5s infinite linear"
            makeLoopPause()
            targetSibling.style.animation = "loop 1.5s infinite linear"
        }
        else 
        {
            audioElement.pause()
            
            songBannerImg.style.opacity = "0"
            // gif.style.opacity = "0"
            targetSibling.style.animation = "none"

            e.target.classList.remove('fa-circle-pause')
            e.target.classList.add('fa-circle-play')
            masterPlay.classList.remove('fa-circle-pause')
            masterPlay.classList.add('fa-circle-play')
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4)
    {
        songIndex = 0
    }
    else {
        songIndex +=1
    }
    makeAllPlays()
    makeLoopPause()
    console.log(songIndex)
    audioElement.src = `Songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0
    masterSongName.innerText = songs[songIndex].songName
    songBannerImg.src = songs[songIndex].coverPath
    songBannerImg.style.opacity = "1"
    let a = audioElement.src.slice(-5,-4)
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        if(element.id==(a-1))
        {
            console.log("a")
            element.classList.remove("fa-circle-play")
            element.classList.add("fa-circle-pause")
            element.parentNode.parentNode.firstElementChild.style.animation = "loop 1.5s infinite linear"
        }
    })
    masterPlay.className.match('fa-circle-play')
    {
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
    }
    // gif.style.opacity = "1"
    audioElement.play()
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0)
    {
        songIndex = 4
    }
    else {
        songIndex -=1
    }
    makeAllPlays()
    makeLoopPause()
    console.log(songIndex)
    audioElement.src = `Songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0
    masterSongName.innerText = songs[songIndex].songName
    songBannerImg.src = songs[songIndex].coverPath
    songBannerImg.style.opacity = "1"
    let a = audioElement.src.slice(-5,-4)
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        if(element.id==(a-1))
        {
            console.log("a")
            element.classList.remove("fa-circle-play")
            element.classList.add("fa-circle-pause")
            element.parentNode.parentNode.firstElementChild.style.animation = "loop 1.5s infinite linear"
        }
    })
    masterPlay.className.match('fa-circle-play')
    {
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
    }
    // gif.style.opacity = "1"
    audioElement.play()
})




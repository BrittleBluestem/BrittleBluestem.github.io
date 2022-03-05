function changePlayImage() {

    if (document.getElementById("playButton").value == "play"){
        document.getElementById("playButton").src = "images/pause.png";
        document.getElementById("playButton").value = "pause";
        document.getElementById("podcast").play();
    }
    else{
        document.getElementById("playButton").src = "images/play.png";
        document.getElementById("playButton").value = "play";
        document.getElementById("podcast").pause();

    }

function changeFollowImage(){
    document.getElementById("followButton").src = "images/logos/Spotify_Icon_RGB_White.png";

}
}


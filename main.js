peter_pan_song = "";
harry_potter_theme_song = "";
rightWristx = 0
rightWristy = 0
leftWristx = 0
leftWristy = 0
leftWristscore = 0
rightWristscore = 0
peter_pan_song_isplaying = "";
harry_potter_theme_song_isplaying = "";

function setup() {
    canvas = createCanvas(450, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotresults)
}

function modelLoaded() {
    console.log('poseNet is initialised')
}

function gotresults(results) {
    if (results.length > 0) {
        console.log(results)

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristx=" + leftWristx + "leftWristy=" + leftWristy);
        leftWristscore = results[0].pose.keypoints[9].score;
        console.log(leftWristx);
        console.log(leftWristscore);


        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristx=" + rightWristx + "rightWristy=" + rightWristy);
        rightWristscore = results[0].pose.keypoints[10].score;
        console.log(rightWristscore)

    }
}


function draw() {
    image(video, 0, 0, 450, 400)
    peter_pan_song_isplaying = peter_pan_song.isPlaying()
harry_potter_theme_song_isplaying = harry_potter_theme_song.isPlaying()
    fill('red');
    stroke('blue');

    if (leftWristscore > 0.2) {
        circle(leftWristx, leftWristy, 20)
        harry_potter_theme_song.stop()
        if (peter_pan_song_isplaying == false) {
            peter_pan_song.play();
        
            document.getElementById("song").innerHTML = "song name: peter pan song"
        }
    }

    if(rightWristscore > 0.2){
        circle(rightWristx, rightWristy, 20)
        peter_pan_song.stop()
        if(harry_potter_theme_song_isplaying == false){
            harry_potter_theme_song.play();

            document.getElementById("song").innerHTML = "song name: harry potter song"
        }
    }



}

function preload() {
    peter_pan_song = loadSound("music2.mp3")
    harry_potter_theme_song = loadSound("music.mp3")
}

function play() {
    sound1.play()
    sound2.play()
}


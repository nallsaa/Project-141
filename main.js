objects = [];
status = "";
video = "";
rightWristX = "";
rightWristY = "";
rightWristScore = "";

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    if (game_status == "start") {
        background(0);
        image(video, 0, 0, 700, 600);

        fill("#FF0000");
        stroke("black");
        rect(680, 0, 0, 20, 700);
    }

    if (rightWristScore > 0.2) {
        fill("red");
        stroke("red");
        circle(rightWristX, rightWristY, 30);
    }


}




function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function restart() {

}

function gotPoses(results) {
    if (results.length > 0) {
        rightWristX = results[0].pose.wrist.x;
        rightWristY = results[0].pose.wrist.y;
        rightWristScore = result[0].pose.keypoints[10].score;
        console.log(rightWristScore);
    }
}

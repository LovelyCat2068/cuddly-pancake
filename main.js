status = "";
objects = [];

function setup(){
    canvas = canvas.createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    pumpkin = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_value = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("model loaded");
    status = true;
    objectDetector.detect(video, gotResults);
}

function draw(){
    image(video, 0, 0, 500, 500);

    if(status = true){
        for(i=0; i < objects.length; 1++){
            confidence = object[i].confidence;
            confidence_percentage = confidence * 100;
            label = object[i].label;
            obx = object[i].x;
            oby = object[i].y;
            fill("#eb4034");
            nofill();
            stroke("#eb4034");
            rect(obx, oby, object[i].width, object[i].height);
        }
    }
    if(object = input_value){
        video.stop();
        objectDetector.detect(gotResults);
        document.getElementById("status").innerHTML = input_value +" Found";
        speech = window.speechSynthesis;
        utterThis = new SpeechSynthesisUtterance(input_value +" has been found");
        speech.speak(utterThis);
    }
    else{
        document.getElementById("status").innerHTML = input_value +" not found";
    }
}


function gotResults(error, result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}
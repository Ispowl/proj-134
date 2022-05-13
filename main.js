status = "";
sound = "";
object = "";
video="";
function preload(){
    sound = loadSound("alarm.mp3");
}
function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640,420);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status = detecting objects";
}
function modelLoaded(){
    console.log('Model is loaded!');
    status = true;
    objectDetector.detect(video,gotResults);
}

function gotResults(error,results){
   if(error){
       console.log(error);
   }
   console.log(results);
   object = results;
}
function draw(){
    image(video,0,0,640,420);
    if(status != ""){
        for(i= 0; i <object.length();i++){
         document.getElementById = "There are"+object.length+" big objects detected from cocossd from __ big objects in the image";
         fill("#FF0000");
         percent = floor(object[i].confidence *100);
         text(object[i].label+""+percent+"%",object[i].x,object[i].y);
         noFill();
         stroke("#FF0000");
         rect(object[i].x,object[i].y,object[i].width,object[i].height);
         if(object = "person"){
          sound.stop();
          document.getElementById("status").innerHTML = "Baby is safe";
          
         }
         else{
          sound.play();
          document.getElementById("status").innerHTML = "BABY IS NOT FOUND";
         }
        }
    }
}

function play(){
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}
Webcam.set({
    width: 350,
    height:300 ,
    image_format:'png',
    png_quality: 90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log('ml5.version',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Jpoga6ITy/model.json',modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

prediction1= "";
prediction2= "";

function speak(){
    var synth= window.speechSynthesis;
    speak_data_1= "The first prediction is "+ prediction1;
    speak_data_2= "And second prediction is "+ prediction2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis); 
}

function check(){
    img= document.getElementById("captured_image");
    classifier.classify(img,gotResult);

}

function gotResult(error,results){
    if (error){
        console.error(error);
        
    }

    else{
        console.log(results);
        prediction1= results[0].label;
        prediction2= results[1].label;

        document.getElementById("result_emotion_name").innerHTML= prediction1;
        document.getElementById("result_emotion_name2").innerHTML= prediction2;
        speak();

        if(prediction1=="This is looking amazing"){
            document.getElementById("update_emoji").innerHTML= "&#9996;";
        }

        if(prediction1=="All the best"){
            document.getElementById("update_emoji").innerHTML= "&#128076;";
        }

        if(prediction1=="That was a marvelous Victoria"){
            document.getElementById("update_emoji").innerHTML= "&#128545";
        }

        if(prediction2=="This is looking amazing"){
            document.getElementById("update_emoji2").innerHTML= "&#9996;";
        }

        if(prediction2=="All the best"){
            document.getElementById("update_emoji2").innerHTML= "&#128076;";
        }

        if(prediction2=="That was a marvelous Victoria"){
            document.getElementById("update_emoji2").innerHTML= "&#128545";
        }

        

    }
}
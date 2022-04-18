getAbout();

function getAbout(){
    getInfo("about",setAbout);
}

function setAbout(aboutData){
    console.log(aboutData);
    document.getElementById("aboutBigTitle").innerHTML = aboutData[0].acf.big_title;
    document.getElementById("aboutSubTitle").innerHTML = aboutData[0].acf.sub_title;
    document.getElementById("aboutDetails").innerHTML = aboutData[0].acf.details_about;
    getInfo("media/"+aboutData[0].acf.about_image,setAboutImage);
}

function setAboutImage(aboutImage){
    document.getElementById("center_about").style.backgroundImage = "url("+aboutImage.source_url+")";
}
getFeild();

function getFeild(){
    const urlParams = new URLSearchParams(window.location.search);
    getInfo("feilds/"+urlParams.get("id")+"?_embed",ShowFeild);
}

function ShowFeild(data){
    console.log(data);
    document.getElementById("feildTitle").innerHTML = data.title.rendered;
    document.getElementById("feildContent").innerHTML = data.acf.description;
    // document.getElementById("blogWriter").innerHTML =data._embedded["acf:post"][0].acf.name;
    // document.getElementById("blogWriter").href = "./people.html?id="+data._embedded["acf:post"][0].id;
    // document.getElementById("publishDate").innerHTML =", "+ new Date(data.date.toString()).toUTCString();
    // let imgUrl = data._embedded["wp:featuredmedia"][0].source_url;
    // document.getElementById("event_banner").style.backgroundImage = "url("+imgUrl+")";
    getInfo("media/"+data.acf.image,loadImage);
}

function loadImage(imageData){
    document.getElementById("field_banner").style.backgroundImage = "url("+imageData.source_url+")";
}


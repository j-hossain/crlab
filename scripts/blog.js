getBlog();

function getBlog(){
    const urlParams = new URLSearchParams(window.location.search);
    getInfo("blog/"+urlParams.get("id")+"?_embed",ShowPerson);
}

function ShowPerson(data){
    console.log(data);
    document.getElementById("blogTitle").innerHTML = data.title.rendered;
    document.getElementById("blogContent").innerHTML = data.content.rendered;
    document.getElementById("blogWriter").innerHTML =data._embedded["acf:post"][0].acf.name;
    document.getElementById("blogWriter").href = "./people.html?id="+data._embedded["acf:post"][0].id;
    document.getElementById("publishDate").innerHTML =", "+ new Date(data.date.toString()).toUTCString();
    let imgUrl = data._embedded["wp:featuredmedia"][0].source_url;
    console.log(imgUrl);
    document.getElementById("event_banner").style.backgroundImage = "url("+imgUrl+")";
    // document.getElementById("personDesignation").innerHTML = data.acf.designation;
    // document.getElementById("personResearchArea").innerHTML = data.acf.research_area;
    // document.getElementById("personLinkedin").href = data.acf.linkedin;
    // document.getElementById("personGoogleScholar").href = data.acf.scholar;
    // document.getElementById("personResearchGate").href = data.acf.research_gate;
    // getInfo("media/"+data.acf.profile_image,loadImage);
}

function loadImage(imageData){
    document.getElementById("personImage").src = imageData.source_url;
}

function getblogCategories(data){
    let cats = "";
    let flag = false;
    // console.log(data._embedded["wp:term"]);
    let catos = data._embedded["wp:term"][0];
    let x = catos.length;
    console.log(catos);
    for(let i=x-1;i>=0;i--){
        if(flag){
            cats+=", ";
        }
        else{
            flag=true;
        }
        cats +=catos[i].name;
    }
    return cats;
}
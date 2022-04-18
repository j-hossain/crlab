getBanner();
getAbout();
getPublications();

function getBanner(){
    getInfo("banner",setBanner);
}

function setBanner(bannerData){
    document.getElementById("bannerSmallText").innerHTML = bannerData[0].acf.small_text;
    document.getElementById("bannerLargeText").innerHTML = bannerData[0].acf.large_text;
    getInfo("media/"+bannerData[0].acf.image,setBannerImage);
}

function setBannerImage(BannerImage){
    console.log(BannerImage);
    document.getElementById("center").style.backgroundImage = "url("+BannerImage.source_url+")";
}

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
    console.log(aboutImage);
    document.getElementById("aboutImage").src = aboutImage.source_url;
}


function getPublications(){
    getInfo("publications?_embed",showPublicationList);
}

function showPublicationList(list){
    let pubParent = document.getElementById("listOfPublications");
    let pubTemplate = document.getElementById("publicationTemplate");
    for(let i=0;i<min(3,list.length);i++){
        let pubBox = document.createElement('div');
        pubBox.innerHTML = pubTemplate.outerHTML;
        pubBox = pubBox.firstChild;
        pubBox.classList.remove("disNone");
        pubBox.id="";
        pubBox = setPublicationInfo(list[i],pubBox);
        pubParent.append(pubBox);
    }
}

function setPublicationInfo(data, div){
    let p = div.querySelector(".publicationInfo");
    let a = div.querySelector(".PublicationLink");
    a.href = "./publication.html?id="+data.id;
    p.innerHTML = getAuthors(data) + " (" + data.acf.publish_year + ") " + data.acf.publication_tilte;
    return div;
}

function getAuthors(data){
    let as = "";
    let flag = false;
    let x = data._embedded["acf:post"].length;
    console.log(data);
    for(let i=x-1;i>=0;i--){
        let a = document.createElement('a');
        a.href = "./people.html?id="+data._embedded["acf:post"][i].id;
        a.innerHTML = data._embedded["acf:post"][i].acf.name;
        if(flag){
            as+=", ";
        }
        else{
            flag=true;
        }
        as +=a.outerHTML;
    }
    return as;
}
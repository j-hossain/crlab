let mediaData;
init();

function initFunctions(data){
    mediaData = arrangeMediaById(data);
    getBanner();
    getAllFields();
    getAbout();
    getPublications();
    getAllPeople();
    getAllBlogs();
}

function arrangeMediaById(data){
    let ret = {};
    for(let i=0;i<data.length;i++){
        ret[data[i].id] = data[i];
    }
    return ret;
}

function init(){
    //getting all media files at the beginign
    getInfo("media",initFunctions);
}

function getBanner(){
    getInfo("banner",setBanner);
}

function setBanner(bannerData){
    document.getElementById("bannerSmallText").innerHTML = bannerData[0].acf.small_text;
    document.getElementById("bannerLargeText").innerHTML = bannerData[0].acf.large_text;
    getInfo("media/"+bannerData[0].acf.image,setBannerImage);
}

function setBannerImage(BannerImage){
    document.getElementById("center").style.backgroundImage = "url("+BannerImage.source_url+")";
}

// working on fields

function getAllFields(){
    getInfo("feilds",setAllFields);
}


function setAllFields(fieldData){
    let fieldParent = document.getElementById("allFieldDiv");
    let fieldTemplate = document.getElementById("fieldTemplate");
    let min = fieldData.length;
    if(min>3){
        min = fieldData.length-3;
    }
    else{
        min=0;
    }
    for(let i=fieldData.length-1;i>=min;i--){
        let fieldBox = document.createElement('div');
        fieldBox.innerHTML = fieldTemplate.outerHTML;
        fieldBox = fieldBox.firstChild;
        fieldBox.classList.remove("disNone");
        fieldBox.id="";
        fieldBox = setFieldInfo(fieldData[i],fieldBox);
        fieldParent.append(fieldBox);
    }
}

function setFieldInfo(fieldData, div){
    div.querySelector(".title").innerHTML = fieldData.title.rendered;
    div.querySelector(".title").href = "./pages/field.html?id="+fieldData.id;
    div.querySelector(".shortDescription").innerHTML = new String(fieldData.acf.description).slice(0,100) + ".....";
    div.querySelector(".image").src=mediaData[fieldData.acf.image].source_url;
    return div;
}

function getAbout(){
    getInfo("about",setAbout);
}

function setAbout(aboutData){
    document.getElementById("aboutBigTitle").innerHTML = aboutData[0].acf.big_title;
    document.getElementById("aboutSubTitle").innerHTML = aboutData[0].acf.sub_title;
    document.getElementById("aboutDetails").innerHTML = new String(aboutData[0].acf.details_about).slice(0,400) + ".....";
    document.getElementById("aboutImage").src=mediaData[aboutData[0].acf.about_image].source_url;
}


function getPublications(){
    getInfo("publications?_embed",showPublicationList);
}

function showPublicationList(list){
    let pubParent = document.getElementById("listOfPublications");
    let pubTemplate = document.getElementById("publicationTemplate");
    let max = list.length;
    if(max>3)
        max=3;
    for(let i=0;i<max;i++){
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
    a.href = "./pages/publication.html?id="+data.id;
    p.innerHTML = getAuthors(data) + " (" + data.acf.publish_year + ") " + data.acf.publication_tilte;
    return div;
}

function getAuthors(data){
    let as = "";
    let flag = false;
    let x = data._embedded["acf:post"].length;
    for(let i=x-1;i>=0;i--){
        let a = document.createElement('a');
        a.href = "./pages/people.html?id="+data._embedded["acf:post"][i].id;
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

function getAllPeople(){
    getInfo("people",setAllPeople);
}

function setAllPeople(peopleData){
    let pepParent = document.getElementById("allPeopleDiv");
    let pepTemplate = document.getElementById("personTemplate");
    let min = peopleData.length;
    if(min>3){
        min = peopleData.length-3;
    }
    else min = 0;
    for(let i=peopleData.length-1;i>=min;i--){
        let peopleBox = document.createElement('div');
        peopleBox.innerHTML = pepTemplate.outerHTML;
        peopleBox = peopleBox.firstChild;
        peopleBox.classList.remove("disNone");
        peopleBox.id="";
        peopleBox = setPersonInfo(peopleData[i],peopleBox);
        pepParent.append(peopleBox);
    }
}

function setPersonInfo(personData, div){
    div.querySelector(".personName").innerHTML = personData.acf.name;
    div.querySelector(".personName").href = "./pages/people.html?id="+personData.id;
    div.querySelector(".personDesignation").innerHTML = personData.acf.designation;
    div.querySelector(".personResearchArea").innerHTML = personData.acf.research_area;
    div.querySelector(".personLinkedin").href = personData.acf.linkedin;
    div.querySelector(".personGoogleScholar").href = personData.acf.scholar;
    div.querySelector(".personResearchGate").href = personData.acf.research_gate;
    div.querySelector(".personImage").src=mediaData[personData.acf.profile_image].source_url;
    return div;
}

//working on getting some recent blogs
function getAllBlogs(){
    getInfo("blog?_embed",setAllBlogs);
}

function setAllBlogs(blogData){
    let blogParent = document.getElementById("allBlogDiv");
    let blogTemplate = document.getElementById("blogTemplate");
    let min = blogData.length;
    if(min>3){
        min = blogData.length-3;
    }
    else min = 0;
    for(let i=blogData.length-1;i>=min;i--){
        let blogBox = document.createElement('div');
        blogBox.innerHTML = blogTemplate.outerHTML;
        blogBox = blogBox.firstChild;
        blogBox.classList.remove("disNone");
        blogBox.id="";
        blogBox = setBlogInfo(blogData[i],blogBox);
        blogParent.append(blogBox);
    }
}

function setBlogInfo(blogData, div){
    div.querySelector(".blogImage").src=mediaData[blogData.featured_media].source_url;
    div.querySelector(".blogWriter").innerHTML = getAuthors(blogData);
    div.querySelector(".blogCategories").innerHTML = getblogCategories(blogData);
    div.querySelector(".blogTitle").innerHTML = blogData.title.rendered;
    div.querySelector(".blogTitle").href = "./pages/blog.html?id=" + blogData.id;
    div.querySelector(".blogLink").href = "./pages/blog.html?id=" + blogData.id;
    div.querySelector(".blogExerpt").innerHTML = blogData.excerpt.rendered;
    div.querySelector(".publishDate").innerHTML = new Date(blogData.date.toString()).toUTCString();
    return div;
}

function getblogCategories(data){
    let cats = "";
    let flag = false;
    let catos = data._embedded["wp:term"][0];
    let x = catos.length;
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
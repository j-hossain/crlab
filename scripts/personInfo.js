getPerson();

function getPerson(){
    const urlParams = new URLSearchParams(window.location.search);
    getInfo("people/"+urlParams.get("id"),ShowPerson);
    getInfo("publications?_embed",getPublicationList);
}

function ShowPerson(data){
    document.getElementById("personName").innerHTML = data.acf.name;
    document.getElementById("personDesignation").innerHTML = data.acf.designation;
    document.getElementById("personResearchArea").innerHTML = data.acf.research_area;
    document.getElementById("personLinkedin").href = data.acf.linkedin;
    document.getElementById("personGoogleScholar").href = data.acf.scholar;
    document.getElementById("personResearchGate").href = data.acf.research_gate;
    getInfo("media/"+data.acf.profile_image,loadImage);
}

function loadImage(imageData){
    document.getElementById("personImage").src = imageData.source_url;
}

function getPublicationList(pubs){
    console.log(pubs);
    let listPubs = new Array();
    const urlParams = new URLSearchParams(window.location.search);
    const personId = parseInt(urlParams.get("id"));
    for(let i=0;i<pubs.length;i++){
        for(j=1;j<=5;j++){
            if(pubs[i].acf["author_"+j]==personId){
                listPubs.push(pubs[i]);
                break;
            }
        }
    }
    showPublicationList(listPubs);
}

function showPublicationList(list){
    console.log(list);
    let pubParent = document.getElementById("listOfPublications");
    let pubTemplate = document.getElementById("publicationTemplate");
    for(let i=0;i<list.length;i++){
        let pubBox = document.createElement('div');
        pubBox.innerHTML = pubTemplate.outerHTML;
        pubBox = pubBox.firstChild;
        pubBox.classList.remove("disNone");
        pubBox = setPublicationInfo(list[i],pubBox);
        pubParent.append(pubBox);
    }
}

function setPublicationInfo(data, div){
    console.log(data);
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
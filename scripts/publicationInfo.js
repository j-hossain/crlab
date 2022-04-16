getPublication();

function getPublication(){
    const urlParams = new URLSearchParams(window.location.search);
    getInfo("publications/"+urlParams.get("id")+"?_embed",setPublicationInfo);
}






function setPublicationInfo(data){
    console.log(data);
    div = document.getElementById("publicationDiv");
    let p = div.querySelector(".publicationInfo");
    let a = div.querySelector(".PublicationLink");
    let dd = div.querySelector(".details");
    a.href = data.acf.publication_link;
    p.innerHTML = getAuthors(data) + " (" + data.acf.publish_year + ") " + data.acf.publication_tilte;
    dd.innerHTML += "<p>" + data.acf.short_desripttion + "</p>";
    return div;
}

function getAuthors(data){
    let as = "";
    let flag = false;
    let x = data._embedded["acf:post"].length;
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
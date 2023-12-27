initFunctions();

function initFunctions(){
    getAllBlogs();
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

//working on getting some recent blogs
function getAllBlogs(){
    getInfo("blog?_embed",setAllBlogs);
}

function setAllBlogs(blogData){
    let blogParent = document.getElementById("allBlogDiv");
    let blogTemplate = document.getElementById("blogTemplate");
    
    for(let i=blogData.length-1;i>=0;i--){
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
    setMedia(blogData.featured_media,div.querySelector(".blogImage"));
    div.querySelector(".blogWriter").innerHTML = getAuthors(blogData);
    div.querySelector(".blogCategories").innerHTML = getblogCategories(blogData);
    div.querySelector(".blogTitle").innerHTML = blogData.title.rendered;
    div.querySelector(".blogTitle").href = "./blog.html?id=" + blogData.id;
    div.querySelector(".blogLink").href = "./blog.html?id=" + blogData.id;
    div.querySelector(".blogExerpt").innerHTML = blogData.excerpt.rendered;
    div.querySelector(".publishDate").innerHTML = new Date(blogData.date.toString()).toUTCString();
    return div;
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
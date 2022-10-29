let mediaData;
init();

function initFunctions(data){
    mediaData = arrangeMediaById(data);
    getAllFields();
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
    div.querySelector(".title").href = "./field.html?id="+fieldData.id;
    div.querySelector(".shortDescription").innerHTML = new String(fieldData.acf.description).slice(0,100) + ".....";
    div.querySelector(".image").src=mediaData[fieldData.acf.image].source_url;
    return div;
}


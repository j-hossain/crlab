getAllPeople();


function getAllPeople() {
    getPeopleInfo();
}

function getPeopleInfo() {
    getInfo("people?_embed", mapPeopleType);
}

function mapPeopleType(peopleData) {
    peopleData.sort((a, b) => {
        if (a.acf.order != b.acf.order) {
            return a.acf.order - b.acf.order;
        }
        if (a.date < b.date) return -1;
        return 1;
    })
    let mapedPeopleData = {}
    for (i in peopleData) {
        let memberType = peopleData[i]?.acf?.member_type
        if (mapedPeopleData[memberType] == undefined) {
            mapedPeopleData[memberType] = new Array()
        }
        mapedPeopleData[memberType].push(peopleData[i])
    }

    for (memberType in mapedPeopleData) {
        setAllPeople(mapedPeopleData[memberType], getMemberTypeParentDiv(memberType))
    }
}

function getMemberTypeParentDiv(memberType) {
    let mainDiv = document.getElementById('business')
    let memberDivTemplate = mainDiv.querySelector('.container')
    let memberDiv = document.createElement('div')
    memberDiv.innerHTML = memberDivTemplate.outerHTML
    memberDiv = memberDiv.firstChild
    memberDiv.classList.remove('disNone')
    mainDiv.append(memberDiv)
    memberDiv.querySelector('.business_1').getElementsByTagName('h2')[0].innerHTML = memberType
    return memberDiv.querySelector(".allPeopleDiv")
}

function setAllPeople(peopleData, pepParent) {
    let pepTemplate = pepParent.querySelector(".personTemplate");
    for (let i = 0; i < peopleData.length; i++) {
        let peopleBox = document.createElement('div');
        peopleBox.innerHTML = pepTemplate.outerHTML;
        peopleBox = peopleBox.firstChild;
        peopleBox.classList.remove("disNone");
        peopleBox.id = "";
        peopleBox = setPersonInfo(peopleData[i], peopleBox);
        pepParent.append(peopleBox);
    }
}

function setPersonInfo(personData, div) {
    div.querySelector(".personName").innerHTML = personData.acf.name;
    div.querySelector(".personLink").href = "./people.html?id=" + personData.id;
    div.querySelector(".personDesignation").innerHTML = personData.acf.designation;
    div.querySelector(".personResearchArea").innerHTML = personData.acf.research_area;
    div.querySelector(".personLinkedin").href = personData.acf.linkedin;
    div.querySelector(".personGoogleScholar").href = personData.acf.scholar;
    div.querySelector(".personResearchGate").href = personData.acf.research_gate;
    setMedia(personData.acf.profile_image, div.querySelector(".personImage"))
    return div;
}


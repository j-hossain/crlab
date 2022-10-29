function getInfo(gotothis, dothis){
    // for development purpose
    const baseurl = "http://localhost/crlabdev";
    // const baseurl = "https://crlabback.000webhostapp.com";
    const requrl = baseurl + "/wp-json/wp/v2/" + gotothis;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        dothis(JSON.parse(this.responseText));
    }
    xhttp.open("GET", requrl);
    xhttp.send();
}

getContactInfo();

//getting the contact info for footer section
function getContactInfo(){
    getInfo("contact_information",(contactData)=>{
        let footer = document.getElementById("footer");
        footer.querySelector(".address").innerHTML = contactData[0].acf.address;
        footer.querySelector(".emailAddress").innerHTML = contactData[0].acf.email_address;
        footer.querySelector(".emailAddress").href = "mailto:"+contactData[0].acf.email_address;
        footer.querySelector(".phone").innerHTML ="Phone : " + contactData[0].acf.mobile_number;
        footer.querySelector(".emailLink").href = "mailto:"+contactData[0].acf.email_address;
        footer.querySelector(".facebookLink").href = contactData[0].acf.facebook_link;
        footer.querySelector(".twitterLink").href = contactData[0].acf.twitter_link;
        footer.querySelector(".googlePlusLink").href = contactData[0].acf.google_link;
        footer.querySelector(".linkedinLink").href = contactData[0].acf.linkedin_link;
    });
}

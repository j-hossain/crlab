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
    // xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
    // xhttp.setRequestHeader('mode','no-cors');
    xhttp.send();
}
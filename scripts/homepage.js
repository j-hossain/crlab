getBanner();

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
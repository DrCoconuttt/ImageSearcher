//API used:
//https://unsplash.com/developers

//TODO 1080p monitor test

const search = document.getElementById('searchBtn');
const imageToDisplay = document.querySelector('.imageToDisplay');

getDefaultImage();

document.getElementById("searchBar").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        document.getElementById("searchBtn").click();
    }
});

search.addEventListener("click", async () => {
    let input = document.getElementById("searchBar").value;
    fetch(`https://api.unsplash.com/search/photos?query=${input}&client_id=g-7HdLVjqIZ_upK69aerFhZNXcUp5ac-tFDyJ2GWFgo`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if(data.total > 0){
            document.getElementById("NoImgTxt").innerHTML = '';
            document.getElementById("imageBoxDiv").style.paddingTop = "18px";
            let rand = Math.floor(Math.random() * Math.min(10,data.total));
            let image = data.results[rand].urls.regular;
            imageToDisplay.onload = function() {
                document.getElementById("imageBoxDiv").style.maxWidth = imageToDisplay.width+"px";
            }
            imageToDisplay.src = image;
            document.getElementById("LINKTxt").innerHTML = 'LINK: ' + "<a href='"+data.results[rand].links.html+"'>"+data.results[rand].links.html+"</a>"
        }
        else{
            document.getElementById("NoImgTxt").innerHTML = 'No results found, have a hamster instead';
            document.getElementById("imageBoxDiv").style.paddingTop = "3px";
            getDefaultImage();
        }
    })
    .catch(e => {
        console.log(e);
    })
});

function getDefaultImage() {
    fetch(`https://api.unsplash.com/search/photos?query=hamster&client_id=g-7HdLVjqIZ_upK69aerFhZNXcUp5ac-tFDyJ2GWFgo`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let rand = Math.floor(Math.random() * Math.min(10,data.total));
        imageToDisplay.onload = function() {
            document.getElementById("imageBoxDiv").style.maxWidth = imageToDisplay.width+"px";
        }
        imageToDisplay.src = data.results[rand].urls.regular;
        document.getElementById("LINKTxt").innerHTML = 'LINK: ' + "<a href='"+data.results[rand].links.html+"'>"+data.results[rand].links.html+"</a>"
    })
}

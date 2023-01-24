//API used:
//https://unsplash.com/developers

const search = document.getElementById('searchBtn');
const imageToDisplay = document.querySelector('.imageToDisplay');

getDefaultImage();

search.addEventListener("click", async () => { //used to search for and display an image when the search button is pressed
    let input = document.getElementById("searchBar").value;
    //queries the Unsplash API endpoint to and parses the returned JSON object
    fetch(`https://api.unsplash.com/search/photos?query=${input}&client_id=g-7HdLVjqIZ_upK69aerFhZNXcUp5ac-tFDyJ2GWFgo`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if(data.total > 0){ //if one or more result was returned the search was successful
            document.getElementById("NoImgTxt").innerHTML = ''; //clear the unsuccessful search text
            document.getElementById("imageBoxDiv").style.paddingTop = "18px";
            let rand = Math.floor(Math.random() * Math.min(10,data.total)); //randomly choose an image of the ones returned, up to the first 10 results
            imageToDisplay.onload = function() { //find the width of the image to ensure the width of the image box does not exceed the image itself (this occurs when the text in the image box is longer then the image) 
                document.getElementById("imageBoxDiv").style.maxWidth = imageToDisplay.width+"px";
            }
            let image = data.results[rand].urls.regular;
            imageToDisplay.src = image; //display the image
            document.getElementById("LINKTxt").innerHTML = 'LINK: ' + "<a href='"+data.results[rand].links.html+"'>"+data.results[rand].links.html+"</a>" //display the link to the image
        }
        else{  //if no results were returned display a message that the search was unsuccessful and return the default image instead
            document.getElementById("NoImgTxt").innerHTML = 'No results found, have a hamster instead';
            document.getElementById("imageBoxDiv").style.paddingTop = "3px";
            getDefaultImage();
        }
    })
    .catch(e => {
        console.log(e);
    })
});

document.getElementById("searchBar").addEventListener("keyup", function(event) { //used to register the search button being pressed if enter is pressed while typing into the search bar
    event.preventDefault();
    if (event.key === "Enter") {
        document.getElementById("searchBtn").click();
    }
});

function getDefaultImage() { //used to return a default image query known to work (getDefaultImage is used on initial load or if a term is searched for with no results)
    fetch(`https://api.unsplash.com/search/photos?query=hamster&client_id=g-7HdLVjqIZ_upK69aerFhZNXcUp5ac-tFDyJ2GWFgo`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let rand = Math.floor(Math.random() * Math.min(10,data.total)); //randomly choose an image of the ones returned, up to the first 10 results
        imageToDisplay.onload = function() { //find the width of the image to ensure the width of the image box does not exceed the image itself (this occurs when the text in the image box is longer then the image) 
            document.getElementById("imageBoxDiv").style.maxWidth = imageToDisplay.width+"px";
        }
        let image = data.results[rand].urls.regular;
        imageToDisplay.src = image //display the image
        document.getElementById("LINKTxt").innerHTML = 'LINK: ' + "<a href='"+data.results[rand].links.html+"'>"+data.results[rand].links.html+"</a>" //display the link to the image
    })
}

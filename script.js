//To store API key
const accessKey = "PNKor685GUAh1ItWVhNXB6iBs0t_zR5q-aRSlWlCQoo";

//Declare variables
const formEl = document.querySelector("form"); //to store our form
const inputEl = document.getElementById("search-input"); //to store input section
const searchResults = document.querySelector(".search-results"); //to store images/containers
const showMore = document.getElementById("show-more-button"); //store values of show more buttons

//variable store input data
let inputData = "";
//To initilize the default page number
/*If we click the show more button 
the page number will increase*/
let page = 1; //default page number will be 1

//for searching the images
async function searchImages() {
  inputData = inputEl.value;
  //create dynamic URl
  //this url will fetch all the data from unsplash api
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url); //fetch the images base on the query
  /* after getting all the query, we have to convert it to
  JSON format*/
  const data = await response.json(); //all the json format data will store in 'data' variable

  /*now we need to convert our jsn data into 
  image and the texr*/
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  /*Inside this 'results' variable 
  there are lot of images and data*/

  /*Now we need to show the the images
  and text one by one*/
  /*For that we need to 'map' this 
  'result' variable*/

  results.map((result) => {
    //create a container for hold images
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  /*after showing our first page of images 
  we need to increase the page number*/
  page++;
  //if the page number is more than 1
  //then we need to show the 'show more' button
  if (page > 1) {
    showMore.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  //call our searchImage function
  searchImages();
});

//If anyone click the show more button
//It should show more images
showMore.addEventListener("click", () => {
  //call our searchImage function
  searchImages();
});

/* now if a user type a keyword here and click search Button,
our API will take that keyword, and based on that keyword API will fetch
images from unsplash.com*/

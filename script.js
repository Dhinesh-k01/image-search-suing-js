const accessKey = "EWI1h_BAi5JyZodWsZNSopmV7kVLZcC_z-V-zPgZmdA";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  if (page === 1) {
    searchResults.innerHTML = "";
  }

  //this is works like a complete div element "search-result" for this

  results.map((result) => {
    const imageWrapper = document.createElement("div"); //creating a div element first
    imageWrapper.classList.add("search-result"); //the given input from the user can be added
    const image = document.createElement("img"); //the new image from the search input can be added
    image.src = result.urls.small; //source where the image came from can be added
    image.alt = result.alt_description; // creating a alternate description word for the alt element
    const imageLink = document.createElement("a"); //creating a image source link where the image came from will be stored in <a> tag
    imageLink.href = result.links.html; //href link can be stored
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    //after creating all the html format to javascript format we are going to append all the data
    imageWrapper.appendChild(image); //append the new image
    imageWrapper.appendChild(imageLink); //append the new image link
    searchResults.appendChild(imageWrapper); //this all will be fetched from the users input and show the results
  });

  page++; // increment the page
  if (page > 1) {
    // if the page number greater than 1 show the shwMore button
    showMore.style.display = "block"; //this block will be shown after the page number 2...
  }
}

//this the event of the search button after the user given the input
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

//this is the event of the showMore button
showMore.addEventListener("click", () => {
  searchImages();
});

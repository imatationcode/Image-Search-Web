// console.log("Hellow");
// const age= prompt("Enter your age");
// document.getElementById("vie").innerHTML=age;

const accessKey = "zXjQoI-aLWOJz4RkKne7xVr7oiBUqSujzHlk2WhD7oU";

const formEl = document.querySelector("form");
const inPut = document.getElementById("searchInBox");
const showMoreBtn = document.getElementById("ShowMore");
const searchResult = document.querySelector(".searchresults"); // Add . before class name 

let page = 1;
let inputData = "";

async function searchImg() {
  inputData = inPut.value;
  const dynUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(dynUrl);
  const data = await response.json();

  const reqPhotos = data.results; // Check the exact key in the API response

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  reqPhotos.map((photo) => {
    const imageWraper = document.createElement('div');
    imageWraper.classList.add("ResultArea");

    const imagee = document.createElement('img');
    imagee.src = photo.urls.small; // Check the exact key in the API response
    // imagee.alt = photo.alt_description;

    const imgLink = document.createElement('a');
    imgLink.href = photo.links.html; // Check the exact key in the API response
    imgLink.target = "_blank";

    imgLink.appendChild(imagee);
    imageWraper.appendChild(imgLink);
    searchResult.appendChild(imageWraper);
  });
 
  page++;
  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
  page++;
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImg();
});

showMoreBtn.addEventListener("click", () => {
  searchImg();
});


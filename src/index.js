//Global scope variable for the ramen menu
const ramenMenu = document.getElementById("ramen-menu");

document.addEventListener("DOMContentLoaded", () =>{
    getAllRamen();
    initialRamen();
})

//Fetch all ramen data then pass info to create the image menu
function getAllRamen() {
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(createImgMenu)
}

//Create img tags and append into ramen menu
function createImgMenu(ramenData) {
    //Create img tag and fill in info for each element in json
    ramenData.forEach(ramen => createImg(ramen));
}

function createImg(ramen) {
    const img = document.createElement("img");
    img.id = ramen.id;
    img.src = ramen.image;
    img.alt = ramen.name;
    ramenMenu.appendChild(img);
    //Event listener to display 
    img.addEventListener("click", e => getSpecificRamen(e.target.id))

    showDetails(ramen);
}
//Fetch the data for a specific ID
function getSpecificRamen(ramenID) {
    fetch(`http://localhost:3000/ramens/${ramenID}`)
    .then(response => response.json())
    .then(data => showDetails(data));
}

//Fill in all details for a specific ramen
function showDetails(ramen) {
    const img = document.querySelector(".detail-image");
    const name = document.querySelector(".name");
    const restaurant = document.querySelector(".restaurant");
    const rating = document.querySelector("#rating-display");
    const comment = document.querySelector("#comment-display");
    img.src = ramen.image;
    img.alt = ramen.name;
    name.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    rating.textContent = ramen.rating;
    comment.textContent = ramen.comment;
}

//Fill in details for the first ramen in the response
function initialRamen() {
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(firstRamen => showDetails(firstRamen[0]));
}


//Handle form submission
function handleSubmit(e) {
    //Prevent default form behavior
    e.preventDefault();
    //Create a ramen object with form submission values
    let ramenObj = {
        name: e.target[0].value,
        restaurant:e.target[1].value,
        image:e.target[2].value,
        rating:e.target[3].value,
        comment:e.target[4].value
    }
    postRamen(ramenObj)
    .then(newRamen => createImg(newRamen));
    showDetails(ramenObj);
}

function postRamen(ramen) {
    return fetch("http://localhost:3000/ramens",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(ramen)
    })
    .then(response => response.json());
}
document.querySelector("#new-ramen").addEventListener("submit", handleSubmit);
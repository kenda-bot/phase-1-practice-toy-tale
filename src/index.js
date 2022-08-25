let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek 
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
const container = document.getElementById("toy-collection")

function addToysToDom(data){
  data.forEach(toy => {
    const div = document.createElement("div");
    div.setAttribute("class", "card")
    const h2 = document.createElement("h2");
    h2.textContent = `${toy.name}`
    const img = document.createElement("img")
    img.className = "toy-avatar"
    img.src =`${toy.image}`
    const p = document.createElement("p")
    p.innerText = `${toy.likes}`
    const button = document.createElement("button")
    button.textContent = "Like ❤️"
    button.id = `${toy.id}`
    button.className="like-btn"
//appendto the dom
    container.appendChild(div)
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)


    button.addEventListener("click", () => {
      p.innerText = incrementLikes(data)
    })
  })
}

function incrementLikes(data) {
  let likes = 0;


  fetch(`http://localhost:3000/toys`)  
.then(response => response.json())
.then(data => {
  console.log(data)
  
    likes = data.likes
  console.log(likes)})

let newNumberOfLikes = likes + 1

fetch('http://localhost:3000/toys',{
  method : "PATCH",
  headers : {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body : JSON.stringify({
  "likes": newNumberOfLikes,
  })
 })

 let newText = `${newNumberOfLikes}`
 return newText
}



// GET 
fetch('http://localhost:3000/toys')  
.then(response => response.json())
.then(data => addToysToDom(data))


//POST 
function addToysFromInput(){
  console.log(data.image)
 fetch('http://localhost:3000/toys',{
  method : "POST",
  headers : {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body : JSON.stringify({
    "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0

  })
 })
}
const form = document.querySelector(".add-toy-form")

form.addEventListener("submit", addToysFromInput) 

//Script solo per la pagina Pornstar
let pagina = 1;
function CercaPornstar() {
    fetch("https://papi-pornstarsapi.p.rapidapi.com/pornstars/?max_rank=200&min_rank=151&ordering=rank&page="+pagina, {
    "method": "GET",
    "headers": {
      'X-RapidAPI-Key': '3a2a9e2a42msh41757b5d72271adp1c23bfjsnf4f7b5a79409',
      'X-RapidAPI-Host': 'papi-pornstarsapi.p.rapidapi.com'

    }
  })
    .then(response => response.json())
    .then(result => { stampaCards(result) })
    .catch(error => console.log('Error:', error));
}

function stampaCards(result) {
  console.log(result);
  let arrayVideo = result.results;
  let cardsVideo = document.getElementById('video');
  cardsVideo.innerHTML = "";

  for (let i = 0; i < arrayVideo.length; i++) {
    if (arrayVideo[i].images.length != 0) {
      cardsVideo.innerHTML += `<div class="col">
      <div class="card">
        <img src='${arrayVideo[i].images[0].image}' class="card-img-top")">
        <div class="card-description">
          <h2 class="card-body">${arrayVideo[i].name}</h2>
          <p class="card-text">Età: ${arrayVideo[i].age}  </p>
          <p class="card-text">Nazionalità: ${arrayVideo[i].nationality} </p>
          <p class="card-text">Tette: ${arrayVideo[i].boobs}</p>
        </div>
      </div>
    </div>`;
    }
      
  }
}

CercaPornstar();

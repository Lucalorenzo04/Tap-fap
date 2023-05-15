
let tipoRicerca = 2;
const api_url_getall = "https://www.eporner.com/api/v2/video/search/?per_page=50&order=latest&lq=0&format=json&gay=0&per_page=60";
const api_url_onlyBest = "https://www.eporner.com/api/v2/video/search/?page=1&order=top-weekly&lq=1&format=json&per_page=60";
const api_url_search = "https://www.eporner.com/api/v2/video/search/?page=1&lq=0&format=json&per_page=60&query=";
const api_url_search_section = "https://www.eporner.com/api/v2/video/search/?per_page=60&format=json&page=1&query=";
const btn = document.getElementById('cerca');
const selectCategoria = document.getElementById('categoria');
const search = document.getElementById('ricerca');
const selectDurata = document.getElementById('durata');
const selectSezione = document.getElementById('sezione');
let intestazione = document.getElementById("intestazione");
if (btn) {
    btn.addEventListener("click", Ricerca);
}
function SwitchInputSelect(num) {
    switch (num) {
        case 1:
            //Filtro Categorie
            tipoRicerca = 1;
            selectCategoria.className = "form-select";
            selectSezione.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDurata.className = "form-select visually-hidden";
            break;
        case 2:
            //Filtro Parola Chiave (Default)
            tipoRicerca = 2;
            selectCategoria.className = "form-select visually-hidden";
            search.className = "form-control me-2";
            selectSezione.className = "form-select visually-hidden";
            search.placeholder = "Cerca";
            selectDurata.className = "form-select visually-hidden";

            
            break;

        case 3:
            //Filtro Durata
            tipoRicerca = 3;
            selectCategoria.className = "form-select visually-hidden";
            selectSezione.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDurata.className = "form-select";
            break;
        case 4:
            //Filtro Sezione
            tipoRicerca = 4;
            selectSezione.className = "form-select";
            search.className = "form-control me-2 visually-hidden";
            selectCategoria.className = "form-select visually-hidden";
            selectDurata.className = "form-select visually-hidden";
            break;
        default:
            tipoRicerca = 2;
            break;

    }
}

function Ricerca() {
    switch (tipoRicerca) {
        case 1:
            console.log("Ricerca per categoria");
            let categoria = document.getElementById("categoria").value;
            intestazione.innerHTML = "";
            console.log(categoria);
            fetch(api_url_search + categoria, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));

            break;
        case 2:
            tipoRicerca = 2;
            intestazione.innerHTML = "";
            console.log("Ricerca per Parola Chiave");
            let key_word = document.getElementById("ricerca").value;
            intestazione.innerHTML = "Ricerca per <span id='ricercaSpan'>" + key_word + "</span>";
            console.log(key_word);
            fetch(api_url_search + key_word, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            document.getElementById("ricerca").value = "";


            break;
        case 3:
            console.log("Ricerca per Durata");
            intestazione.innerHTML = "";
            let time = document.getElementById("durata").value;
            if (time == "longest") {
                intestazione.innerHTML = "Ricerca per <span id='ricercaSpan'>Video lunghi</span>";
            } else {
                intestazione.innerHTML = "Ricerca per <span id='ricercaSpan'>Video Corti</span>";
            }

            console.log(time);
            fetch("https://www.eporner.com/api/v2/video/search/?page=1&order=" + time + "&lq=0&format=json", {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            break;

        case 4:
            console.log("Ricerca per Sezione");
            intestazione.innerHTML = "";
            let sezione = document.getElementById("sezione").value;
            console.log(sezione);
            if (sezione == "etero") {
                fetch(api_url_getall, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { stampaCards(result) })
                    .catch(error => console.log('Error:', error));

            } else {
                fetch(api_url_search_section + sezione, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { stampaCards(result) })
                    .catch(error => console.log('Error:', error));
            }
            break;
        default:
            tipoRicerca = 2;
            document.getElementById("ricerca").value = "";
            break;
    }
}

function stampaCards(result) {
    console.log(result);
    let arrayVideo = result.videos;
    let cardsVideo = document.getElementById('video');
    cardsVideo.innerHTML = "";
    for (let i = 0; i < arrayVideo.length; i++) {
        cardsVideo.innerHTML += `<div class="col">
        <div class="card" onclick="window.open('${arrayVideo[i].embed}')">
          <img src='${arrayVideo[i].default_thumb.src}' class="card-img-top" window.open('${arrayVideo[i].embed}')">
          <div class="card-description">
            <h2 class="card-title">${stampaTitolo(arrayVideo[i].title, 75)}</h2>
            <p><span class="card-text" id="n-views"><img src='././img/eye.png' id="views"> ${arrayVideo[i].views}</span>
            <span class="card-text" id="time"><img src='././img/clock-circular-outline.png' id="clock">  ${arrayVideo[i].length_min}</span></p>
          </div>
          
        </div>
      </div>`;
    }
}

function CreaHome() {
    console.log("Crea Home");
    fetch(api_url_search, {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => { stampaCards(result) })
        .catch(error => console.log('Error:', error));
}

function CreaTrending() {
    console.log("Crea Trending");
    fetch(api_url_onlyBest, {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => { stampaCards(result) })
        .catch(error => console.log('Error:', error));
}

function stampaTitolo(testo, numeroParole) {
    let parole = testo.split('');
    let paroleDaStampare = parole.slice(0, numeroParole).join('');
    return paroleDaStampare;
}

categoria.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btn.click();
    }
  });

  search.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btn.click();
    }
  });

  selectDurata.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btn.click();
    }
  });

  selectSezione.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btn.click();
    }
  });

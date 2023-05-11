
let tipoRicerca = 2;
const api_url_getall = "https://www.eporner.com/api/v2/video/search/?lq=1&format=json&gay=0";
const api_url_onlyBest = "https://www.eporner.com/api/v2/video/search/?page=1&order=top-weekly&lq=1&format=json";
const api_url_search = "https://www.eporner.com/api/v2/video/search/?page=1&lq=1&format=json&query=";
const api_url_search_section = "https://www.eporner.com/api/v2/video/search/?format=json&query=";
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
            selectCategoria.className = "form-select";
            selectSezione.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDurata.className = "form-select visually-hidden";
            tipoRicerca = 1;
            break;
        case 2:
            //Filtro Parola Chiave (Default)
            selectCategoria.className = "form-select visually-hidden";
            search.className = "form-control me-2";
            selectSezione.className = "form-select visually-hidden";
            search.placeholder = "Cerca";
            selectDurata = "form-select visually-hidden";
            tipoRicerca = 2;
            break;

        case 3:
            //Filtro Durata
            selectCategoria.className = "form-select visually-hidden";
            selectSezione.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDurata.className = "form-select";
            tipoRicerca = 3;
            break;
        case 4:
            //Filtro Sezione
            selectSezione.className = "form-select";
            search.className = "form-control me-2 visually-hidden";
            selectCategoria.className = "form-select visually-hidden";
            selectDurata.className = "form-select visually-hidden";
            tipoRicerca = 4;
            break;
        default:
            tipoRicerca = 3;
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
            console.log("Ricerca per Parola Chiave");
            let key_word = document.getElementById("ricerca").value;
            intestazione.innerHTML = "Ricerca per <span id='ricerca'>" + key_word + "</span>";
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
            let time = document.getElementById("durata").value;
            if (time == "longest") {
                intestazione.innerHTML = "Ricerca per <span id='ricerca'>Video lunghi</span>";
            } else {
                intestazione.innerHTML = "Ricerca per <span id='ricerca'>Video Corti</span>";
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
            tipoRicerca = 3;
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
        <div class="card" onclick="window.open('${arrayVideo[i].embed}')" onmouseover="showPreview(this)">
          <img src='${arrayVideo[i].default_thumb.src}' class="card-img-top" window.open('${arrayVideo[i].embed}')">
          <div class="card-description">
            <h2 class="card-title">${stampaTitolo(arrayVideo[i].title, 15)}</h2>
            <p class="card-text">Views: ${arrayVideo[i].views}</p>
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
    let parole = testo.split(' ');
    let paroleDaStampare = parole.slice(0, numeroParole).join(' ');
    return paroleDaStampare;
}

// https://cors-anywhere.herokuapp.com/... serve per aggirare il problema del CORS
let tipoRicerca = 2;
const api_url_getall = "https://www.eporner.com/api/v2/video/search/?lq=1&format=json&gay=0";
const api_url_onlyBest = "https://www.eporner.com/api/v2/video/search/?page=1&order=top-weekly&lq=0&format=json";
const api_url_search = "https://www.eporner.com/api/v2/video/search/?page=1&lq=0&format=json&query=";
const api_url_search_section = "https://www.eporner.com/api/v2/video/search/?format=json&query=";
const btn = document.getElementById('cerca');
let intestazione = document.getElementById("intestazione");
if (btn) {
    btn.addEventListener("click", Ricerca);
}
function SwitchInputSelect(num) {
    switch (num) {
        case 1:
            //Filtro Categorie
            document.getElementById("categoria").className = "form-select";
            document.getElementById("sezione").className = "form-select visually-hidden";
            document.getElementById("ricerca").className = "form-control me-2 visually-hidden";
            document.getElementById("durata").className = "form-select visually-hidden";
            tipoRicerca = 1;
            break;
        case 2:
            //Filtro Parola Chiave (Default)
            document.getElementById("categoria").className = "form-select visually-hidden";
            document.getElementById("ricerca").className = "form-control me-2";
            document.getElementById("sezione").className = "form-select visually-hidden";
            document.getElementById('ricerca').placeholder = "Cerca";
            document.getElementById("durata").className = "form-select visually-hidden";
            document.getElementById('ricerca').type = 'text';
            tipoRicerca = 2;
            break;

        case 3:
            //Filtro Durata
            document.getElementById("categoria").className = "form-select visually-hidden";
            document.getElementById("sezione").className = "form-select visually-hidden";
            document.getElementById("ricerca").className = "form-control me-2 visually-hidden";
            document.getElementById("durata").className = "form-select";
            tipoRicerca = 3;
            break;
        case 4:
            //Filtro Sezione
            document.getElementById("sezione").className = "form-select";
            document.getElementById("ricerca").className = "form-control me-2 visually-hidden";
            document.getElementById("categoria").className = "form-select visually-hidden";
            document.getElementById("durata").className = "form-select visually-hidden";
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
            intestazione.innerHTML = "Ricerca per <span id='ricerca'>"+key_word+"</span>";
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
            intestazione.innerHTML = "Ricerca per <span id='ricerca'>"+time+"</span>";
            console.log(time);
            fetch("https://www.eporner.com/api/v2/video/search/?page=1&order="+time+"&lq=0&format=json", {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => {stampaCards(result)})
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

function showVideo(card) {
    const img = card.querySelector('img');
    const video = card.querySelector('video');
    const src = video.getAttribute('src');
    console.log(src);
    if (src != "") {
        img.classList.add('visually-hidden');
        video.classList.remove('visually-hidden');
        video.play();
        video.loop = true;
    }

    return;
}

function hideVideo(card) {
    const img = card.querySelector('img');
    const video = card.querySelector('video');
    const src = img.getAttribute('src');
    if (src != "") {
        img.classList.remove('visually-hidden');
        video.classList.add('visually-hidden');
        video.pause();
    }
    return;
}

function stampaCards(result) {
    console.log(result);
    let arrayVideo = result.videos;
    let cardsVideo = document.getElementById('video');
    cardsVideo.innerHTML = "";
    for (let i = 0; i < 18; i++) {
        cardsVideo.innerHTML += `<div class="col">
        <div class="card" onclick="window.open('${arrayVideo[i].embed}')">
          <img src='${arrayVideo[i].default_thumb.src}' class="card-img-top" window.open('${arrayVideo[i].embed}, incognito: true')">
          <div class="card-description">
            <h2 class="card-title">${stampaTitolo(arrayVideo[i].title, 10)}</h2>
            <p class="card-text">Views: ${arrayVideo[i].views}</p>
          </div>
        </div>
      </div>`;
    }
}

function CreaHome() {
    console.log("Crea Home");
    fetch(api_url_getall, {
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

// https://cors-anywhere.herokuapp.com/... serve per aggirare il problema del CORS
let tipoRicerca = 2;
const loadHome = document.getElementsByTagName('body');
const api_key = "qbRvvFsyPJU6noQWFlz9rZiWzY5oOfgP";
const api_url_getall = "https://cors-anywhere.herokuapp.com/https://adultvideosapi.com/api/videos/get-all";
const api_url_onlyBest = "https://cors-anywhere.herokuapp.com/https://adultvideosapi.com/api/videos/get-only-best";
const api_url_search = "https://cors-anywhere.herokuapp.com/https://adultvideosapi.com/api/videos/search";
const btn = document.getElementById('cerca');
let intestazione = document.getElementById("intestazione");
if (btn) {
    btn.addEventListener("click", Ricerca);
}
/* <!-- NON FUNZIONANTE CAUSA API DOWN --> */
function SwitchInputSelect(num) {
    switch (num) {
        case 1:
            //Filtro Categorie
            document.getElementById("categoria").className = "form-select";
            document.getElementById("sezione").className = "form-select visually-hidden";
            document.getElementById("ricerca").className = "form-control me-2 visually-hidden";
            tipoRicerca = 1;
            break;
        case 2:
            //Filtro Parola Chiave (Default)
            document.getElementById("categoria").className = "form-select visually-hidden";
            document.getElementById("ricerca").className = "form-control me-2";
            document.getElementById("sezione").className = "form-select visually-hidden";
            document.getElementById('ricerca').placeholder = "Cerca";
            document.getElementById('ricerca').type = 'text';
            tipoRicerca = 2;
            break;

        case 3:
            //Filtro Durata
            document.getElementById("categoria").className = "form-select visually-hidden";
            document.getElementById("sezione").className = "form-select visually-hidden";
            document.getElementById("ricerca").className = "form-control me-2";
            document.getElementById('ricerca').placeholder = 'Durata in minuti';
            document.getElementById('ricerca').type = 'number';
            document.getElementById('ricerca').min = '1';
            tipoRicerca = 3;
            break;
        case 4:
            //Filtro Sezione
            document.getElementById("sezione").className = "form-select";
            document.getElementById("ricerca").className = "form-control me-2 visually-hidden";
            document.getElementById("categoria").className = "form-select visually-hidden";
            tipoRicerca = 4;
            break;
        default:
            tipoRicerca = 3;
            break;

    }
}
/* <!-- NON FUNZIONANTE CAUSA API DOWN --> */
function Ricerca() {
    switch (tipoRicerca) {
        case 1:
            intestazione.innerHTML = "";
            console.log("Ricerca per categoria");
            let categoria = document.getElementById("categoria").value;
            console.log(categoria);
            fetch(api_url_getall + "?categories=" + categoria, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "X-API-Key": api_key
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));

            break;
        case 2:
            console.log("Ricerca per Parola Chiave");
            let key_word = document.getElementById("ricerca").value;
            console.log(key_word);
            fetch(api_url_search + "?query=" + key_word, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "X-API-Key": api_key
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            document.getElementById("ricerca").value = "";


            break;
        case 3:
            console.log("Ricerca per Durata");
            let time = document.getElementById("ricerca").value * 60;
            console.log(time);
            fetch(api_url_getall + "?max_duration=" + time, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "X-API-Key": api_key
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            document.getElementById("ricerca").value = "";


            break;

        case 4:
            console.log("Ricerca per Sezione");
            let sezione = document.getElementById("sezione").value;
            console.log(sezione);
            fetch(api_url_getall + "?sections=" + sezione, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "X-API-Key": api_key
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
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
    let arrayVideo = result.data;
    let cardsVideo = document.getElementById('video');
    cardsVideo.innerHTML = "";
    for (let i = 0; i < 18; i++) {
        cardsVideo.innerHTML += `<div class="col">
        <div class="card" onclick="window.open('${arrayVideo[i].embed_url}')" onmouseover="showVideo(this)"
        onmouseout="hideVideo(this)">
          <img src='${arrayVideo[i].default_thumb_url}' class="card-img-top" window.open('${arrayVideo[i].embed_url}, incognito: true')">
          <video src='${arrayVideo[i].preview_url}' class="card-img-top visually-hidden"></video>
          <div class="card-description">
            <h2 class="card-title">${stampaTitolo(arrayVideo[i].title, 10)}</h2>
            <p class="card-text">Views: ${arrayVideo[i].views_count}</p>
          </div>
        </div>
      </div>`;
    }
}

function CreaHome() {
    console.log("Crea Home");
    fetch(api_url_getall + "?order=newest", {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "X-API-Key": api_key
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
            "Accept": "application/json",
            "X-API-Key": api_key
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

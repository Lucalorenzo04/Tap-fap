
let tipoRicerca = 2;
let pagina = 1;
let api_url_getall = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=0&format=json&gay=0&per_page=36";
const btn = document.getElementById('cerca');
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById('previous');
const selectCategoria = document.getElementById('categoria');
const search = document.getElementById('ricerca');
const selectDurata = document.getElementById('durata');
const selectSezione = document.getElementById('sezione');
let intestazione = document.getElementById("intestazione");
if (btn) {
    btn.addEventListener("click", Ricerca);
}

if (btnPrev) {
    btnPrev.addEventListener("click", prev);
}

if (btnNext) {
    btnNext.addEventListener("click", next);
}
function SwitchInputSelect(num) {
    switch (num) {
        case 1:
            //Filtro Categorie
            tipoRicerca = 1;
            pagina = 1
            selectCategoria.className = "form-select";
            selectSezione.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDurata.className = "form-select visually-hidden";
            break;
        case 2:
            //Filtro Parola Chiave (Default)
            tipoRicerca = 2;
            pagina = 1
            selectCategoria.className = "form-select visually-hidden";
            search.className = "form-control me-2";
            selectSezione.className = "form-select visually-hidden";
            search.placeholder = "Cerca";
            selectDurata.className = "form-select visually-hidden";


            break;

        case 3:
            //Filtro Durata
            tipoRicerca = 3;
            pagina = 1
            selectCategoria.className = "form-select visually-hidden";
            selectSezione.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDurata.className = "form-select";
            break;
        case 4:
            //Filtro Sezione
            tipoRicerca = 4;
            pagina = 1
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
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&lq=0&format=json&per_page=30&query=" + categoria, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            intestazione.innerHTML = `Pagina " + <span id="categoria">${pagina}</span>`;


            break;
        case 2:
            tipoRicerca = 2;
            intestazione.innerHTML = "";
            console.log("Ricerca per Parola Chiave");
            let key_word = document.getElementById("ricerca").value;
            intestazione.innerHTML = "Ricerca per <span id='ricercaSpan'>" + key_word + "</span>";
            console.log(key_word);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&lq=0&format=json&order=latest&per_page=30&query=" + key_word, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
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
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&order=" + time + "&lq=0&format=json&per_page=30", {
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
                fetch("https://www.eporner.com/api/v2/video/search/?order=latest&lq=0&format=json&gay=0&per_page=30&page=" + pagina, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { stampaCards(result) })
                    .catch(error => console.log('Error:', error));

            } else {
                fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&per_page=30&format=json&query=" + sezione, {
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
    if (arrayVideo.length == 0) {
        intestazione.innerHTML = "Nessun risultato";
        cardsVideo.innerHTML = "";
    } else {
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
}

function CreaHome() {
    console.log("Crea Home");
    tipoRicerca = 5;
    fetch("https://www.eporner.com/api/v2/video/search/?format=json&lq=0&page=" + pagina + "&per_page=30", {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => { stampaCards(result) })
        .catch(error => console.log('Error:', error));
    window.scrollTo(top);
}

function CreaTrending() {
    console.log("Crea Trending");
    tipoRicerca = 6;
    fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&order=top-weekly&lq=0&format=json&per_page=36", {
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

function next() {
    window.scrollTo(top);
    switch (tipoRicerca) {
        case 1:
            if (pagina >= 1 && pagina < 100) {
                pagina++;
            } else {
                pagina = 1;
            }
            console.log(pagina);
            intestazione.innerHTML = `Pagina <span id="categoria">${pagina}</span>`;
            Ricerca();
            break;

        case 2:
            if (pagina >= 1 && pagina < 100) {
                pagina++;
            } else {
                pagina = 1;
            }
            console.log(pagina);
            intestazione.innerHTML = `Pagina <span id="categoria">${pagina}</span>`;
            Ricerca();
            break;
        case 3:
            if (pagina >= 1 && pagina < 100) {
                pagina++;
            } else {
                pagina = 1;
            }
            console.log(pagina);
            intestazione.innerHTML = `Pagina <span id="categoria">${pagina}</span>`;
            Ricerca();
            break;
        case 4:
            if (pagina >= 1 && pagina < 100) {
                pagina++;
            } else {
                pagina = 1;
            }
            console.log(pagina);
            intestazione.innerHTML = `Pagina <span id="categoria">${pagina}</span>`;
            Ricerca();
            break;

        case 5:
            if (pagina >= 1 && pagina < 100) {
                pagina++;
            } else {
                pagina = 1;
            }
            console.log(pagina);
            intestazione.innerHTML = `Pagina <span id="categoria">${pagina}</span>`;
            CreaHome();
            break;

        case 6:

            if (pagina >= 1 && pagina < 100) {
                pagina++;
            } else {
                pagina = 1;
            }
            console.log(pagina);
            intestazione.innerHTML = `Pagina <span id="categoria">${pagina}</span>`;
            CreaTrending();

        default:
            break;
    }

}

function prev() {
    window.scrollTo(top);
    switch (tipoRicerca) {
        case 1:
            if (pagina > 1 && pagina < 100) {
                pagina--;
            } else {
                pagina = 1;
            }
            console.log(pagina);
            intestazione.innerHTML = `Pagina <span id="categoria">${pagina}</span>`;
            Ricerca();
            break;

        case 2:
            if (pagina > 1 && pagina < 100) {
                pagina--;
            } else {
                pagina = 1;
            }
            console.log(pagina);
            intestazione.innerHTML = `Pagina <span id="categoria">${pagina}</span>`;
            Ricerca();
            break;
        case 3:
            if (pagina > 1 && pagina < 100) {
                pagina--;
            } else {
                pagina = 1;
            }
            console.log(pagina);
            intestazione.innerHTML = `Pagina <span id="categoria">${pagina}</span>`;
            Ricerca();
            break;
        case 4:
            if (pagina > 1 && pagina < 100) {
                pagina--;
            } else {
                pagina = 1;
            }
            console.log(pagina);
            intestazione.innerHTML = `Pagina <span id="categoria">${pagina}</span>`;
            Ricerca();
            break;

        case 5:
            if (pagina > 1 && pagina < 100) {
                pagina--;
            } else {
                pagina = 1;
            }
            console.log(pagina);
            intestazione.innerHTML = `Pagina <span id="categoria">${pagina}</span>`;
            CreaHome();
            break;

        case 6:
            if (pagina > 1 && pagina < 100) {
                pagina--;
            } else {
                pagina = 1;
            }
            console.log(pagina);
            intestazione.innerHTML = `Pagina " + <span id="categoria">${pagina}</span>`;
            CreaTrending();
            break;

        default:
            break;
    }
}

categoria.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});

search.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});

selectDurata.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});

selectSezione.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});


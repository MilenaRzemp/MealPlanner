import { URL } from "./module/env.js";
import { ObiektDoWysylki, Produkt, ObiektTabeli, ListaDan, SlownikJednostek } from "./module/model.js";

const dodajPosilek = document.getElementById("add-all");
const dodajSniadanie = document.getElementById("add-sniad");
const dodaj2Sniadanie = document.getElementById("add-2sniad");
const dodajObiad = document.getElementById("add-obiad");
const dodajKolacje = document.getElementById("add-kolac");

const okienkoDodaj = document.getElementById("dodaj-potrawe");
const closeDodaj = document.getElementById("close-dodaj");
const okienkoSniadania = document.getElementById("okienko-sniadania");
const closeSniad = document.getElementById("close-sniad");
const okienko2Sniad = document.getElementById("okienko-2-sniadania");
const close2Sniad = document.getElementById("close-2-sniad");
const okienkoObiady = document.getElementById("okienko-obiady");
const closeObiady = document.getElementById("close-obiady");
const okienkoKolacje = document.getElementById("okienko-kolacje");
const closeKolacje = document.getElementById("close-kolacje");

const inputSniadanie = document.getElementsByClassName("input-sniadanie");
const input2Sniadanie = document.getElementsByClassName("input-2-sniadanie");
const inputObiad = document.getElementsByClassName("input-obiad");
const inputKolacje = document.getElementsByClassName("input-kolacje");

let headers = new Headers();
headers.append("Content-Type", "application/json; charset=utf-8")
headers.append('Origin', '*');
headers.append('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');

// OTWIERANIE I ZAMYKANIE OKIEN Z LISTĄ POTRAW
dodajSniadanie.addEventListener("click", () => pobierzListePrzepisowSniad());
dodajSniadanie.addEventListener("click", () => okienkoSniadania.style.visibility = "visible");
closeSniad.addEventListener("click", () => okienkoSniadania.style.visibility = "hidden");

dodaj2Sniadanie.addEventListener("click", () => pobierzListePrzepisow2Sniad());
dodaj2Sniadanie.addEventListener("click", () => okienko2Sniad.style.visibility = "visible");
close2Sniad.addEventListener("click", () => okienko2Sniad.style.visibility = "hidden");

dodajObiad.addEventListener("click", () => pobierzListePrzepisowObiad());
dodajObiad.addEventListener("click", () => okienkoObiady.style.visibility = "visible");
closeObiady.addEventListener("click", () => okienkoObiady.style.visibility = "hidden");

dodajKolacje.addEventListener("click", () => pobierzListePrzepisowKolac());
dodajKolacje.addEventListener("click", () => okienkoKolacje.style.visibility = "visible");
closeKolacje.addEventListener("click", () => okienkoKolacje.style.visibility = "hidden");


// TWORZENIE WYŚWIETLANEJ LISTY POTRAW 
const ul1Sn = document.getElementById("sn-ul1");
const ul12Sn = document.getElementById("2-sn-ul1");
const ul1Obiad = document.getElementById("obiad-ul1");
const ul1Kolac = document.getElementById("kolac-ul1");

const pobierzListePrzepisowSniad = async () => {
    const response = await fetch(URL + '/planer/przepis/SNIADANIE', {
        headers: headers
    });
    let przepisy = await response.json();
    let nazwyWspolne = [...new Set(przepisy.map(p => p.nazwaWspolna))];
    ul1Sn.innerHTML = nazwyWspolne.map(k => '<li class="lista1">' + k + utworzListeDlaKategorii(k, przepisy) +  '</li>').join('');
}

const pobierzListePrzepisow2Sniad = async () => {
    const response = await fetch(URL + '/planer/przepis/DRUGIE_SNIADANIE', {
        headers: headers
    });
    let przepisy = await response.json();
    let nazwyWspolne = [...new Set(przepisy.map(p => p.nazwaWspolna))];
    ul12Sn.innerHTML = nazwyWspolne.map(k => '<li class="lista1">' + k + utworzListeDlaKategorii(k, przepisy) +  '</li>').join('');    
}

const pobierzListePrzepisowObiad = async () => {
    const response = await fetch(URL + '/planer/przepis/OBIAD', {
        headers: headers
    });
    let przepisy = await response.json();
    let nazwyWspolne = [...new Set(przepisy.map(p => p.nazwaWspolna))];
    ul1Obiad.innerHTML = nazwyWspolne.map(k => '<li class="lista1">' + k + utworzListeDlaKategorii(k, przepisy) +  '</li>').join('');    
}

const pobierzListePrzepisowKolac = async () => {
    const response = await fetch(URL + '/planer/przepis/KOLACJA', {
        headers: headers
    });
    let przepisy = await response.json();
    let nazwyWspolne = [...new Set(przepisy.map(p => p.nazwaWspolna))];
    ul1Kolac.innerHTML = nazwyWspolne.map(k => '<li class="lista1">' + k + utworzListeDlaKategorii(k, przepisy) +  '</li>').join('');    
}

function utworzListeDlaKategorii(nazwaWspolna, przepisy) {
    let ul2 = '<ul class="ul2">';
    ul2 += przepisy.filter(p => p.nazwaWspolna === nazwaWspolna).map(p => '<li class="lista2" id="' + p.id + '">' + p.nazwa + '<div class="zrodlo">' + p.zrodlo + '</div></li>').join('');
    ul2 += '</ul>';
    return ul2;
}


// WSTAWIANIE POTRAW DO TABELI
ul1Sn.addEventListener("click", (e) => {
    if (e.target && e.target.className == "lista2") {
        dodajPotrawe(e.target, inputSniadanie);
    }
});

ul12Sn.addEventListener("click", (e) => {
    if (e.target && e.target.className == "lista2") {
        dodajPotrawe(e.target, input2Sniadanie);
    }
});

ul1Obiad.addEventListener("click", (e) => {
    if (e.target && e.target.className == "lista2") {
        dodajPotrawe(e.target, inputObiad);
    }
});

ul1Kolac.addEventListener("click", (e) => {
    if (e.target && e.target.className == "lista2") {
        dodajPotrawe(e.target, inputKolacje);
    }
});


function dodajPotrawe(el, potrawa) {
    let parent = el.parentNode.parentNode.firstChild;
    let przepis = el.innerHTML;
    let btn = document.createElement("button");
    btn.className = "usun-potrawe";
    btn.textContent = "×";

        for ( let i=0; i < potrawa.length; i++) {
            if (potrawa[i].innerHTML == "") {
                potrawa[i].innerHTML = '<div class="' + el.id + '">' + parent.nodeValue + ' ' + przepis + '</div>';
                potrawa[i].prepend(btn);
                break;
            }
        } 
}


// USUWANIE POTRAW Z TABELI
Array.from(inputSniadanie).forEach((el) => el.addEventListener("click", usunPotrawe));
Array.from(input2Sniadanie).forEach((el) => el.addEventListener("click", usunPotrawe));
Array.from(inputObiad).forEach((el) => el.addEventListener("click", usunPotrawe));
Array.from(inputKolacje).forEach((el) => el.addEventListener("click", usunPotrawe));

function usunPotrawe(e) {
    const item = e.target;
    const div = item.parentNode;
    if (item.className === "usun-potrawe") {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    }
}

// USUŃ WSZYSTKO
document.querySelector(".clear-all").addEventListener("click", usunWszystko);
function usunWszystko() {
    document.querySelectorAll(".input").forEach(i => i.innerHTML = '');
}


// DODAWANIE POTRAW 

dodajPosilek.addEventListener("click", () => okienkoDodaj.style.visibility = "visible");
closeDodaj.addEventListener("click", () => okienkoDodaj.style.visibility = "hidden");

// DODAWANIE SKŁADNIKOW
const formularzDodajSkladnik = document.getElementById("dodaj-skladnik-form");
const listaSkladnikow = document.getElementById("lista-skladnikow");
const resetButton = document.getElementById("reset");

let wpisySkladnikow;

formularzDodajSkladnik.addEventListener("submit", uzupelnianieListySkladnikow);
resetButton.addEventListener("click", resetListySkladnikow);

function uzupelnianieListySkladnikow(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    wpisySkladnikow = Object.fromEntries(formData);
    let skladniki = document.getElementById("skladniki");
    let ilosc = document.getElementById("ilosc");
    let jednostka = document.getElementById("jednostka");
    let counter = document.getElementsByClassName("skladnik").length;

    skladniki.innerHTML += '<input class="skladnik" name="skladnik-' + counter + '" value="' + wpisySkladnikow.skladnik + '">';
    ilosc.innerHTML += '<input name="ilosc-' + counter + '" value="' + wpisySkladnikow.ilosc + '">';
    jednostka.innerHTML += '<input name="jednostka-' + counter + '" value="' + wpisySkladnikow.jednostka + '">';
}

function resetListySkladnikow() {
    listaSkladnikow.innerHTML = '<div id="skladniki">Składnik: <div class="wypelniacz"></div></div> <div id="ilosc">Ilość:<div class="wypelniacz"></div></div><div id="jednostka">Jednostka: <div class="wypelniacz"></div></div>';
}

// WYSYLANIE DANYCH POTRAWY
const formularzDodawania = document.getElementById('dodaj-przepis-form');
formularzDodawania.addEventListener("submit", dodajPotraweForm);

function dodajPotraweForm(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let fromProps = Object.fromEntries(formData);
    let produkty = [];
    let listaPrzefiltr = Object.entries(fromProps).filter(([nazwa, wartosc]) => nazwa !== "nazwa" && nazwa !== "poraDnia" && nazwa !== "zrodlo" && nazwa !== "kategoria" && nazwa !== "porcje");
    let skladniki = [];
    let ilosci = [];
    let jednostki = [];
        const liczbaSkladowychProduktu = 3;
        let a = listaPrzefiltr.length / liczbaSkladowychProduktu;

        for (let j=0; j < a; j++) {
            skladniki.push(listaPrzefiltr[j]);
        }
        for (let k=a; k < a+a; k++) {
            ilosci.push(listaPrzefiltr[k]);
        }
        for (let l=a+a; l < a+a+a; l++) {
            jednostki.push(listaPrzefiltr[l]);
        }
    for (let i=0; i < skladniki.length; i++) {
        let ilosc = ilosci[i][1];
        let jednostka = jednostki[i][1];
        let nazwa = skladniki[i][1];
        let nowyProdukt = new Produkt(ilosc, jednostka, nazwa);
        produkty.push(nowyProdukt);
    }
    let nowaPotrawa = new ObiektDoWysylki(fromProps.nazwa, fromProps.kategoria, fromProps.poraDnia, fromProps.porcje, produkty, fromProps.zrodlo);
    resetListySkladnikow();
    wyslijPrzepis(JSON.stringify(nowaPotrawa));
}

const wyslijPrzepis = async (nowaPotrawa) => {
    await fetch(URL + '/planer/przepis/dodaj', {
        method: "POST",
        headers: headers,
        body: nowaPotrawa
    })
    .then(response => {
        if(response.ok){
            alert("Dodano przepis!")
        } else {
            alert("Błąd podczas dodawania przepisu!")
        }
    })
};

// PRZESYŁANIE TABELI DO BAZY DANYCH

document.getElementById("save").addEventListener("click", () => {    
    zapisz();
});

function zapisz () {
    const table = document.querySelector("table");
    let id;
    let listaDan = [];
    for (let i = 1, row; row = table.rows[i]; i++ ) {
        for (let j = 1, cell; cell = row.cells[j]; j++) {
        let poraDniaK = cell.className;
            if (cell.childNodes[0].lastChild !== null) {
                id = parseInt(cell.childNodes[0].lastChild.className);
            } else {
                id = 0;
            }
         let dzien = poraDniaK.split('-')[1];
         let poraDnia = poraDniaK.split('-')[0];
         let komorkaTabeli = new ObiektTabeli(dzien, id, poraDnia);
         listaDan.push(komorkaTabeli);          
        }
    }
    let tablicaDan = listaDan.filter((el) => el.idPrzepisu !== 0);
    let tablicaWyslij = new ListaDan(tablicaDan);
    wyslijTabele(JSON.stringify(tablicaWyslij));
}

const wyslijTabele = async (tablicaWyslij) => {
    await fetch(URL + '/planer/danie/lista/przypisz', {
        method: "PUT",
        headers: headers,
        body: tablicaWyslij
    }).then(response => {
        if(response.ok){
            wyczyscListeZakupow();
            autoUzupLista();
        }
    })
};


// AUTOMATYCZNE UZUPELNIANIE TABELI

const autoUzup = async () => {
    const response = await fetch(URL + '/planer/danie', {
        headers: headers
    });
    let tabelaDan = await response.json();
    const table = document.querySelector("table");
    let dzien;
    let poraDnia;

    for (let i = 1, row; row = table.rows[i]; i++ ) {
        
        for (let j = 1, cell; cell = row.cells[j]; j++) {
        let poraDniaK = cell.className;
        dzien = poraDniaK.split('-')[1];
        poraDnia = poraDniaK.split('-')[0];
    
        for (let k = 0; k < tabelaDan.length; k++) {
            if (dzien == tabelaDan[k].dzien && poraDnia == tabelaDan[k].poraDnia) {
                let nazwaKlasy = tabelaDan[k].poraDnia + "-" + tabelaDan[k].dzien;
                let dodajKod = document.querySelector("." + nazwaKlasy + "").firstChild;
                let btn = document.createElement("button");
                btn.className = "usun-potrawe";
                btn.textContent = "×";
                dodajKod.innerHTML = '<div class="' + tabelaDan[k].przepis.id + '">' + tabelaDan[k].przepis.nazwaWspolna + ' ' + tabelaDan[k].przepis.nazwa + '<div class="zrodlo">' + tabelaDan[k].przepis.zrodlo + '</div></div>';
                dodajKod.prepend(btn);
        }}
    }}
    
}

// UZUPEŁNIANIE LISTY ZAKUPÓW
const autoUzupLista = async () => {
    const response = await fetch(URL + '/planer/danie/produkty', {
        headers: headers
    });
    let wszystkieProd = await response.json();
    let owoceUchwyt = document.getElementById("owoce").querySelector("ul");
    let nabialUchwyt = document.getElementById("nabial").querySelector("ul");
    let konserwyUchwyt = document.getElementById("konserwy").querySelector("ul");
    let sypkieUchwyt = document.getElementById("sypkie").querySelector("ul");
    let pozostaleUchwyt = document.getElementById("pozostale").querySelector("ul");

    let owoceWarzywa = [wszystkieProd].map(el => el.OWOCE_WARZYWA);
        if (owoceWarzywa[0] !== undefined) {
            owoceWarzywa = owoceWarzywa.map(e => e.map(el => [el.nazwa + ' - ' + el.ilosc + ' ' + SlownikJednostek[el.jednostka]]));
            for (let i = 0; i < owoceWarzywa[0].length; i++) {
                owoceUchwyt.innerHTML += '<li class="zakupy-lista">' + owoceWarzywa[0][i] + '</li>';
            }
        }
    let nabialSwieze = [wszystkieProd].map(el => el.NABIAL_SWIEZE);
        if (nabialSwieze[0] !== undefined) {
            nabialSwieze = nabialSwieze.map(e => e.map(el => [el.nazwa + ' - ' + el.ilosc + ' ' + SlownikJednostek[el.jednostka]]));
            for (let i = 0; i < nabialSwieze[0].length; i++) {
                nabialUchwyt.innerHTML += '<li class="zakupy-lista">' + nabialSwieze[0][i] + '</li>';
            }
        }
    let konserwyPrzyprawy = [wszystkieProd].map(el => el.KONSERWY_PRZYPRAWY);        
        if (konserwyPrzyprawy[0] !== undefined) {
            konserwyPrzyprawy = konserwyPrzyprawy.map(e => e.map(el => [el.nazwa + ' - ' + el.ilosc + ' ' + SlownikJednostek[el.jednostka]]));
            for (let i = 0; i < konserwyPrzyprawy[0].length; i++) {
                konserwyUchwyt.innerHTML += '<li class="zakupy-lista">' + konserwyPrzyprawy[0][i] + '</li>';
            }
        }
    let sypkie = [wszystkieProd].map(el => el.SYPKIE);        
        if (sypkie[0] !== undefined) {
            sypkie = sypkie.map(e => e.map(el => [el.nazwa + ' - ' + el.ilosc + ' ' + SlownikJednostek[el.jednostka]]));
            for (let i = 0; i < sypkie[0].length; i++) {
                sypkieUchwyt.innerHTML += '<li class="zakupy-lista">' + sypkie[0][i] + '</li>';
            }
        }
    let pozostale = [wszystkieProd].map(el => el.POZOSTALE);        
        if (pozostale[0] !== undefined) {
            pozostale = pozostale.map(e => e.map(el => [el.nazwa + ' - ' + el.ilosc + ' ' + SlownikJednostek[el.jednostka]]));
            for (let i = 0; i < pozostale[0].length; i++) {
                pozostaleUchwyt.innerHTML += '<li class="zakupy-lista">' + pozostale[0][i] + '</li>';
            }
        }
}

function wyczyscListeZakupow () {
    let lista = document.querySelector(".lista-zakupow");
    lista.innerHTML = '<div id="owoce"><div class="lista-tytul">Owoce i warzywa</div><ul></ul></div><div id="nabial"><div class="lista-tytul">Nabiał i świeże</div><ul></ul></div><div id="konserwy"><div class="lista-tytul">Konserwy i przyprawy</div><ul></ul></div><div id="sypkie"><div class="lista-tytul">Produkty sypkie</div><ul></ul></div><div id="pozostale"><div class="lista-tytul">Pozostałe</div><ul></ul></div>'
}

window.addEventListener("load", autoUzup());
window.addEventListener("load", autoUzupLista());



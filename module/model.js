export function ObiektDoWysylki (nazwa, nazwaWspolna, poraDnia, porcje, produkty, zrodlo) {
    this.nazwa = nazwa;
    this.nazwaWspolna = nazwaWspolna;
    this.poraDnia = poraDnia;
    this.porcje = porcje;
    this.produkty = produkty;
    this.zrodlo = zrodlo;
}

export function Produkt (ilosc, jednostka, nazwa) {
    this.ilosc = ilosc;
    this.jednostka = jednostka;
    this.nazwa = nazwa;
}

export function ObiektTabeli (dzien, idPrzepisu, poraDnia) {
    this.dzien = dzien;
    this.idPrzepisu = idPrzepisu;
    this.poraDnia = poraDnia;
}

export function ListaDan (tablicaDan) {
    this.listaDan = tablicaDan;
}

export const SlownikJednostek = {
    GRAM: 'g',
    MILILITR: 'ml',
    SZTUKA: 'szt',
    LYZKA: 'łyżk',
    LYZECZKA: 'łyżecz',
    SZKLANKA: 'szkl'
}
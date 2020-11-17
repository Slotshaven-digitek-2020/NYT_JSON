
function setup() {

    //Først en variabel til din api-key
    var apiKey = "o1b2wqqaf0XzQwG9PLtrfKCaPrL7wAw8"; //laererlunds nøgle til NY Times (Article Search + Top Stories)
    
    //Og til den url du vil søge på - i dette tilfælde et af de to nævnte New York Times API'er: 
    var url = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
    
    //Dernæst påbegynder du den query du vil udføre
    var query = "?";
        query += "q='edison'";
        query += "&sort=newest";
        query += "&begin_date=18790101";
        query += "&end_date=18800101";
    //Se flere parametre her; https://developer.nytimes.com/article_search_v2.json#/Documentation/GET/articlesearch.json
    
    //LoadJSON tager som parametre en URL + den funktion der skal kaldes, når den får noget tilbage
    loadJSON(url + query + "&api-key=" + apiKey, gotArticleSearchData);
    
    //Callback-funktionen kaldes når data er hentet, så de kan blive vist
    function gotArticleSearchData(data) {

        //Skriv hele JSON objektet ud i konsollen så du kan undersøge det
        console.log(data);        
        // Article Search giver et array med navn response. Hvilke felter (keys) ligger i elementerne i dette array?

        // Henter overskrift, kilde og en tekstbid fra første resultat, og bruger p5.DOM til at skrive det på siden.
        var docs = data.response.docs[0];

        createElement('h2',docs.headline.main);
        createP(docs.source);
        createP(docs.snippet);
        createA(docs.web_url, 'Link til artikel');
    }

}

/*
OPGAVER til Article Search API'et: 

- Prøv at få siden til at skrive artiklens udgivelsesdato

- Prøv at lave listen så den udskriver de første ti artikler i stedet for kun en

- Prøv at udskrive en liste med de første ti artikler om D. Trump fra sidste måned 

- Prøv at find ud af hvad der stod i New York Times, 9/11

- Prøv at lave et søgefelt på siden (createInput, createButton - se p5 referencen) så du kan søge direkte i databasen på keyword

OPGAVER til Top Stories API'et

- Prøv at skifte nedenstående linjer ind i koden ovenfor (udkommentér de linjer, der står der nu). Undersøg hvad de enkelte
    linjer henter fra JSON objektet ved at kigge i linket nederst:
    
    var url = "http:///api.nytimes.com/svc/topstories/v2/obituaries.json";
    
    loadJSON(url + query + "&api-key=" + apiKey, gotTopstoryData);

    function gotTopstoryData(data) {
        //Skriv hele JSON objektet ud i konsollen så du kan undersøge det
        console.log(data);
        
        // Top stories giver et array med navn results
        // Henter title, byline og abstract fra første resultat.
        var docs = data.results[0];

        createElement('h2',docs.title);
        createP(docs.byline).style('color:red; font-style:italic');
        createP(new Date(docs.published_date)).style('color:grey');
        createP(docs.abstract);
        createA(docs.url, 'Link til artikel');

        Se mere om API'et her: https://developer.nytimes.com/docs/top-stories-product/1/overview

        I Top Stories API'et behøver man blot at tilføje en API-nøgle til url'en som query,
        men til gengæld skal man vælge nyhedskategorien i selve *.json-kaldet
    }

- Prøv at lave en valgmulighed på siden og i scriptet, sådan at man kan vælge om man vil bruge det ene eller det andet API. 

- Lav også et valgfelt til de forskellige nyhedskategorier, så man ikke kun kan se dødsannoncer i Top Stories...

- Lav en funktionalitet, så man kan uddrage en eller anden form for statistik fra TopStories, fx: 
    -   Hastigheden hvormed der kommer nye, 
    -   Hvilken kategori der lige nu kommer flest af
    -   Hvilke nøgleord der trender i artiklerne
    -   Hvor mange bogstaver der er i overskrifterne og om tallet er stigende eller faldende
    - - eller hvad I nu kan finde på
    Denne statistik skal vi senere prøve at sende videre til Philips Hue og/eller Wekinator. 
    Men skriv den lige nu blot ind på siden.

*/
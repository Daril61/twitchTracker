import { GetStreamerStat, GetStreamerStatAVG, ConvertStreamerToId, ConvertIdToStreamer, GetMonthName } from './Utils.js';
google.charts.load('current', {'packages':['line']});

OnStart();

var streamerID; // 0 par défaut
var streamerName; // "" par défaut
var monthSelect; // Janvier par défaut
var valuesTemplate = "minutes_streamed,followers_total,hours_watched,views,rank";

var compareValueSelect = "minutes_streamed";

async function OnStart() {
    // Initialisation des variables
    streamerID = "0";
    streamerName = "";
    monthSelect = 1;

    // Récupération de tous les paramètres de l'url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    streamerID = parseInt(urlParams.get('streamer'), 10);

    // On regarde si la variable streamerID est set ou pas sinon on utilise la fonction ConvertStreamerToId()
    if(isNaN(streamerID)) {
        streamerID = await ConvertStreamerToId(urlParams.get('streamer'));
        streamerName = urlParams.get('streamer');
    } else {
        streamerName = await ConvertIdToStreamer(streamerID);
    }

    // On change le titre de la page ainsi que le titre principal
    document.title = "Stats de " + streamerName;
    document.getElementById("menu").innerHTML = "Statistiques de " + streamerName;

    ConfigButtons();
    UpdateTable()

    google.charts.setOnLoadCallback(drawChart);
}

// Fonction qui relie les différents boutons présent sur la page à des fonctions
function ConfigButtons() {
    for (let i = 1; i < 13; i++) {
        document.getElementById("mois"+i).addEventListener("click", function () { ChangeMonth(i); });
    }

    document.getElementById("minutesStreamedButton").addEventListener("click", function () { ChangeCompareValue("minutes_streamed") });
    document.getElementById("followersTotalButton").addEventListener("click", function () { ChangeCompareValue("followers_total") });
    document.getElementById("hoursWatchedButton").addEventListener("click", function () { ChangeCompareValue("hours_watched") });
    document.getElementById("viewsButton").addEventListener("click", function () { ChangeCompareValue("views") });
    document.getElementById("rankButton").addEventListener("click", function () { ChangeCompareValue("rank") });
}

// Fonction qui change le type de stats que le graphique affiche
function ChangeCompareValue(newValue) {
    compareValueSelect = newValue;
    drawChart();
}

// Fonction qui change le mois sélectionné, de plus elle update la variable values
function ChangeMonth(newMonth) {
    monthSelect = newMonth;
    UpdateTable();
}

async function UpdateTable() {
    // Actualisation du titre du tableau
    document.getElementById("tabTitle").textContent = "Moyenne des différentes statistiques";

    var AVGvalues = await GetStreamerStatAVG(streamerID, valuesTemplate, monthSelect);

    // On regarde si il y a des données
    if(AVGvalues != undefined) {       
        // On affiche car il y a des la données
        document.getElementById("minutesStreamed").innerHTML = parseInt(AVGvalues['minutes_streamed'], 10);
        document.getElementById("followersTotal").innerHTML = parseInt(AVGvalues['followers_total'], 10);
        document.getElementById("hoursWatched").innerHTML = parseInt(AVGvalues['hours_watched'], 10);
        document.getElementById("views").innerHTML = parseInt(AVGvalues['views'], 10);
        document.getElementById("rank").innerHTML = parseInt(AVGvalues['rank'], 10);
    } else {
        // On affiche pas car il n'y a pas de données
        document.getElementById("minutesStreamed").innerHTML = "Valeur inconnue";
        document.getElementById("followersTotal").innerHTML = "Valeur inconnue";
        document.getElementById("hoursWatched").innerHTML = "Valeur inconnue";
        document.getElementById("views").innerHTML = "Valeur inconnue";
        document.getElementById("rank").innerHTML = "Valeur inconnue";
    }
}

async function drawChart() {
    // Récupération de toute les données de l'année du streamer
    var AVGvalues = await GetStreamerStatAVG(streamerID, compareValueSelect, "1,2,3,4,5,6,7,8,9,10,11,12");

    // Si il y a aucune valeur après la requête
    if(AVGvalues === undefined) return;

    var monthToValues = new Map();

    // Si AVGValyes.length === undefined ça veut dire qu'il y a qu'une valeur
    if(AVGvalues.length === undefined) {
        monthToValues.set(new Date(AVGvalues['date']).getMonth(), undefined);
    } else {
        for (let i = 0; i < AVGvalues.length; i++) {
            monthToValues.set(new Date(AVGvalues[i]['date']).getMonth(), i);
        }
    }

    var data = new google.visualization.DataTable();

    data.addColumn('number', 'Mois');
    data.addColumn('number', compareValueSelect);
    
    for (let i = 1; i < 13; i++) {
        // Si le mois analysé à de la valeur associe
        if(monthToValues.has(i)) {
            if(AVGvalues.length === undefined) {
                data.addRows([
                    [
                    i,
                    parseInt(AVGvalues[compareValueSelect], 10)
                    ]
                ]);
            } else {
                data.addRows([
                    [
                    i,
                    parseInt(AVGvalues[monthToValues.get(i)][compareValueSelect], 10)
                    ]
                ]);
            }
        } else {
            data.addRows([[i, 0]]);
        }
    }

    var options = {
    chart: {
        title: 'Stats du streamer ' + streamerName + ' durant l\'année 2022',
        subtitle: 'Moyenne des streams sur chaque mois'
    },
    width: 900,
    height: 500
    };

    var chart = new google.charts.Line(document.getElementById('chart'));

    chart.draw(data, google.charts.Line.convertOptions(options));
}
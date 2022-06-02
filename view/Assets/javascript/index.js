import { GetAllStreamersValue, GetStreamerStatAVG, GetStreamerStat, ConvertIdToStreamer } from './Utils.js';

OnStart();

const listOfSelectedStreamers = Array();
var compareValueSelect = "views";

async function OnStart() {
    await ConfigButtons();
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(setupChart);
}

// Fonction qui configure tout les boutons de la page
async function ConfigButtons() {
    await drawStreamersButton();
    document.getElementById("minutesStreamedButton").addEventListener("click", function () { ChangeCompareValue("minutes_streamed") });
    document.getElementById("followersTotalButton").addEventListener("click", function () { ChangeCompareValue("followers_total") });
    document.getElementById("hoursWatchedButton").addEventListener("click", function () { ChangeCompareValue("hours_watched") });
    document.getElementById("viewsButton").addEventListener("click", function () { ChangeCompareValue("views") });
    document.getElementById("rankButton").addEventListener("click", function () { ChangeCompareValue("rank") });
}

// Fonction qui affiche tous les boutons des streamers
async function drawStreamersButton() {
    const streamers = await GetAllStreamersValue();

    let finalHtml = "";
    let checkBoxHtml = "";
    // Analyse de du tableau
	streamers.forEach(streamer => {
        listOfSelectedStreamers.push(streamer['id']);
		finalHtml += '<a href="./streamerInfo.php?streamer=' + streamer['id'] + '"><button type="button" class="btn">'+ streamer['name'] +'</button></a>';
		checkBoxHtml += '<input type="checkbox" id="' + streamer["id"] + '" checked></br>';
	});
    //boutons des streamers
    const streamerList = document.getElementById("bStreamers");
    streamerList.innerHTML = finalHtml + streamerList.innerHTML;
    //checkboxs
    const checkList = document.getElementById("checkBox");
    checkList.innerHTML = checkBoxHtml + checkList.innerHTML;
    listOfSelectedStreamers.forEach(streamer =>{
        //document.getElementById(streamer).addEventListener("click", function () { UpdateStreamerList(streamer); });
        document.getElementById(streamer).addEventListener('change', function () { UpdateStreamerList(streamer); });
    })
}

// Fonction qui change le type de stats que le graphique affiche
function ChangeCompareValue(newValue) {
    compareValueSelect = newValue;
    setupChart();
}

function SortFunctionForStreamersList(value1, value2) {
    return (value1 - value2);
}

function UpdateStreamerList(id) {
    const index = listOfSelectedStreamers.indexOf(id);
    // Vérification que le streamer est dans la liste
    if (index > -1) {
        listOfSelectedStreamers.splice(index, 1);
    } else {
        listOfSelectedStreamers.push(id)
    }

    listOfSelectedStreamers.sort(SortFunctionForStreamersList);
    
    setupChart();
}

async function setupChart() {
    var response = await GetStreamerStatAVG(listOfSelectedStreamers.toString(), compareValueSelect);

    // Si il n'y a pas de valeur on affiche un message d'erreur à la place du graphique
    if(response.length <= 0) {
        document.getElementById("Affichage").innerHTML = "<h4>Aucun streamer n'est sélectionné</h4>";
        return;
    }

    // Création d'une map qui met l'id du streamer et le mois soit 'ID:MOIS'
    var mapStreamerMonths = new Map();
    for (let i = 0; i < response.length; i++) {
        // Récupération du mois de la donnée
        var dataMonth = new Date(response[i]['date']).getMonth()
        mapStreamerMonths.set(response[i]['streamer'] + ":" + dataMonth, i);
    }

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Mois');
    var names = listOfSelectedStreamers.map(async(element) => {
        let nameStreamer = await ConvertIdToStreamer(element);
        //var nameStreamer = element;
        data.addColumn('number', nameStreamer);

        return data;
    })
    Promise.all(names)
    .then(() => {
        // Pour chaque mois
        for (let mois = 0; mois < 12; mois++) {
            var finalMonthValues = Array();
            listOfSelectedStreamers.forEach(streamerID => {
                var mapValue = mapStreamerMonths.get(streamerID + ":" + mois);
                if(mapValue === undefined) {
                    finalMonthValues.push(0);
                } else {
                    finalMonthValues.push(parseInt(response[mapValue][compareValueSelect], 10));
                }
            });
            finalMonthValues.unshift(mois);
            console.log(finalMonthValues);
            data.addRows([finalMonthValues]);
        }

        // Calcul du pourcentage pour la taille du graphique
        var percentsWidth = parseInt(document.getElementById("Affichage").offsetWidth);
        var percentsHeight = parseInt(document.getElementById("Affichage").offsetHeight);

        var options = {
            chart: {
            title: 'Comparaison des stats des streamers',
            subtitle: 'Affichage de : (' + compareValueSelect + ')'
            },
            width: percentsWidth,
            height: percentsHeight
        };

        var chart = new google.charts.Line(document.getElementById('Affichage'));
        chart.draw(data, google.charts.Line.convertOptions(options));
    });
    /*data.addColumn('number', await ConvertIdToStreamer(1));
    data.addColumn('number', await ConvertIdToStreamer(2));
    data.addColumn('number', await ConvertIdToStreamer(3));
    data.addColumn('number', await ConvertIdToStreamer(4));
    data.addColumn('number', await ConvertIdToStreamer(5));
    data.addColumn('number', await ConvertIdToStreamer(6));*/
}
// Fonction qui permet de récupérer tous les streamers
export async function GetAllStreamersValue(){
    // Récupération des données grâce à l'API elle renvoye un array
    const reponse = await axios.get("http://185.157.246.102/projet/API/GetStreamers");

	return reponse.data;
}

// Fonction qui récupère une stat d'un streamer 
export async function GetStreamerStat(id, type, months) {
    if(id == "") return Array();

    var response = null;

    // Si la variable mois n'est pas défini
    if(months === undefined) {
        response = await axios.get("http://185.157.246.102/projet/API/GetStreamerStat/" + id + "/" + type);
    } 
    else {
        response = await axios.get("http://185.157.246.102/projet/API/GetStreamerStat/" + id + "/" + type + "/" + months);
    }

    return response.data;
}

// Fonction qui récupère une stat d'un streamer 
export async function GetStreamerStatAVG(id, type, months) {
    if(id == "") return Array();

    var response = null;

    // Si la variable mois n'est pas défini
    if(months === undefined) {
        response = await axios.get("http://185.157.246.102/projet/API/GetStreamerStatAVG/" + id + "/" + type);
    } 
    else {
        response = await axios.get("http://185.157.246.102/projet/API/GetStreamerStatAVG/" + id + "/" + type + "/" + months);
    }

    if(response.data.length > 1)
        return response.data;

    return response.data[0];
}

export async function ConvertStreamerToId(streamer) {
    var response = await axios.get("http://185.157.246.102/projet/API/ConvertStreamerToId/" + streamer)

    return response.data[0]['id'];
}

export async function ConvertIdToStreamer(idStreamer) {
    var response = await axios.get("http://185.157.246.102/projet/API/ConvertIdToStreamer/" + idStreamer)

    return response.data[0]['name'];
}

export function GetMonthName(monthNb) {
    const date = new Date();
    date.setMonth(monthNb - 1);
    
    const month = date.toLocaleString('fr-FR', { month: 'long' })

    return month.charAt(0).toUpperCase() + month.slice(1);
  }
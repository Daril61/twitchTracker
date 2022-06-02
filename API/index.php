<?php
include_once(__DIR__.'/../app/App.php');
include_once(__DIR__.'/Controller/UseController.php');

// Création de l'application
$app = new App('localhost', 'twitch', 'userProjet', '');

if(isset($_GET["type"])) {
    $use = new UseController($app);
    switch ($_GET["type"]) {
        case "GetStreamers":
            $use->GetStreamers();
            break;
        case "GetStreamerStat":
            // Si la variable $_GET["month"] est défini
            if(isset($_GET["month"])) 
                $use->GetStreamerStat($_GET["id"], $_GET["bddType"], $_GET["month"]);
            else
                $use->GetStreamerStat($_GET["id"], $_GET["bddType"]);
            break;
        case "GetStreamerStatAVG":
            // Si la variable $_GET["month"] est défini
            if(isset($_GET["month"])) 
                $use->GetStreamerStatAVG($_GET["id"], $_GET["bddType"], $_GET["month"]);
            else
                $use->GetStreamerStatAVG($_GET["id"], $_GET["bddType"]);
            break;
        case "ConvertStreamerToId":
            $use->ConvertStreamerToId($_GET['streamer']);
            break;
        case "ConvertIdToStreamer":
            $use->ConvertIdToStreamer($_GET['id']);
            break;
        default:
            $use->Help();
            break;
    }
}

?>
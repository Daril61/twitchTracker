<?php

include_once(__DIR__.'/BaseController.php');

class UseController extends BaseController 
{
    public function GetStreamers() {
        $query = $this->app->getDBConnection()->prepare('SELECT id, name from streamers');
        $query->execute();
        $streamerInfo = $query->fetchAll(PDO::FETCH_ASSOC);

        $this->sendInformation('json', $streamerInfo); 
    }
    
    public function GetStreamerStat(string $id, string $bddType, string $month = null) {
        if(!isset($id) || $id == "") {
            $this->sendInformation('400', array());
            return;
        }

        // On regarde si la variable month n'est pas vide
        if($month != null) 
            $query = $this->app->getDBConnection()->prepare('SELECT `streamer`, `date`, '.$bddType.' FROM `streamers-stats` WHERE streamer IN ('.$id.') AND MONTH(date) IN ('.$month.') ORDER BY streamer');
        else
            $query = $this->app->getDBConnection()->prepare('SELECT `streamer`, `date`, '.$bddType.' FROM `streamers-stats` WHERE streamer IN ('.$id.') ORDER BY streamer');

        $query->execute();
        $stats = $query->fetchAll(PDO::FETCH_ASSOC);

        if(count($stats) == '0') {
            $stats = [];
        }

        $this->sendInformation('json', $stats); 
    }

    public function GetStreamerStatAVG(string $id, string $bddType, string $month = null) {
        if(!isset($id) || $id == "") {
            $this->sendInformation('400', array());
            return;
        }


        $types = explode( ',', $bddType );
        for ($i = 0; $i < count($types); $i++) {
            $types[$i] = "AVG(" . $types[$i] . ") AS " . $types[$i];
        }


        $types = implode(",", $types);

        // On regarde si la variable month n'est pas vide
        if($month != null) 
            $query = $this->app->getDBConnection()->prepare('SELECT `streamer`, `date`, '.$types.' FROM `streamers-stats` WHERE streamer IN ('.$id.') AND MONTH(date) IN ('.$month.') GROUP BY streamer, date ORDER BY streamer');
        else
            $query = $this->app->getDBConnection()->prepare('SELECT `streamer`, `date`, '.$types.' FROM `streamers-stats` WHERE streamer IN ('.$id.') GROUP BY streamer, date ORDER BY streamer');

        $query->execute();
        $stats = $query->fetchAll(PDO::FETCH_ASSOC);

        if(count($stats) == '0') {
            $stats = [];
        }

        $this->sendInformation('json', $stats); 
    }

    public function ConvertStreamerToId(string $streamer) {
        // On regarde si la variable streamer existe et si elle possède une valeur
        if(!isset($streamer) || $streamer == "") {
            $this->sendInformation('400', array());
            return;
        }

        $query = $this->app->getDBConnection()->prepare('SELECT id FROM streamers WHERE name LIKE "%'.$streamer.'%" LIMIT 1');
        $query->execute();
        $streamerID = $query->fetchAll(PDO::FETCH_ASSOC);

        // On regarde si on a bien obtenue une réponse
        if(count($streamerID) == '0') {
            $this->sendInformation('400', []);
            return;
        }

        $this->sendInformation('json', $streamerID);
    }

    public function ConvertIdToStreamer(string $id) {
        if(!isset($id) || $id == "") {
            $this->sendInformation('400', array());
            return;
        }

        $query = $this->app->getDBConnection()->prepare('SELECT name FROM streamers WHERE id = '.$id.' LIMIT 1');
        $query->execute();
        $streamerName = $query->fetchAll(PDO::FETCH_ASSOC);

        // On regarde si on a bien obtenue une réponse
        if(count($streamerName) == '0') {
            $this->sendInformation('400', []);
            return;
        }

        $this->sendInformation('json', $streamerName);
    }
}
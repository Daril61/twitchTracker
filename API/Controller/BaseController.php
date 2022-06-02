<?php

include_once(__DIR__.'/../../app/App.php');

class BaseController {
    public $app = null;

    function __construct(App $_app) {
        $this->app = $_app;
    }

    public function sendInformation(string $type, array $informations) {
        if($type == '400')
        {
            header("HTTP/1.1 400 Bad Request");
            return;
        }

        header('Content-Type: application/json');
        echo json_encode($informations, JSON_PRETTY_PRINT);   
    }

    public function Help() {
       $allQuery = array(
           array("name" => "GetStreamers"),
           array("name" => "GetStreamerStat/ID/TYPE"),
       );
       
       $this->sendInformation('json', $allQuery);
    }
}
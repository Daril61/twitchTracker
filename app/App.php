<?php

class App {
    private $db;

    // à la création de la class on génère une connection à la base de donnée
    function __construct(string $host, string $dbname, string $user, string $password)
    {
        try {
            $this->db = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
        } catch (PDOException $e) { 
            print "Erreur !: ".$e->getMessage()."<br/>";
            die();
        }
    }

    public function getDBConnection() {
        return $this->db;
    }

    public function Select(string $query, array $parameters) {
        try {
            // On execute la query mis en parametre grâce à la fonction ExecuteQuery()
            $query = $this->ExecuteQuery($query, $parameters);

            // On met le résultat de la requete dans la variable $result
            $result = $query->fetchAll(PDO::FETCH_ASSOC);

            $query->close();
            return $result;
        } catch(Exception  $e) {
            throw New Exception( $e->getMessage() );
        }
    }
 
    private function ExecuteQuery(string $queryExecute, array $parameters = array()) { 
        try {
            $query = $this->database->prepare($queryExecute);
            
            // Si il y a des paramètres on l'ai ajoute à la query
            if(count($parameters) > 0) {
                $query->execute($parameters);
            }

            $query->execute();

            return $query;
        } catch(Exception  $e) {
            throw New Exception( $e->getMessage() );
        }
    }
}


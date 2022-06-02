<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="<?= $url ?>view/style.css">
        <title>Stats de </title>
    </head>

    <body>
        <div class="Menu" id="menu">
            Statistiques de 
        </div>

        <div class="leftColumn" id="StatsButtons">
            <a href="<?= $url ?>public/">
                <button type="button" class="btn" id="back">Retour</button>
            </a>
            <button type="button" class="btn" id="minutesStreamedButton">Minutes diffusées</button>
            <button type="button" class="btn" id="followersTotalButton">Total d'abonnés</button>
            <button type="button" class="btn" id="hoursWatchedButton">Heures regardées</button>
            <button type="button" class="btn" id="viewsButton">Vues</button>
            <button type="button" class="btn" id="rankButton">Rang</button>
            <img src="<?= $url ?>view/Assets/Image/TwitchGlitchPurple.png" class="logo"></img>
        </div>

        
        <div class="milieu">
            <div class="right">
                <table class="tableau">
                    <tr>
                        <th colspan="2" id="tabTitle">Moyenne des différentes statistiques</th>
                    </tr>
                    
                    <tr>
                        <td>Minutes diffusées</td>
                        <td id="minutesStreamed">13435</td>
                    </tr>
                    <tr>
                        <td>Total d'abonnés</td>
                        <td id="followersTotal">12453</td>
                    </tr>
                    <tr>
                        <td>Heures regardées</td>
                        <td id="hoursWatched">52</td>
                    </tr>
                    <tr>
                        <td>Vues</td>
                        <td id="views">1258215</td>
                    </tr>
                    <tr>
                        <td>Rang</td>
                        <td id="rank">1</td>
                    </tr>
                </table>
            </div>
            <div class="left">
                <div class="chart" id="chart"></div>
            </div>
            <div class="Statistiques">
                <div class="months">
                    <button type="button" class="btn" id="mois1">Janvier</button>
                    <button type="button" class="btn" id="mois2">Février</button>
                    <button type="button" class="btn" id="mois3">Mars</button>
                    <button type="button" class="btn" id="mois4">Avril</button>
                    <button type="button" class="btn" id="mois5">Mai</button>
                    <button type="button" class="btn" id="mois6">Juin</button>
                    <button type="button" class="btn" id="mois7">Juillet</button>
                    <button type="button" class="btn" id="mois8">Août</button>
                    <button type="button" class="btn" id="mois9">Septembre</button>
                    <button type="button" class="btn" id="mois10">Octobre</button>
                    <button type="button" class="btn" id="mois11">Novembre</button>
                    <button type="button" class="btn" id="mois12">Décembre</button>
                </div>
            </div>
        </div>
    </body>

    <script src="https://www.gstatic.com/charts/loader.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
	<script type="module" src="<?= $url ?>view/Assets/javascript/Utils.js"></script>
	<script type="module" src="<?= $url ?>view/Assets/javascript/streamerInfo.js"></script>
</html>
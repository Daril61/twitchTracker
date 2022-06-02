<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="<?= $url ?>view/style.css">
    <title>Twitch Statistiques</title>
</head>
<body>

	<div class="Menu">
		Statistiques des streamers Twitch 
	</div>

	<div id="Streamers" class="leftColumn"><!--div contenant les boutons des Streamers-->
		<div id="buttons">
			<div id="bStreamers"></div>
			<div id="checkBox"></div>
		</div>
		<img src="<?= $url ?>view/Assets/Image/TwitchGlitchPurple.png" class="logo"></img>
	</div>

	<div class="milieu"><!--div contenant l'affichage des statistiques-->
		<div id="Affichage" class="Affichage">
		</div>
		<div class="Statistiques">
			<button type="button" class="btn" id="minutesStreamedButton">Minutes diffusées</button>
            <button type="button" class="btn" id="followersTotalButton">Total d'abonnés</button>
            <button type="button" class="btn" id="hoursWatchedButton">Heures regardées</button>
            <button type="button" class="btn" id="viewsButton">Vues</button>
            <button type="button" class="btn" id="rankButton">Rang</button>
		</div>
	</div>

	<script src="https://www.gstatic.com/charts/loader.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
	<script type="module" src="<?= $url ?>view/Assets/javascript/Utils.js"></script>
	<script type="module" src="<?= $url ?>view/Assets/javascript/index.js"></script>

</body>
</html>
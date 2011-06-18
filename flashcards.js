/*jslint white: true, onevar: true, browser: true, undef: true, nomen: true,
	regexp: true, plusplus: false, bitwise: true, newcap: true, maxerr: 50,
	maxlen: 80, indent: 4 */

var cards = [
	["1st Singular (female)", [
		["porta, -ae (f) -> Sg. Nom.", "porta"],
		["porta, -ae (f) -> Sg. Gen.", "portae"],
		["porta, -ae (f) -> Sg. Dat.", "portae"],
		["porta, -ae (f) -> Sg. Acc.", "portam"],
		["porta, -ae (f) -> Sg. Abl.", "portā"] ] ],
	["1st Plural (female)", [
		["porta, -ae (f) -> Pl. Nom.", "portae"],
		["porta, -ae (f) -> Pl. Gen.", "portārum"],
		["porta, -ae (f) -> Pl. Dat.", "portīs"],
		["porta, -ae (f) -> Pl. Acc.", "portās"],
		["porta, -ae (f) -> Pl. Abl.", "portīs"] ] ],
	["2nd Singular (male)", [
		["amīcus, -ī (m) -> Sg. Nom.", "amīcus"],
		["amīcus, -ī (m) -> Sg. Gen.", "amīcī"],
		["amīcus, -ī (m) -> Sg. Dat.", "amīcō"],
		["amīcus, -ī (m) -> Sg. Acc.", "amīcum"],
		["amīcus, -ī (m) -> Sg. Abl.", "amīcō"]]],
	["2nd Plural (male)", [
		["amīcus, -ī (m) -> Pl. Nom.", "amīcī"],
		["amīcus, -ī (m) -> Pl. Gen.", "amīcōrum"],
		["amīcus, -ī (m) -> Pl. Dat.", "amīcīs"],
		["amīcus, -ī (m) -> Pl. Acc.", "amīcōs"],
		["amīcus, -ī (m) -> Pl. Abl.", "amīcīs"]]],
	["2nd Singular (neuter)", [
		["dōnum, -ī (n) -> Sg. Nom.", "dōnum"],
		["dōnum, -ī (n) -> Sg. Gen.", "dōnī"],
		["dōnum, -ī (n) -> Sg. Dat.", "dōnō"],
		["dōnum, -ī (n) -> Sg. Acc.", "dōnum"],
		["dōnum, -ī (n) -> Sg. Abl.", "dōnō"]]],
    ["2nd Plural (neuter)", [
		["dōnum, -ī (n) -> Pl. Nom.", "dōna"],
		["dōnum, -ī (n) -> Pl. Gen.", "dōnōrum"],
		["dōnum, -ī (n) -> Pl. Dat.", "dōnīs"],
		["dōnum, -ī (n) -> Pl. Acc.", "dōna"],
		["dōnum, -ī (n) -> Pl. Abl.", "dōnīs"]]],
	["3rd Singular (male/female)", [
		["rēx, rēgis (m) -> Sg. Nom.", "rēx"],
		["rēx, rēgis (m) -> Sg. Gen.", "rēgis"],
		["rēx, rēgis (m) -> Sg. Dat.", "rēgī"],
		["rēx, rēgis (m) -> Sg. Acc.", "rēgem"],
		["rēx, rēgis (m) -> Sg. Abl.", "rēge"]]],
	["3rd Plural (male/female)", [
		["rēx, rēgis (m) -> Pl. Nom.", "rēgēs"],
		["rēx, rēgis (m) -> Pl. Gen.", "rēgum"],
		["rēx, rēgis (m) -> Pl. Dat.", "rēgibus"],
		["rēx, rēgis (m) -> Pl. Acc.", "rēgēs"],
		["rēx, rēgis (m) -> Pl. Abl.", "rēgibus"]]]
];

var activeCards = [];
var sequence = [];
var currentCard = 0;
var pos = 0;

function isValueInSequence(theory, sequence) {
	var i;
	for (i = 0; i < sequence.length; i++) {
		if (sequence[i] === theory) {
			return true;
		}
	}
	return false;
}

function generateRandomSequence(size) {
	var sequence = [], i = size, j;
	while (i > 0) {
		j = Math.floor(Math.random() * size);
		if (!isValueInSequence(j, sequence)) {
			sequence.push(j);
			i--;
		}
	}
	return sequence;
}

function init() {
	pos = 0;
	sequence = generateRandomSequence(activeCards.length);
}


function go() {
	pos++;
	
	if (pos >= sequence.length) {
		init();
	}
	
	currentCard = sequence[pos];
	document.getElementById('question').innerHTML = activeCards[currentCard][0];
	document.getElementById('feedback').innerHTML = "";
	document.getElementById('answer').value = "";
	document.getElementById('status').innerHTML = (pos + 1) + " of " +
		sequence.length;
	document.getElementById('answer').focus();
}

function checkAnswer() {
	var userAnswer = document.getElementById('answer').value;
	if (userAnswer === activeCards[currentCard][1]) {
		document.getElementById('feedback').innerHTML = "Correct!";
		document.getElementById('next').focus();
	} else {
		document.getElementById('feedback').innerHTML = "Incorrect.";
		document.getElementById('answer').focus();
		document.getElementById('answer').select();
	}
}

function handleKeyPress(e) {
	if (e.keyCode === 13) {
		checkAnswer();
		return false;
	} else {
		return true;
	}
}

function insertChar(character) {
	document.getElementById('answer').value += character;
	document.getElementById('answer').focus();
}

function doSetup() {
	var i;
	activeCards = [];
	for (i = 0; i < document.checkboxes.cardset.length; i++) {
		if (document.checkboxes.cardset[i].checked) {
			activeCards = activeCards.concat(cards[i][1]);
		}
	}

	if (activeCards.length === 0) {
		alert("Please select at least one card set.")
		return;
	}

	document.getElementById('setup').style.display = 'none';
	document.getElementById('content').style.display = 'block';
	sequence = [];
	go();
}

function startSetup() {
	var br, checkbox, i;
	for (i = 0; i < cards.length; i++) {
		br = document.createElement('br');
		checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "cardset";
		document.getElementById('checkboxes').appendChild(checkbox);
		document.getElementById('checkboxes').appendChild(
			document.createTextNode(cards[i][0])
		);
		document.getElementById('checkboxes').appendChild(br);
	}
}

function resumeSetup() {
	document.getElementById('setup').style.display = 'block';
	document.getElementById('content').style.display = 'none';
}

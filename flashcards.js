/*jslint white: true, onevar: true, browser: true, undef: true, nomen: true,
	regexp: true, plusplus: false, bitwise: true, newcap: true, maxerr: 50,
	maxlen: 80, indent: 4 */

var cards = [
	["1st Singular", [
		["porta, -ae (f) -> Sg. Nom.", "porta"],
		["porta, -ae (f) -> Sg. Gen.", "portae"],
		["porta, -ae (f) -> Sg. Dat.", "portae"],
		["porta, -ae (f) -> Sg. Acc.", "portam"],
		["porta, -ae (f) -> Sg. Abl.", "portā"] ] ],
	["1st Plural", [
		["porta, -ae (f) -> Pl. Nom.", "portae"],
		["porta, -ae (f) -> Pl. Gen.", "portārum"],
		["porta, -ae (f) -> Pl. Dat.", "portīs"],
		["porta, -ae (f) -> Pl. Acc.", "portās"],
		["porta, -ae (f) -> Pl. Abl.", "portīs"] ] ]
];

var activeCards = [];

// For now, we will just make all cards active. In the future,
// we will allow the user to choose the sets of cards they want
// to be quizzed on.
activeCards = activeCards.concat(cards[0][1], cards[1][1]);

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




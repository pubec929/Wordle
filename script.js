// Fetch data of dictionary.json and targetWords.json
const resDictionary = await fetch('dictionary.json');
const dictionary = await resDictionary.json();

const resTargetWords = await fetch('targetWords.json');
const targetWords = await resTargetWords.json();

const WORD_LENGTH = 5;

const offsetFromDate = new Date(2022, 2, 6);
const msOffset = Date.now() - offsetFromDate;
const dayOffset = msOffset / 1000 / 60 / 60 / 24;
const targetWord = targetWords[Math.floor(dayOffset)];

const guessGrid = document.querySelector('[data-guess-grid]');
const alertContainer = document.querySelector('[data-alert-container]');

startInteraction();

function startInteraction() {
	document.addEventListener('click', handleMouseClick);
	document.addEventListener('keydown', handleKeyPress);
}

function stopInteraction() {
	document.removeEventListener('click', handleMouseClick);
	document.removeEventListener('keydown', handleKeyPress);
}

function handleMouseClick(e) {
	if (e.target.matches('[data-key]')) {
		pressKey(e.target.dataset.key);
		return;
	}

	if (e.target.matches('[data-enter]')) {
		submitGuess();
		return;
	}

	if (e.target.matches('[data-delete]')) {
		deleteKey();
		return;
	}
}

function handleKeyPress(e) {
	if (e.key === 'Enter') {
		submitGuess();
		return;
	}

	if (e.key === 'Backspace' || e.key === 'Delete') {
		deleteKey();
		return;
	}

	if (e.key.match(/^[a-z]$/)) {
		pressKey(e.key);
		return;
	}
}

function pressKey(key) {
	if (getActiveTiles().length >= WORD_LENGTH) {
		return;
	}
	const nextTile = guessGrid.querySelector(':not([data-letter])');
	nextTile.dataset.letter = key.toLowerCase();
	nextTile.textContent = key;
	nextTile.dataset.state = 'active';
}

function deleteKey() {
	const activeTiles = getActiveTiles();
	const lastTile = activeTiles[activeTiles.length - 1];
	if (lastTile === null) {
		return;
	}

	lastTile.textContent = '';
	delete lastTile.dataset.state;
	delete lastTile.dataset.letter;
}

function submitGuess() {
	const activeTiles = [...getActiveTiles()];
	if (activeTiles.length !== WORD_LENGTH) {
		showAlert('Not enough letters');
		//shakeTiles(activeTiles); // Not implemented yetf
		return;
	}
}

function getActiveTiles() {
	return guessGrid.querySelectorAll('[data-state="active"]');
}

function showAlert(message, duration = 1000) {
	const alert = document.createElement('div');
	alert.textContent = message;
	alert.classList.add('alert');
	alertContainer.prepend(alert);
	if (duration === null) return;

	setTimeout(() => {
		alert.classList.add('hide');
		alert.addEventListener('transitioned', () => {
			alert.remove();
		});
	}, duration);
}

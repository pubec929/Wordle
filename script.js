// Fetch data of dictionary.json and targetWords.json
const resDictionary = await fetch('dictionary.json');
const dictionary = await resDictionary.json();

const resTargetWords = await fetch('targetWords.json');
const targetWords = await resTargetWords.json();

startInteraction();

function startInteraction() {
	document.addEventListener('click', handleMouseClick);
	document.addEventListener('keydown', handleKeyPress);
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
		pressKey();
	}
}

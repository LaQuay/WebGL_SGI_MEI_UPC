var soundsUrl = [
	'./sounds/tick.mp3',
	'./sounds/sms_alert.mp3'	
]

function initSounds() {
	
}

function playSound(localURL, checkIfEnabled) {
	if (!checkIfEnabled || (checkIfEnabled && isSoundEnabled())) {
		var audio = new Audio(localURL);
		audio.play();
	} 
}
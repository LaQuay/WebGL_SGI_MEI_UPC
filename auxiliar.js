function degToRad(degrees) {
	return degrees * Math.PI / 180;
}

//https://stackoverflow.com/a/5344074/4314686
function customClone(oldObject) {
	return JSON.parse(JSON.stringify(oldObject));
}

function resize(canvas) {
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;
 
  // Check if the canvas is not the same size.
  if (canvas.width  != displayWidth ||
	  canvas.height != displayHeight) {	 
	// Make the canvas the same size
	canvas.width  = displayWidth;
	canvas.height = displayHeight;
  }
}

function hex_to_RGB(hex) {
	var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
	
	return {
		R: parseInt(m[1], 16) / 255,
		G: parseInt(m[2], 16) / 255,
		B: parseInt(m[3], 16) / 255
	};
}

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgb_To_Hex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getRandomRGBColors() {
	var r = randomRGB();
	var g = randomRGB();
	var b = randomRGB();
	
	while ((r+g+b) < 1.0 || (r+g+b) > 2.0) {
		r = randomRGB(); 
		g = randomRGB(); 
		b = randomRGB();
	}	
	
	return {
		R: r,
		G: g,
		B: b
	}
}

function randomRGB() {
	return parseFloat((Math.random() * (1.00 - 0.00) + 0.00).toFixed(2));
}
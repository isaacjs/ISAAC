// Module to handle simulation of Earth's orbit using physics.

// Units
// Distance: gigameters
// Mass: gigagrams
var G = 6.67e-32 // in Newton square Gigameters per Gigagram squared.
var Gmm = 7.93e11 // in Gigagram Gigameters per second squared.
var timeStep = 2880 // in seconds.

var config = Config();

// ------ Debug Variables ------ //
var distance;
// ------ End of Debug Variables ------ //

// Gravitational Force Function.
// Given two objects, returns the vector of gravitational force between them, from the first object
// to the second.
function gravitationalForce (obj1, obj2) {	
	// Get the direction vector from the first object to the second.
	var directionVector = subtractVector(obj2.motion.position, obj1.motion.position);
	
	// Get the distance between the two objects.
	distance = vectorLength(directionVector);
	
	// Get Gm1m2.
	var numerator = G * obj1.physical.mass * obj2.physical.mass;
	
	// Modify Gm1m2 according to the relevant multipliers.
	numerator *= config['Gravitational Constant Multiplier'];
	numerator *= obj1.config['Mass Multiplier'];
	numerator *= obj2.config['Mass Multiplier'];
	
	// Get the force between the two objects.
	var force = numerator / Math.pow(distance, 2);
	
	// Scale the direction vector to be the same magnitude as the force.
	directionVector = vectorFitToLength(directionVector, force);
	obj1.switches.forceChanged = true;
	return directionVector;
}

function Config() {
	return {
		"Update Step" : 1,
		"Gravitational Constant Multiplier" : 1,
		"Camera Focus" : 0
	}
}

// Updates the position of the planets.
function update () {
	// Update the position of the planets. Use the updateStep specified by the user
	// (default: 1 second is 1 day).
	for (var i = 0; i < config["Update Step"]; i++) {
		// Update Earth's gravity.
		updateGravity(Earth, Sun);
		updateGravity(Earth, Mars);
		updateGravity(Earth, Mercury);
		updateGravity(Earth, Jupiter);
		updateGravity(Earth, Neptune);
		updateGravity(Earth, Venus);
		updateGravity(Earth, Uranus);
		updateGravity(Earth, Saturn);
		updateGravity(Earth, Pluto);
		
		// Update Mars' gravity.
		updateGravity(Mars, Sun);
		updateGravity(Mars, Mercury);
		updateGravity(Mars, Jupiter);
		updateGravity(Mars, Neptune);
		updateGravity(Mars, Venus);
		updateGravity(Mars, Uranus);
		updateGravity(Mars, Saturn);
		updateGravity(Mars, Pluto);
		
		// Update Mercury's gravity.
		updateGravity(Mercury, Sun);
		updateGravity(Mercury, Jupiter);
		updateGravity(Mercury, Neptune);
		updateGravity(Mercury, Venus);
		updateGravity(Mercury, Uranus);
		updateGravity(Mercury, Saturn);
		updateGravity(Mercury, Pluto);
		
		// Update Jupiter's gravity.
		updateGravity(Jupiter, Sun);
		updateGravity(Jupiter, Neptune);
		updateGravity(Jupiter, Venus);
		updateGravity(Jupiter, Uranus);
		updateGravity(Jupiter, Saturn);
		updateGravity(Jupiter, Pluto);
		
		// Update Neptune's gravity.
		updateGravity(Neptune, Sun);
		updateGravity(Neptune, Venus);
		updateGravity(Neptune, Uranus);
		updateGravity(Neptune, Saturn);
		updateGravity(Neptune, Pluto);
		
		// Update Venus' gravity.
		updateGravity(Venus, Sun);
		updateGravity(Venus, Uranus);
		updateGravity(Venus, Saturn);
		updateGravity(Venus, Pluto);
		
		// Update Uranus' gravity.
		updateGravity(Uranus, Sun);
		updateGravity(Uranus, Saturn);
		updateGravity(Uranus, Pluto);
		
		// Update Saturn's gravity.
		updateGravity(Saturn, Sun);
		updateGravity(Saturn, Pluto);
		
		// Update Pluto's gravity.
		updateGravity(Pluto, Sun);
		
		var movementResult = movementModule(Earth);
		movementResult = movementModule(Mars);
		movementResult = movementModule(Mercury);
		movementResult = movementModule(Jupiter);
		movementResult = movementModule(Neptune);
		movementResult = movementModule(Venus);
		movementResult = movementModule(Uranus);
		movementResult = movementModule(Saturn);
	}
}

function updateGravity(planet1, planet2) {
	planet1.forceStore["gravity" + planet2.Name] = gravitationalForce(planet1, planet2);
	planet2.forceStore["gravity" + planet1.Name] = gravitationalForce(planet2, planet1);
}

// ------ The following code has been deprecated. ------ //

// Takes in an object and a canvas context, draws it on the canvas.
function drawPosition (obj, context) {
	var posArray = obj.motion.position;
	drawCircle(posArray, 20, context);
}

// Takes in a position, a radius, and a canvas context, draws a circle of that radius
// at the given position on the canvas.
function drawCircle (position, radius, ctx) {
	// Begin the path.
	ctx.beginPath();
	
	// Draw the arc.
	ctx.arc(position[0], position[1], radius, 0, 2*Math.PI, true);
	
	// Only draw the circumference.
	ctx.stroke();
}

// Canvas animation function.
function init() {
	setInterval(update, 16);
}

// Handles updating of settings based on user input.
function settingsUpdate() {
	// Get the slider.
	var slider = document.getElementById('timescale');
	if(slider) {
		// Change the updateStep.
		updateStep = slider.value;
	}
}
// ------ End of deprecated code. ------ //
// Module to handle simulation of Earth's orbit using physics.

// Units
// Distance: gigameters
// Mass: gigagrams
var G = 6.67e-32 // in Newton square Gigameters per Gigagram squared.
var Gmm = 7.93e11 // in Gigagram Gigameters per second squared.
var timeStep = 864 // in seconds.

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
		"Update Step" : 10,
		"Gravitational Constant Multiplier" : 1
	}
}

// Updates the position of the planets.
function update () {
	// Update the timestep.
	settingsUpdate();
	
	// Update the position of the planets. Use the updateStep specified by the user
	// (default: 1 second is 6 days).
	for (var i = 0; i < config["Update Step"]; i++) {
		// Get the force of gravity and add it to the Earth.
		//Earth.forceStore.gravity = gravitationalForce(Earth, Sun);
		//Earth.forceStore.gravityMars = gravitationalForce(Earth, Mars);
		updateGravity(Earth, Sun);
		updateGravity(Earth, Mars);
		updateGravity(Earth, Mercury);
		updateGravity(Earth, Jupiter);
		
		// Get the force of gravity and add it to Mars.
		//Mars.forceStore.gravity = gravitationalForce(Mars, Sun);
		//Mars.forceStore.gravityEarth = gravitationalForce(Mars, Earth);
		updateGravity(Mars, Sun);
		updateGravity(Mars, Mercury);
		updateGravity(Mars, Jupiter);
		
		updateGravity(Mercury, Sun);
		updateGravity(Mercury, Jupiter);
		
		updateGravity(Jupiter, Sun);
		
		var movementResult = movementModule(Earth);
		movementResult = movementModule(Mars);
		movementResult = movementModule(Mercury);
		movementResult = movementModule(Jupiter);
	}
	
	var directionVector = subtractVector(Earth.motion.position, Sun.motion.position);
	
	// Display the current distance from the sun.
	// var distanceLabel = document.getElementById('distanceLabel');
	// if(distanceLabel) {
	// distanceLabel.innerHTML = distance;
	// }
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
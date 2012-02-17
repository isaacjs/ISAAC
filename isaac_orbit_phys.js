// Module to handle simulation of Earth's orbit using physics.

// Units
// Distance: gigameters
// Mass: gigagrams
var Gmm = 7.93e11 // in Gigagram Gigameters per second squared.
var timeStep = 864 // in seconds.


var Earth = PhysicalObject();
Earth.physical.mass = 5.9721986e18;
Earth.motion.position = [149.598261, 0, 0];
Earth.motion.velocity = [0, 2.929e-5, 0];

Earth.switches.motionEnabled = true;
Earth.switches.accelerationEnabled = true;

var Sun = PhysicalObject();
Sun.motion.position = [0, 0, 0];

var config = Config();

// ------ Debug Variables ------ //
var distance;
// ------ End of Debug Variables ------ //

// Gravitational Force Function.
// Given the Earth and the Sun, returns the vector of gravitational force between them, from the first Earth
// to the Sun.
function gravitationalForce (earth, sun) {	
	// Get the direction vector from the first object to the second.
	var directionVector = subtractVector(sun.motion.position, earth.motion.position);
	
	// Get the distance between the Earth and the Sun.
	distance = vectorLength(directionVector);
	
	// Get the force between the two objects.
	var force = Gmm / Math.pow(distance, 2);
	
	// Scale the direction vector to be the same magnitude as the force.
	directionVector = vectorFitToLength(directionVector, force);
	earth.switches.forceChanged = true;
	return directionVector;
}

function Config() {
	return {
		"Update Step" : 10
	}
}

// Function used to update the canvas.
// Updates the position of the earth, and draws it.
function update () {
	// Update the timestep.
	settingsUpdate();
	
	// Get the force of gravity and add it to the Earth.
	Earth.forceStore.gravity = gravitationalForce(Earth, Sun);
	
	// Update the position of the earth. Use the updateStep specified by the user
	// (default: 1 second is 6 days).
	for (var i = 0; i < config["Update Step"]; i++) {
		var movementResult = movementModule(Earth);
	}
	
	var directionVector = subtractVector(Earth.motion.position, Sun.motion.position);
	
	// Display the current distance from the sun.
	// var distanceLabel = document.getElementById('distanceLabel');
	// if(distanceLabel) {
		// distanceLabel.innerHTML = distance;
	// }
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
// Module to handle simulation of Earth's orbit using physics.

// Units
// Distance: gigameters
// Mass: gigagrams
var Gmm = 7.93e11 // in Gigagram Gigameters per second squared.
//var Gmm = 
var timeStep = 864 // in seconds.


var Earth = PhysicalObject();
Earth.physical.mass = 5.9721986e18;
Earth.motion.position = [149.598261, 0, 0];
Earth.motion.velocity = [0, 2.929e-5, 0];
//Earth.physical.mass = 
//Earth.motion.position = [57.9091, 0 0];
//Earth.motion.velocity = [0, 
Earth.switches.motionEnabled = true;
Earth.switches.accelerationEnabled = true;

var Sun = PhysicalObject();
Sun.motion.position = [0, 0, 0];

// Gravitational Force Function.
// Given the Earth and the Sun, returns the vector of gravitational force between them, from the first Earth
// to the Sun.
function gravitationalForce (earth, sun) {	
	// Get the direction vector from the first object to the second.
	var directionVector = subtractVector(sun.motion.position, earth.motion.position);
	
	// Get the distance between the Earth and the Sun.
	var distance = vectorLength(directionVector);
	
	// Get the force between the two objects.
	var force = Gmm / Math.pow(distance, 2);
	
	// Scale the direction vector to be the same magnitude as the force.
	directionVector = vectorFitToLength(directionVector, force);
	earth.switches.forceChanged = true;
	return directionVector;
}

// TEMPORARY HACK. ADD IN A WAY TO PROPERLY MOVE OBJECTS TO THE CENTRE OF THE CANVAS.
Sun.motion.position = addVector([400,300,0], Sun.motion.position);
Earth.motion.position = addVector([400, 300, 0], Earth.motion.position);

// TEMPORARY HACK. MOVE THIS TO A SEPARATE, CANVAS-SPECIFIC FILE.
var updateStep = 10;


// Function used to update the canvas.
// Updates the position of the earth, and draws it.
function update () {
	Earth.forceStore.gravity = gravitationalForce(Earth, Sun);
	
	// Update the position of the earth. Use the updateStep specified by the user
	// (default: 1 second is 6 days).
	for (var i = 0; i < updateStep; i++) {
		var movementResult = movementModule(Earth);
	}
	
	// Hack to fix floating point issues. If the Earth's distance from the sun is greater than
	// the furthest theoretical value or less than the nearest, set it to that value.
	var directionVector = subtractVector(Earth.motion.position, Sun.motion.position);
	var distance = vectorLength(directionVector);
	// if(distance > 152.097701) {
	// directionVector = vectorFitToLength(directionVector, 152.097701);
	// Earth.motion.position = addVector([400,300,0], directionVector);
	// } else if(distance < 147.098074) {
	// directionVector = vectorFitToLength(directionVector, 147.098074);
	// Earth.motion.position = addVector([400,300,0], directionVector);
	// }
	
	
	// Display the current distance from the sun.
	var distanceLabel = document.getElementById('distanceLabel');
	if(distanceLabel) {
		distanceLabel.innerHTML = distance;
	}
	
	// Get the canvas element and its context.
	var canvas = document.getElementById('orbitCanvas');
	if(canvas.getContext) {
		var ctx = canvas.getContext('2d');
		
		// Clear the canvas.
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
	// Draw our objects.
	drawPosition(Earth, ctx);
	drawPosition(Sun, ctx);
	}
}

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
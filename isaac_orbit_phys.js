// Module to handle simulation of Earth's orbit using physics.

// Units
// Distance: gigameters
// Mass: gigagrams
var Gmm = 7.93e24 // in Gigagram Gigameters per second squared.
var timeStep = 86400 // in seconds.

var Earth = PhysicalObject();
Earth.physical.mass = 5.9721986e18;
Earth.motion.position = [149.598261, 0, 0];
Earth.motion.velocity = [0, 2.978e-5, 0];
Earth.switches.motionEnabled = true;
Earth.switches.accelerationEnabled = false;

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
	
	return directionVector;
}

for(var i = 0; i < 365; i++) {
	Earth.forceStore.gravity = gravitationalForce(Earth, Sun);
	var movementResult = movementModule(Earth);
	document.writeln(i + ", " + Earth.motion.position[0] + ", " + Earth.motion.position[1] + ", "
		+ Earth.motion.position[2] + ", " + Earth.motion.acceleration[0] + ", " + Earth.motion.acceleration[1] + ", " +
		Earth.motion.acceleration[2]);
}
// Module to handle simulation of Earth's orbit using physics.

// Units
// Distance: gigameters
// Mass: gigagrams
var G = 6.67e-32 // in Newton square Gigameters per Gigagram squared.
var timeStep = 1440 // in seconds.

var config = Config();

// Gravitational Force Function.
// Given two objects, returns the vector of gravitational force between them, from the first object
// to the second.
function gravitationalForce (obj1, obj2) {	
	// Get the direction vector from the first object to the second.
	var directionVector = subtractVector(obj2.motion.position, obj1.motion.position);
	
	// Get the distance between the two objects.
	var distance = vectorLength(directionVector);
	
	// Get Gm1m2.
	var numerator = G * obj1.physical.mass * obj2.physical.mass;
	
	// Modify Gm1m2 according to the relevant multipliers.
	numerator *= config.gravConstMult;
	numerator *= obj1.config.massMult;
	numerator *= obj2.config.massMult;
	
	// Get the force between the two objects.
	var force = numerator / Math.pow(distance, 2);
	
	// Scale the direction vector to be the same magnitude as the force.
	directionVector = vectorFitToLength(directionVector, force);
	obj1.switches.forceChanged = true;
	return directionVector;
}

function Config() {
	return {
		"updateStep" : 1,
		"gravConstMult" : 1,
		"cameraFocus" : 0
	}
}

// Updates the position of the planets.
function update () {
	// Update the position of the planets. Use the updateStep specified by the user
	// (default: 1 second is 1 day).
	for (var i = 0; i < config.updateStep; i++) {
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
		
		movementModule(Earth);
		movementModule(Mars);
		movementModule(Mercury);
		movementModule(Jupiter);
		movementModule(Neptune);
		movementModule(Venus);
		movementModule(Uranus);
		movementModule(Saturn);
	}
}

function updateGravity(planet1, planet2) {
	planet1.forceStore["gravity" + planet2.Name] = gravitationalForce(planet1, planet2);
	planet2.forceStore["gravity" + planet1.Name] = gravitationalForce(planet2, planet1);
}
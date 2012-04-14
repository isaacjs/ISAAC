// Module to handle simulation of Earth's orbit using physics.
var config = Config();

function Config() {
	return {
		"updateStep" : 1,
		"gravConstMult" : 1,
		"cameraFocus" : 0
	};
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
		
		movementModule(Sun);
		movementModule(Earth);
		movementModule(Mars);
		movementModule(Mercury);
		movementModule(Jupiter);
		movementModule(Neptune);
		movementModule(Venus);
		movementModule(Uranus);
		movementModule(Saturn);
		movementModule(Pluto);
	}
}

function updateGravity(planet1, planet2) {
	planet1.forceStore["gravity" + planet2.Name] = gravitationalForce(planet1, planet2);
	planet2.forceStore["gravity" + planet1.Name] = gravitationalForce(planet2, planet1);
}
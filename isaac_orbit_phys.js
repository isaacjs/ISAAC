// Module to handle simulation of Earth's orbit using physics.
var config = Config();

function Config() {
	return {
		"updateStep" : 1,
		"gravConstMult" : 1,
		"cameraFocus" : 0
	};
}

// Given an array of Orbital Bodies, updates their positions.
// This is where n-body calculation occurs.
function update (orbitalBodies) {
	// Update the position of the planets. Use the updateStep specified by the user
	// (default: 1 second is 1 day).
	for (var i = 0; i < config.updateStep; i++) {
		for(var j = 0; j < orbitalBodies.length - 1; j++) {
			for(var k = j + 1; k < orbitalBodies.length; k++) {
				updateGravity(orbitalBodies[j], orbitalBodies[k]);
			}
		}
		for(j = 0; j < orbitalBodies.length; j++) {
			ISAAC.Core.movementModule(orbitalBodies[j]);
		}
	}
}

function updateGravity(planet1, planet2) {
	planet1.forceStore["gravity" + planet2.Name] = ISAAC.Core.gravitationalForce(planet1, planet2);
	planet2.forceStore["gravity" + planet1.Name] = ISAAC.Core.gravitationalForce(planet2, planet1);
}
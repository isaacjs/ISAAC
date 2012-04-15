// Module to handle simulation of Earth's orbit using physics.
ISAAC.Config = ISAAC.Config || {"updateStep" : 1, "gravConstMult" : 1, "cameraFocus" : 0};

// Given an array of Orbital Bodies, updates their positions.
// This is where n-body calculation occurs.
function update (orbitalBodies) {
	// Update the position of the planets. Use the updateStep specified by the user
	// (default: 1 second is 1 day).
	for (var i = 0; i < ISAAC.Config.updateStep; i++) {
		for(var j = 0; j < orbitalBodies.length - 1; j++) {
			for(var k = j + 1; k < orbitalBodies.length; k++) {
				updateGravity(orbitalBodies[j], orbitalBodies[k]);
			}
		}
		for(var l = 0; l < orbitalBodies.length; l++) {
			ISAAC.Core.movementModule(orbitalBodies[l]);
		}
	}
}

function updateGravity(planet1, planet2) {
	planet1.forceStore["gravity" + planet2.name] = ISAAC.Core.gravitationalForce(planet1, planet2);
	planet2.forceStore["gravity" + planet1.name] = ISAAC.Core.gravitationalForce(planet2, planet1);
}
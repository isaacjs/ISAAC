ISAAC.Simulation = ISAAC.Simulation || {};

// Takes in JSON to create the simulation objects.
// How to use this method:
// Create a JSON object containing several JSON objects,
// each of which defines a single orbital body.
// Fields each orbital body can have:
// - name : Optional - the name of this body.
// - isStar: Default false. Whether or not this body is a Star.
// - mass : Default 1. The mass of this body in gigagrams.
// - position : Default [0, 0, 0]. The X, Y, and Z (right-handed, i.e. Z is up, Y is "left") starting coordinates of the body.
// - velocity : Default [0, 0, 0]. The X, Y, and Z (right-handed as above) starting velocities of the body.
// - motionEnabled : Default true. Whether or not this object should move.
// - accelerationEnabled : Default true. Whether or not this object will have acceleration calculated for it.

ISAAC.Simulation.init = function (JSON) {
	ISAAC.Simulation.bodies = [];
	for(var object in JSON) {
		bodies.push(new ISAAC.OrbitalBody(object));
	}
}
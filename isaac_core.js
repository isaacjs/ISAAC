// Move this to a configuration script file.
var timeStep = 1.0; // Time in seconds.
var gravityVector = [0, 0, -9.8]; // Vector for acceleration of gravity within the environment, in metres per second squared.

// Main logic module for ISAAC Physics.

function displayProperties (obj) {
	for(name in obj) {
		console.log("Property: " + name + " Value: " + obj[name]);
		console.log("\n");
	}
}

function velocityModule (obj) {
	if (obj.switches.motionEnabled) {
//		obj.Position.posX += (obj.Position.velX * timeStep);
//		obj.Position.posY += (obj.Position.velY * timeStep);
//		obj.Position.posZ += (obj.Position.velZ * timeStep);
		obj.motion.position = addVector(obj.motion.position, scaleVector(obj.motion.velocity, timeStep));
		return true;
	}
	return false;
}

function accelerationModule (obj) {
	if (obj.switches.accelerationEnabled) {
//		obj.Position.velX += (obj.Position.accelX * timeStep);
//		obj.Position.velY += (obj.Position.accelY * timeStep);
//		obj.Position.velZ += (obj.Position.accelZ * timeStep);
		obj.motion.velocity = addVector(obj.motion.velocity, scaleVector(obj.motion.acceleration, timeStep));
		return true;
	}
	return false;
}

function movementModule (obj) {
	if(obj.switches.motionEnabled) {
		var velocityChanged = velocityModule(obj);
		//var accelerationChanged = accelerationModule(obj);
		if (velocityChanged || accelerationChanged) {
			return true;
		}
	}
	return false;
}

// Gravity Module.
// Adjusts the acceleration vector of the object to reflect the force of gravity.
// For the object to be affected by gravity, both gravityEnabled and accelerationEnabled must be true.
function gravityModule (obj) {
	if(obj.switches.gravityEnabled) {
		
		if(
		obj.motion.acceleration = addVector(obj.motion.acceleration, scaleVector(gravityVector, timeStep));
		return true;
	}
	return false;
}

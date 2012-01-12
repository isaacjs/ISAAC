// Move this to a configuration script file.
var timeStep = 1.0; // Time in seconds.

// Main logic module for ISAAC Physics.

function displayProperties (object) {
	for(name in object) {
		console.log("Property: " + name + " Value: " + object[name]);
		console.log("\n");
	}
}

function velocityModule (object) {
	if (object.switches.motion_enabled) {
//		object.Position.posX += (object.Position.velX * timeStep);
//		object.Position.posY += (object.Position.velY * timeStep);
//		object.Position.posZ += (object.Position.velZ * timeStep);
		object.motion.position = addVector(object.motion.position, scaleVector(object.motion.velocity, timeStep));
		return true;
	}
	return false;
}

function accelerationModule (object) {
	if (object.switches.acceleration_enabled) {
//		object.Position.velX += (object.Position.accelX * timeStep);
//		object.Position.velY += (object.Position.accelY * timeStep);
//		object.Position.velZ += (object.Position.accelZ * timeStep);
		object.motion.velocity = addVector(object.motion.velocity, scaleVector(object.motion.acceleration, timeStep));
		return true;
	}
	return false;
}

function movementModule (object) {
	if(object.switches.motion_enabled) {
		var velocityChanged = velocityModule(object);
		//var accelerationChanged = accelerationModule(object);
		if (velocityChanged || accelerationChanged) {
			return true;
		}
	}
	return false;
}

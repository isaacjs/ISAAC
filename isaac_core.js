// Move this to a configuration script file.
var timeStep = 1.0; // Time in seconds.
var gravityVector = [0, 0, -9.8]; // Vector for force of gravity within the environment, in Newtons per kilogram.

// Main logic module for ISAAC Physics.

function displayProperties (obj) {
	for(name in obj) {
		console.log("Property: " + name + " Value: " + obj[name]);
	}
	console.log("\n");
}

// Movement Module.
// Calls all other modules to modify an object's properties with regard to motion.
function movementModule (obj) {
	if(obj.switches.motionEnabled) {
		var gravityChanged = gravityModule(obj);
		var forceChanged = forceModule(obj);
		var accelerationChanged = accelerationModule(obj);
		var velocityChanged = velocityModule(obj);
		if (velocityChanged || accelerationChanged || gravityChanged || forceChanged) {
			return true;
		}
	}
	return false;
}

// Velocity Module.
// Adjusts the position of the object, based on the velocity vector.
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

// Acceleration Module.
// Adjusts the velocity of the object, based on the acceleration vector.
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

// Gravity Module.
// Adjusts the acceleration vector of the object to reflect the force of gravity.
// For the object to be affected by gravity, both gravityEnabled and accelerationEnabled must be true.
function gravityModule (obj) {
	if(obj.switches.gravityEnabled) {
		obj.forces.resultant = addVector(obj.forces.external, gravityVector);
		return true;
	}
	return false;
}

// Force Module.
// Calculates the acceleration of an object based on the resultant forces on it.
function forceModule (obj) {
	if (obj.switches.motionEnabled) {
		for(var i = 0; i < obj.forces.resultant.length; i++) {
			obj.motion.acceleration[i] = obj.forces.resultant[i] / obj.physical.mass;
		}
		return true;
	}
	return false;
}

// Main logic module for ISAAC.

var ISAAC = ISAAC || { version: "0.1" };
ISAAC.Constants = ISAAC.Constants || {};
ISAAC.Core = ISAAC.Core || {};

// Units
// Distance: gigameters
// Mass: gigagrams
ISAAC.Constants.G = 6.67e-32; // in Newton square gigameters per gigagram squared.
ISAAC.Constants.timeStep = 1440; // in seconds.

ISAAC.displayProperties = function (obj) {
	for(var name in obj) {
		console.log("Property: " + name + " Value: " + obj[name]);
	}
	console.log("\n");
}

// Movement Module.
// Calls all other modules to modify an object's properties with regard to motion.
ISAAC.Core.movementModule = function (obj) {
	if(obj.switches.motionEnabled) {
		var forceChanged = ISAAC.Core.forceModule(obj);
		var accelerationChanged = ISAAC.Core.accelerationModule(obj);
		var velocityChanged = ISAAC.Core.velocityModule(obj);
		if (velocityChanged || accelerationChanged || forceChanged) {
			return true;
		}
	}
	return false;
}

// Velocity Module.
// Adjusts the position of the object, based on the velocity vector.
ISAAC.Core.velocityModule = function (obj) {
	if (obj.switches.motionEnabled) {
		obj.motion.position = ISAAC.Math.addVector(obj.motion.position, ISAAC.Math.scaleVector(obj.motion.velocity, ISAAC.Constants.timeStep));
		return true;
	}
	return false;
}

// Acceleration Module.
// Adjusts the velocity of the object, based on the acceleration vector.
ISAAC.Core.accelerationModule = function (obj) {
	if (obj.switches.accelerationEnabled) {
		//		obj.Position.velX += (obj.Position.accelX * ISAAC.Constants.timeStep);
		//		obj.Position.velY += (obj.Position.accelY * ISAAC.Constants.timeStep);
		//		obj.Position.velZ += (obj.Position.accelZ * ISAAC.Constants.timeStep);
		obj.motion.velocity = ISAAC.Math.addVector(obj.motion.velocity, ISAAC.Math.scaleVector(obj.motion.acceleration, ISAAC.Constants.timeStep));
		return true;
	}
	return false;
}

// Force Module.
// Calculates the acceleration of an object based on the resultant forces on it.
ISAAC.Core.forceModule = function(obj) {
	if (obj.switches.motionEnabled && obj.switches.forceChanged) {
		// Create a blank array for the resultant force.
		var newResultant = [0, 0, 0];
		
		// Iterate through the forces acting on the object and add them
		// to the resultant force.
		for(var force in obj.forceStore) {
			for(var i = 0; i < 3; i++) {
				newResultant[i] += obj.forceStore[force][i];
			}
		}
		
		// Set the resultant force.
		obj.resultantForce = newResultant;
		
		// Adjust the object's acceleration based on the resultant force.
		for(var i = 0; i < 3; i++) {
			obj.motion.acceleration[i] = obj.resultantForce[i] / obj.physical.mass;
		}
		
		// Reset the forceChanged switch.
		obj.switches.forceChanged = false;
		return true;
	}
	return false;
}

// Contact function.
// Given two objects, determines whether or not they are in contact.
// IMPORTANT: This is not fully implemented, and is not currently used.
ISAAC.Core.contactBetween = function (obj1, obj2) {
	var distance = ISAAC.Math.vectorLength(ISAAC.Math.subtractVector(obj1.motion.position, obj2.motion.position));
	
	var radiiSum = obj1.physical.maxRadius + obj2.physical.maxRadius;
	
	
	// PS (Thu 19 Jan 2012 08:19:49 PM SGT) I feel this may be a better approach
	// var dSquare = sqrNormVector(distance);
	// var rSumSquare = sqr(radiiSum);
	// if (dSquare > rSumSquare) {
	
	if (distance > radiiSum) {
		return false;
	}
	if (obj1.physical.shape + obj2.physical.shape === 2) { // Both are spheres
		return true; // If the sum of radii is <= distance between spheres, they are in contact
	} 
	if (obj1.physical.shape + obj2.physical.shape === 8) { // Both are cuboids
		for (var i = 0; i < 6; i++) {
			if(obj2.physical.containsPoint(obj1.physical.corners[i]) ||
			obj1.physical.containsPoint(obj2.physical.corners[i])) {
				return true;
			}
		}
		return false;
	}
}

// Gravitational Force Function.
// Given two objects, returns the vector of gravitational force between them, from the first object
// to the second.
ISAAC.Core.gravitationalForce = function (obj1, obj2) {	
	// Get the direction vector from the first object to the second.
	var directionVector = ISAAC.Math.subtractVector(obj2.motion.position, obj1.motion.position);
	
	// Get the distance between the two objects.
	var distance = ISAAC.Math.vectorLength(directionVector);

	// Get Gm1m2 and modify it according to the relevant multipliers.
	var numerator = ISAAC.Constants.G * ISAAC.Config.gravConstMult * obj1.physical.mass * obj1.config.massMult * obj2.physical.mass * obj2.config.massMult;
	
	// Get the force between the two objects.
	var force = numerator / ISAAC.Math.sqr(distance);
	
	// Scale the direction vector to be the same magnitude as the force.
	directionVector = ISAAC.Math.vectorFitToLength(directionVector, force);
	obj1.switches.forceChanged = true;
	return directionVector;
}
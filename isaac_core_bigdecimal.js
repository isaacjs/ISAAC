// Move this to a configuration script file.
//var timeStep = 1.0; // Time in seconds.
//var gravityForce = Force("Gravity", [0, 0, -9.8]); // Force of gravity within the environment, in Newtons per Kilogram.
//var bigG = 6.674e-11; // The Gravitational Constant.

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
		gravityForce.act(obj);
	}
	return true;
}
// Force Module.
// Calculates the acceleration of an object based on the resultant forces on it.
function forceModule (obj) {
	if (obj.switches.motionEnabled && obj.switches.forceChanged) {
		// Create a blank array for the resultant force.
		var newResultant = [new BigDecimal(0), new BigDecimal(0), new BigDecimal(0)];
		
		// Iterate through the forces acting on the object and add them
		// to the resultant force.
		for(force in obj.forceStore) {
			for(var i = 0; i < 3; i++) {
				newResultant[i].add(obj.forceStore[force][i]);
			}
		}
		
		// Set the resultant force.
		obj.resultantForce = newResultant;
		
		// Adjust the object's acceleration based on the resultant force.
		for(var i = 0; i < 3; i++) {
			obj.motion.acceleration[i] = obj.resultantForce[i].divide(new BigDecimal(obj.physical.mass));
		}
		
		// Reset the forceChanged switch.
		obj.switches.forceChanged = false;
		return true;
	}
	return false;
}

// Contact function
// Given two objects, determines whether or not they are in contact
function contactBetween (obj1, obj2) {
	var distance = vectorLength(subtractVector(obj1.motion.position, obj2.motion.position));
	
	var radiiSum = obj1.physical.maxRadius + obj2.physical.maxRadius;
	
	
	// PS (Thu 19 Jan 2012 08:19:49 PM SGT) I feel this may be a better approach
	// var dSquare = sqrNormVector(distance);
	// var rSumSquare = sqr(radiiSum);
	// if (dSquare > rSumSquare) {
	
	if (distance > radiisum) {
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

// Gravitational Attraction Function.
// Given two objects, calculate and return the magnitude of the force of gravitational attraction between them.
function gravitationalAttraction (obj1, obj2) {
	var distance = vectorLength(subtractVector(obj1.motion.position, obj2.motion.position));
	
	// Find r^2.
	
	// PS (Thu 19 Jan 2012 08:24:11 PM SGT) - See if the sqrNormVector approach is faster
	
	var rSquared = distance.pow(new BigDecimal(2));
	
	// Get the masses of the two objects.
	var mass1 = obj1.physical.mass;
	var mass2 = obj2.physical.mass;
	
	// Return the force between them.
	return new BigDecimal(bigG.multiply(((mass1.multiply(mass2)).divide(rSquared))));
}

// Gravitational Force Function.
// Given two objects, returns the vector of gravitational force between them, from the first object
// to the second.
function gravitationalForce (obj1, obj2) {
	// Get the force between the two objects.
	var force = gravitationalAttraction(obj1, obj2);
	
	// Get the direction vector from the first object to the second.
	var directionVector = subtractVector(obj1, obj2);
	
	// Scale the direction vector to be the same magnitude as the force.
	directionVector = vectorFitToLength(directionVector, force);
	
	return directionVector;
}
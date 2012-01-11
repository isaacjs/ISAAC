// Move this to a configuration script file.
var timeStep = 1.0; // Time in seconds.

function displayProperties (object) {
	for(name in object) {
		Console.log("Property: " + name + " Value: " + object[name]);
		Console.log("\n");
	}
}

function velocityModule (object) {
	if (object.Switches.motion_enabled) {
		object.Position.posX += (object.Position.velX * timeStep);
		object.Position.posY += (object.Position.velY * timeStep);
		object.Position.posZ += (object.Position.velZ * timeStep);
		return true;
	}
	return false;
}

function accelerationModule (object) {
	if (object.Switches.motion_enabled) {
		object.Position.velX += (object.Position.accelX * timeStep);
		object.Position.velY += (object.Position.accelY * timeStep);
		object.Position.velZ += (object.Position.accelZ * timeStep);
		return true;
	}
	return false;
}

function movementModule (object) {
	if(object.Switches.motion_enabled) {
		var velocityChanged = velocityModule(object);
		//var accelerationChanged = accelerationModule(object);
		if (velocityChanged || accelerationChanged) {
			return true;
		}
	}
	return false;
}
ISAAC.Force = function (name, vector) {
	this.name = name;
	this.act = function (obj) {
		if (typeof obj.forceStore[name] !== 'object') {
			obj.forceStore[name] = vector;
			obj.switches.forceChanged = true;
		}
	};
	this.stop = function (obj) {
		if (typeof obj.forceStore[name] === 'object') {
			delete obj.forceStore[name];
			obj.switches.forceChanged = true;
		}
	}
};


ISAAC.OrbitalBody = function (parameters) {
	parameters = parameters || {};
	this.physical = {};
	this.motion = {};
	this.switches = {};
	this.config = {};

	// Name of the object.
	this.Name = parameters.name !== undefined ? parameters.name : "";

	// Is this object a Star?
	this.isStar = parameters.isStar !== undefined ? parameters.isStar : false;

	// Mass of the object, in gigagrams.
	this.physical.mass = parameters.mass !== undefined ? parameters.mass : 1;

	// Radius of the object, in kilometres.
	this.physical.radius = parameters.radius !== undefined ? parameters.radius : 1000;
	
	this.forceStore = {
		// External forces on the object will be kept here.
	};
	
	// The resultant force on the object. Calculated at runtime.
	this.resultantForce = [0, 0, 0];
	
	this.motion.position = parameters.position !== undefined ? [parameters.position[1], parameters.position[0], parameters.position[2]] : [0, 0, 0];
	this.motion.velocity = parameters.velocity !== undefined ? [parameters.velocity[1], parameters.velocity[0], parameters.velocity[2]] : [0, 0, 0];
		
	// The acceleration vector of the object, including gravity (if enabled). Calculated at runtime.
	this.motion.acceleration = [0, 0, 0];

	this.switches.motionEnabled = parameters.motionEnabled !== undefined ? parameters.motionEnabled : true;
	this.switches.accelerationEnabled = parameters.accelerationEnabled !== undefined ? parameters.accelerationEnabled : true;
	this.switches.forceChanged = false;

	this.config.massMult = 1;
};

// These objects are currently unused, and have not been tested.

ISAAC.Sphere = function () {
	var thing = PhysicalObject();
	// thing.physical.shape = 1; // Already default
	
	// implement containsPoint function here
	
	// PS Mon 30 Jan 2012 04:44:34 PM SGT - Should we hide maxRadius,
	// and create a new variable "radius", that applies only to spheres?
	// Remove if found unnecessary
	thing.physical.radius = 1;
	thing.physical.maxradius = 1;//needs an "auto-update" feature,
	//so that maxRadius changes appropriately when radius is modified.
	
	return thing;
};

ISAAC.Cuboid = function () {
	var thing = PhysicalObject();
	thing.physical.shape = 4;
	thing.physical.corners = [[0, 0, 0], [0, 0, 0],
				[0, 0, 0], [0, 0, 0],
				[0, 0, 0], [0, 0, 0]];
	// implement containsPoint function here
	return thing;
};

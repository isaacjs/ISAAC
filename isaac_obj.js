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


ISAAC.PhysicalObject = function () {
	// Physical properties relating to the object.
	this.physical = {
		"mass" : 1, // Mass of the object, in kilograms.
		"maxRadius" : 0, //Maximum distance between any point and the centre
		"shape" : 1 // 1 is a sphere, 4 is a cuboid
	};
	
	this.forceStore = {
		// External forces on the object will be kept here.
	};
	
	// The resultant force on the object. Calculated at runtime.
	this.resultantForce = [0, 0, 0];
	
	this.motion = {
		"position" : [0, 0, 0],
		"velocity" : [0, 0, 0],
		
		// The acceleration vector of the object, including gravity (if enabled).
		"acceleration": [0, 0, 0]
	};
	this.switches =  {
		"inContact" : false,
		"motionEnabled" : false,
		"accelerationEnabled" : false,
		"gravityEnabled" : false,
		"frictionEnabled" : this.inContact,
		"forceChanged" : false
	};
	this.config = {
		"massMult" : 1
	};
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

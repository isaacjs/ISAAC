if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
};

function PhysicalObject () {
	return {
		// Physical properties relating to the object.
		"physical" : {
			"mass" : 1 // Mass of the object, in kilograms.
		},
		"forces" : {
			// External forces on the object, excluding gravity.
			"external" : [0, 0, 0],
			
			// The resultant force on the object. Calculated at runtime.
			"resultant" : [0, 0, 0],
		},
		"motion": {
			"position" : [0, 0, 0], //Will vector be created as a new object that contains an array? or will it simply be an array, and the only new stuff will be vector manipulation methods that use arrays?
			"velocity" : [0, 0, 0],
			
			// The acceleration vector of the object, including gravity (if enabled).
			"acceleration": [0, 0, 0]
			
			
			// J (12/01/12): Vectors right now are arrays, unless we want them to be otherwise.
		},
		"switches": {
			"inContact" : false,
			"motionEnabled" : false,
			"accelerationEnabled" : false,
			"gravityEnabled" : false,
			"frictionEnabled" : this.inContact //Correct syntax? Logically correct?
			//in_contact and friction_enabled have been linked because MOST PROBABLY the (presence of friction)
			//and (contact with another body) are equivalent, but it MAY NOT BE THE CASE
			
			// J: this.in_contact looks OK. My interpretation of the code is that the current scope is the "switches"
			// object, so "this" should refer to it. Needs testing to be sure, though.
		}
	};
};


/////////////////////////
//TEST OBJECTS
/////////////////////////

var MovableBall = PhysicalObject();
MovableBall.motion.position = [0, 0, 0];
MovableBall.forces.external = [0, 0, 20];
MovableBall.switches.motionEnabled = true;
MovableBall.switches.accelerationEnabled = true;
MovableBall.switches.gravityEnabled = true;

var FixedBall = PhysicalObject();
FixedBall.motion.velocity = [100, 2, 3];
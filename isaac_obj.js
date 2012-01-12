if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
};

var physicalObject = {
	"motion": {
		"position": [0,0,0], //Will vector be created as a new object that contains an array? or will it simply be an array, and the only new stuff will be vector manipulation methods that use arrays?
		"velocity": [0,0,0],
		"acceleration": [0,0,0]
	},
	"switches": {
		"in_contact": false;
		"motion_enabled": false,
		"acceleration_enabled": false,
		"friction_enabled": this.in_contact //Correct syntax? Logically correct?
		//in_contact and friction_enabled have been linked because MOST PROBABLY the (presence of friction)
		//and (contact with another body) are equivalent, but it MAY NOT BE THE CASE
	}
};



/////////////////////////
//TEST OBJECTS
/////////////////////////

var MovableBall = Object.create(PhysicalObject);
MovableBall.motion.position = [1,2,3];
MovableBall.motion.acceleration = [1,2,3];
MovableBall.switches.motion_enabled = true;
MovableBall.switches.acceleration_enabled = true;

var FixedBall = Object.create(PhysicalObject);
FixedBall.motion.velocity = [100,2,3];

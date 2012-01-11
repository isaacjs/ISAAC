if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
};

var PhysicalObject = {
	Position: {
		posX: 0,
		posY: 0,
		posZ: 0,
		velX: 0,
		velY: 0,
		velZ: 0,
		accX: 0,
		accY: 0,
		accZ: 0
	},
	Switches: {
		motion_enabled: false
	}
};

var MovableBall = Object.create(PhysicalObject);
MovableBall.Position.velX = 1;
MovableBall.Position.velY = 2;
MovableBall.Position.velZ = 3;
MovableBall.Position.motion_enabled = true;

var FixedBall = Object.create(PhysicalObject);
FixedBall.Position.velX = 100;
FixedBall.Position.velY = 2;
FixedBall.Position.velZ = 3;

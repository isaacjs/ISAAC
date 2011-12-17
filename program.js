// O3D Initialisation
o3djs.base.o3d = o3d;
o3djs.require('o3djs.webgl');
o3djs.require('o3djs.math');
o3djs.require('o3djs.rendergraph');

// From JavaScript: The Good Parts - provide a way to
// create new instances of a particular "blueprint" object.
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}

// Blueprint for all objects within the physics system.
// All objects have a name, and whether or not physics
// calculations will be performed on them.
var NamedObject = {
	"objectName" : "A Named Object",
	"physicsEnabled" : false
};

// Blueprint for moveable objects. These are physics-enabled, and have
// mass and volume.
var MoveableObject = Object.create(NamedObject);
MoveableObject.objectName = "A Moveable Object";
MoveableObject.physicsEnabled = true;
MoveableObject.mass = 10;
MoveableObject.volume = 10;

// Blueprint for the physics environment. This is the "world" our physics
// simulation takes place in, and has the value of gravity's acceleration (m/s).
// Default values for this object are those of the planet Earth.
var PhysicsEnvironment = Object.create(NamedObject);
PhysicsEnvironment.objectName = "A Physics Environment";
PhysicsEnvironment.gravityAccel = 9.81;

// Blueprint for a surface. Has static and kinetic coefficients of friction.
// Default values for this object are those of glass against glass (taken from
// http://www.roymech.co.uk/Useful_Tables/Tribology/co_of_frict.htm)
var Surface = Object.create(NamedObject);
Surface.objectName = "A Surface";
Surface.staticCoef = 0.9;
Surface.kineticCoef = 0.4;
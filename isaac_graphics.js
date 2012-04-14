ISAAC.Graphics = ISAAC.Graphics || {};

ISAAC.Graphics.objUpdate = function (object, model) {
	model.position.x = object.motion.position[0];
	model.position.y = object.motion.position[2];
	model.position.z = object.motion.position[1];
}
// Gravity module.
// This takes in a MoveableObject and the PhysicsEnvironment it is
// contained in, calculates the new position of the MoveableObject, and
// mutates the MoveableObject to relocate it.

// Inputs: MoveableObject, PhysicsEnvironment
// Returns: New position of the MoveableObject, as a 3D Vector
function GravityModule (mObj, physEnv) {
	var newZVelocity = mObj.zVelocity - (physEnv.timestep * physEnv.gravityAcceleration);
	
}
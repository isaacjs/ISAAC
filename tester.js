// displayProperties(MovableBall.motion);
// var movementResult1 = movementModule(MovableBall);
// displayProperties(MovableBall.motion);
// console.log(movementResult1);
// console.log("\n");


// displayProperties(FixedBall.motion);
// displayProperties(FixedBall.switches);
// var movementResult2 = movementModule(FixedBall);
// displayProperties(FixedBall.motion);
// console.log(movementResult2);
// console.log("\n");

/////////////////////////
//TEST OBJECTS
/////////////////////////

var MoveableBall = PhysicalObject();
MoveableBall.motion.position = [0, 0, 0];
MoveableBall.switches.motionEnabled = true;
MoveableBall.switches.accelerationEnabled = true;
MoveableBall.switches.gravityEnabled = true;

var FixedBall = PhysicalObject();
FixedBall.motion.velocity = [100, 2, 3];

var externalForce1 = Force("External Thrust", [0, 0, 20]);
externalForce1.act(MoveableBall);


displayProperties(MoveableBall.motion);

for(var i = 0; i < 100; i++){
	if(i === 25) {
		externalForce1.stop(MoveableBall);
	}
	var movementResult = movementModule(MoveableBall);
	//displayProperties(MoveableBall.motion);
	//console.log(MoveableBall.resultantForce);
	document.writeln(i + ", " + MoveableBall.motion.position[0] + ", " + MoveableBall.motion.position[1] + ", "
		+ MoveableBall.motion.position[2]);
}
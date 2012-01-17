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

displayProperties(MovableBall.motion);
for(var i = 0; i < 10; i++){
	if(i === 5) {
		MovableBall.forces.external = [0, 0, 0];
	}
	var movementResult = movementModule(MovableBall);
	displayProperties(MovableBall.motion);
	console.log(MovableBall.forces.resultant);
}
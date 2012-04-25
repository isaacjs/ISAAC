importScripts('isaac_core.js', 'isaac_math.js', 'isaac_obj.js', 'isaac_queue.js');

self.addEventListener('message', function(e) {
	var data = e.data;
	switch(data.command) {
		case 'get' :
			var front = posQueue.dequeue();
			self.postMessage({ 'response' : front, 'queueLength' : posQueue.contents.length });
		break;
		case 'set' :
			gcm = e.data['gravConstMult'];
			updateStep = e.data['updateStep'];
			bodies = e.data['bodyArray'];
		break;
		case 'pause' :
			clearInterval(interval);
		break;
		case 'resume' :
			interval = setInterval(function() {
				timeLoop();
			}, time);
		break;
		case 'terminate' :
			clearInterval(interval);
			close();
		break;
	}
});

// We don't store a buffer of frames - just the latest one.
// This means that when the program frame rate lowers, we end up
// dropping frames to keep the simulation rate the same.

// Frame rate should always be less than or equal to update rate.
var posQueue = new ISAAC.Queue(1);
var bodies;
var count = 0;
var time = 50/3;
var gcm = 1;
var updateStep = 1;

function timeLoop() {
	update(bodies);
	posQueue.enqueue(bodies);
}


var interval = setInterval(function() {
	timeLoop();
}, time);

// Given an array of Orbital Bodies, updates their positions.
// This is where n-body calculation occurs.
function update (orbitalBodies) {
	// Update the position of the planets. Use the updateStep specified by the user
	// (default: 1 second is 1 day).
	for (var i = 0; i < updateStep; i++) {
		for(var j = 0; j < orbitalBodies.length - 1; j++) {
			for(var k = j + 1; k < orbitalBodies.length; k++) {
				updateGravity(orbitalBodies[j], orbitalBodies[k]);
			}
		}
		for(var l = 0; l < orbitalBodies.length; l++) {
			ISAAC.Core.movementModule(orbitalBodies[l]);
		}
	}
}

function updateGravity(planet1, planet2) {
	planet1.forceStore["gravity" + planet2.name] = ISAAC.Core.gravitationalForce(planet1, planet2, gcm);
	planet2.forceStore["gravity" + planet1.name] = ISAAC.Core.gravitationalForce(planet2, planet1, gcm);
}
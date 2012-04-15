importScripts('isaac_core.js', 'isaac_math.js', 'isaac_obj.js', 'isaac_orbit_phys.js', 'isaac_queue.js');

self.addEventListener('message', function(e) {
	var data = e.data;
	switch(data.command) {
		case 'get' :
			var front = posQueue.dequeue();
			self.postMessage({ 'response' : front, 'queueLength' : posQueue.contents.length });
		break;
		case 'set' :
			ISAAC.Config = e.data['config'];
			bodyArray = e.data['bodyArray'];
		break;
		case 'pause' :
			clearInterval(interval);
		break;
		case 'resume' :
			interval = setInterval(function() {
				timeLoop();
			}, time);
		break;
	}
});

// We don't store a buffer of frames - just the latest one.
// This means that when the program frame rate lowers, we end up
// dropping frames to keep the simulation rate the same.

// Frame rate should always be less than or equal to update rate.
var posQueue = Queue(1);
var bodyArray;
var count = 0;
var time = 50/3;
function timeLoop() {
	update(bodyArray);
	posQueue.enqueue(bodyArray);
}


var interval = setInterval(function() {
	timeLoop();
}, time);
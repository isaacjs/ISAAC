importScripts('isaac_math.js', 'isaac_obj.js', 'isaac_core.js', 'isaac_planets.js', 'isaac_orbit_phys.js', 'isaac_queue.js');

self.addEventListener('message', function(e) {
	var data = e.data;
	switch(data.command) {
		case 'get' :
			var front = posQueue.dequeue();
			self.postMessage({ 'response' : front, 'queueLength' : posQueue.contents.length });
			break;
		case 'set' :
			config = e.data['config'];
			Earth.config = e.data['earthConfig'];
			Mars.config = e.data['marsConfig'];
			Sun.config = e.data['sunConfig'];
			Mars.config = e.data['marsConfig'];
			Jupiter.config = e.data['jupiterConfig'];
			Venus.config = e.data['venusConfig'];
			Mercury.config = e.data['mercuryConfig'];
			Uranus.config = e.data['uranusConfig'];
			Pluto.config = e.data['plutoConfig'];
			Saturn.config = e.data['saturnConfig'];
			break;
	}
});

// We don't store a buffer of frames - just the latest one.
// This means that when the program frame rate lowers, we end up
// dropping frames to keep the simulation rate the same.

// Frame rate should always be less than or equal to update rate.
var posQueue = Queue(1);
var config = Config();
var count = 0;
var timer;

function timeLoop() {
	update();
	posQueue.enqueue({
		'earthPos' : Earth.motion.position,
		'sunPos' : Sun.motion.position,
		'marsPos' : Mars.motion.position,
		'saturnPos' : Saturn.motion.position,
		'jupiterPos' : Jupiter.motion.position,
		'plutoPos' : Pluto.motion.position,
		'uranusPos' : Uranus.motion.position,
		'neptunePos' : Neptune.motion.position,
		'mercuryPos' : Mercury.motion.position,
		'venusPos' : Venus.motion.position
	});
	
	// Update positions 60 times a second.
	//timer = setTimeout(timeLoop, 50/3);
}

setInterval(function(){
	timeLoop();
}, 100/3);
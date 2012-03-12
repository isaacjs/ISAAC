importScripts('isaac_math.js', 'isaac_obj.js', 'isaac_core.js', 'isaac_planets.js', 'isaac_orbit_phys.js', 'isaac_queue');

self.addEventListener('message', function(e) {
	var command = e.data['command'];
	switch(command) {
		case "get" :
			self.postMessage(posQueue.dequeue());
			break;
		case "set" :
			clearTimeout(timer);
			config = e.data['config'];
			timeLoop();
			break;
	}
});

var posQueue = Queue(60);
var config = Config();
var timer;

function timeLoop() {
	update();
	timer = setTimeout(timeLoop(), 1/60);
}

timeLoop();
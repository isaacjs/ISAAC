importScripts('isaac_math.js', 'isaac_obj.js', 'isaac_core.js', 'isaac_planets.js', 'isaac_orbit_phys.js', 'isaac_queue.js');

self.addEventListener('message', function(e) {
	var data = e.data;
	switch(data.command) {
		case 'get' :
			var front = posQueue.dequeue();
			self.postMessage({ 'response' : front, 'queueLength' : posQueue.contents.length });
			break;
		case 'set' :
			clearTimeout(timer);
			config = e.data['config'];
			timeLoop();
			break;
	}
});

var posQueue = Queue(60);
var config = Config();
var count = 0;
var timer;

function timeLoop() {
	posQueue.enqueue(count);
	count++;
	timer = setTimeout(timeLoop, 50/3);
}

timeLoop();
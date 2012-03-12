importScripts('isaac_math.js', 'isaac_obj.js', 'isaac_core.js', 'isaac_planets.js', 'isaac_orbit_phys.js');

self.addEventListener('message', function(e) {

});

function timeLoop() {
	update();
	setTimeout(timeLoop(), 1/60);
}

timeLoop();
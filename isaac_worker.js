importScripts('isaac_math.js', 'isaac_orbit_phys.js');

self.addEventListener('message', function(e) {
	var data = e.data;
	var planet1 = data.planet1;
	var planet2 = data.planet2;
	
	self.postMessage(gravitationalForce(planet1, planet2));
}, false);
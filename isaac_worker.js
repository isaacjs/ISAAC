importScripts('isaac_math.js', 'isaac_obj.js', 'isaac_core.js', 'isaac_planets.js', 'isaac_orbit_phys.js');

self.addEventListener('message', function(e) {
	var data = e.data;
	self.postMessage({ 
		'Earth' : Earth, 
		'Mars' : Mars, 
		'Mercury' : Mercury, 
		'Venus' : Venus,
		'Neptune' : Neptune,
		'Uranus' : Uranus,
		'Sun' : Sun,
		'Pluto' : Pluto,
		'Jupiter' : Jupiter, 
		'Saturn' : Saturn
	});
	
	Earth.config = data['Earth'].config;
	Mars.config = data['Mars'].config;
	Mercury.config = data['Mercury'].config;
	Venus.config = data['Venus'].config;
	Neptune.config = data['Neptune'].config;
	Uranus.config = data['Uranus'].config;
	Sun.config = data['Sun'].config;
	Pluto.config = data['Pluto'].config;
	Jupiter.config = data['Jupiter'].config;
	Saturn.config = data['Saturn'].config;
	
	config = data['Config'];
});

function timeLoop() {
	update();
	setTimeout(timeLoop(), 1/60);
}

timeLoop();
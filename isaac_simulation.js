ISAAC.Simulation = ISAAC.Simulation || {};

// Takes in JSON to create the simulation objects.
// How to use this method:
// Create a JSON object with two objects within it.
// The first should be keyed "config", with the second keyed "bodies".
// bodies contains several JSON objects, each of which defining a single orbital body.

// config:
// - graphicsEnabled : REQUIRED. Set to false to use only the core simulation layer, true for graphics support.
// - scaling : Determines the equation used to scale planets. Has several values, detailed below.
// --- "default" : Take the base-10 logarithm of radius, square it, then divide by 2. Produces a decent-looking model, but isn't accurate.
// --- "linear" : Each body appears 50 times larger than it is in real life. Relative sizes are accurate, but apparent distances are not.
// --- "realistic" : Each body is the same size it is in real life. Sizes and distances are accurate.

// bodies:
// Note that the key of each JSON body within the bodies object should be unique and distinct.
// Fields each orbital body can have:
// - texture : String pointing to the texture to be used for this body. If left blank, a random colour will be chosen.
// - name : Optional - the name of this body.
// - isStar: Default false. Whether or not this body is a Star.
// - mass : Default 1. The mass of this body in gigagrams.
// - radius : Default 1000. The radius of this body, in kilometres.
// - position : Default [0, 0, 0]. The X, Y, and Z (right-handed, i.e. Z is up, Y is "left") starting coordinates of the body.
// - velocity : Default [0, 0, 0]. The X, Y, and Z (right-handed as above) starting velocities of the body.
// - motionEnabled : Default true. Whether or not this object should move.
// - accelerationEnabled : Default true. Whether or not this object will have acceleration calculated for it.

ISAAC.Simulation.init = function (JSON) {
	ISAAC.Graphics.enabled = JSON.config.graphicsEnabled;

	// Reset the system.
	ISAAC.Simulation.reset();

	// Store the JSON.
	ISAAC.Simulation.specifications = JSON;

	// Create the Orbital Body objects.
	ISAAC.Simulation.bodies = [];
	for(var key in JSON.bodies) {
		var curr = new ISAAC.OrbitalBody(JSON.bodies[key]);
		ISAAC.Simulation.bodies.push(curr);

		// Handle graphics, if applicable.
		if(JSON.config.graphicsEnabled) {
			ISAAC.Graphics.createModel(curr, JSON.config.scaling);
		}
	}

	// Setup graphics, if applicable.
	if(JSON.config.graphicsEnabled) {
		ISAAC.Graphics.init();
	}

	// Setup the Web Worker.
	ISAAC.Simulation.worker = new Worker('isaac_worker.js');
	ISAAC.Simulation.worker.postMessage({'command' : 'set', 'updateStep' : ISAAC.Config.updateStep, 'gravConstMult' : ISAAC.Config.gravConstMult, 'bodyArray' : ISAAC.Simulation.bodies});

	// Define what to do when we receive a message from the worker.
	ISAAC.Simulation.worker.addEventListener('message', function (e) {
		var data = e.data.response;
		if(typeof data !== 'undefined') {
			for(var i = 0; i < data.length; i++) {
				var currBody = ISAAC.Simulation.bodies[i];
				
				// Update our simulation state.
				// We don't just copy the data array to avoid
				// overwriting each object's config.
				currBody.motion.position = data[i].motion.position;
				currBody.motion.velocity = data[i].motion.velocity;
				currBody.motion.acceleration = data[i].motion.acceleration;
			}
		}
	}, false);
}

ISAAC.Simulation.reset = function() {
	// Halt the worker.
	if(ISAAC.Simulation.worker) {
		ISAAC.Simulation.worker.terminate();
	}

	// Remove any existing UI elements.
	if(ISAAC.Graphics.guiDOMElement) {
		ISAAC.Graphics.guiDOMElement.parentNode.removeChild(ISAAC.Graphics.guiDOMElement);
	}

	// Reset graphics, if needed.
	if(ISAAC.Graphics.enabled) {
		ISAAC.Graphics.reset();
	}
}

ISAAC.Simulation.restart = function() {
	// Only execute if we already have a set of specifications.
	if(ISAAC.Simulation.specifications) {
		ISAAC.Config = new ISAAC.Defaults.Config();
		ISAAC.Simulation.init(ISAAC.Simulation.specifications);
	}
}

// Change the JSON in this function to simulate a different star system.

// Planet positions and velocities taken from JPL's HORIZONS system,
// for April 09, 2012, 00:00:00.0000CT.
function startISAAC() {
	ISAAC.Simulation.init(
	{
		"config" : {
			graphicsEnabled : true,
			scaling : "default"
		},
		"bodies" : {
			"Sun" : {
				name : "Sun", 
				position : [0, 0, 0], 
				mass : 1.988435e24, 
				isStar : true,
				radius : 695500,
				texture : "external/planets/sun.jpg"
			},
			"Mercury" : {
				name : "Mercury",
				position : [-34.34126304594736, -59.83881592398617, -1.738227286314569],
				mass : 3.3022e17,
				velocity : [3.242607697980190e-5, -2.190935367320673e-5, -4.765349365538239e-6],
				radius : 2439.7,
				texture : "external/planets/mercury.jpg"
			},
			"Venus" : {
				name : "Venus",
				position : [-102.3178380016565, 32.62303974857563, 6.352081275507866],
				mass : 4.869e18,
				velocity : [-1.080589728829473e-5, -3.352572735644723e-5, 1.643058486842552e-7],
				radius : 6051.9,
				texture : "external/planets/venus.jpg"
			},
			"Earth" : {
				name : "Earth",
				position : [-141.3464397912099, -49.70175623515072, 1.845629910630098e-3],
				mass : 5.9721986e18,
				velocity : [9.387467194099132e-6, -2.820546804750964e-5, -3.335489234220996e-10],
				radius : 6367.5,
				texture : "external/planets/earth.jpg"
			},
			"Mars" : {
				name : "Mars",
				position : [-247.0577964253138, 2.607918972403293, 6.120960274943644],
				mass : 6.5185e17,
				velocity : [6.507888620275963e-7, -2.216028295316947e-5, -4.802973165012580e-7],
				radius : 3386,
				texture : "external/planets/mars.jpg"
			},
			"Jupiter" : {
				name : "Jupiter",
				position : [480.9176848793924, 571.0765569421500, -13.13349118484296],
				mass : 1.8988e21,
				velocity : [-1.016103900367553e-5, 9.045517267735690e-6, 1.897925792649849e-7],
				radius : 69173,
				texture : "external/planets/jupiter.jpg"
			},
			"Saturn" : {
				name : "Saturn",
				position : [-1308.125257452327, -631.8980859148376, 63.06897677571023],
				mass : 5.685e20,
				velocity : [3.671844960056266e-6, -8.711916465865464e-6, 4.785296340228841e-9],
				radius : 57316,
				texture : "external/planets/saturn.jpg"
			},
			"Uranus" : {
				name : "Uranus",
				position : [2993.163750777438, 235.9479785280531, -37.89556426125482],
				mass : 8.6625e19,
				velocity : [-5.930129454709614e-7, 6.477979332815045e-6, 3.178365529507968e-8],
				radius : 25266,
				texture : "external/planets/uranus.jpg"
			},
			"Neptune" : {
				name : "Neptune",
				position : [3914.732947116928, -2193.945531342488, -45.02107870865629],
				mass : 1.0278e20,
				velocity : [2.613881670696835e-6, 4.780319271610741e-6, -1.586835000701678e-7],
				radius : 24553,
				texture : "external/planets/neptune.jpg"
			},
			"Pluto" : {
				name : "Pluto",
				position : [638.1080671989861, -4764.888577948751, 325.4419510356392],
				mass : 1.314e16,
				velocity : [5.476987352349563e-6, -3.403729996552767e-7, -1.528481974366561e-6],
				radius : 1173,
				texture : "external/planets/pluto.jpg"
			}
		}
	});
}
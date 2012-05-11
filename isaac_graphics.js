// Graphics module for ISAAC. Requires Three.js.

// Core elements.
ISAAC.Graphics = ISAAC.Graphics || {};
ISAAC.Graphics.models = [];
ISAAC.Graphics.lights = [];
ISAAC.Graphics.webGLEnabled = false;
ISAAC.Graphics.guiDOMElement = undefined;
ISAAC.Graphics.THREE = ISAAC.Graphics.THREE || {};
ISAAC.Graphics.camera = ISAAC.Graphics.camera || { "transitioning" : false };

// Optional prettiness.
ISAAC.Graphics.velLines = [];
ISAAC.Graphics.accelLines = [];
ISAAC.Graphics.trails = [];
ISAAC.Graphics.freeCamera = true;

ISAAC.Graphics.objUpdate = function (object, model) {
	model.position.x = object.motion.position[0];
	model.position.y = object.motion.position[2];
	model.position.z = object.motion.position[1];
}

ISAAC.Graphics.createModel = function(orbitalBody, scaleMethod) {
	try {
		var material, model;
		// Calculate the radius the object's model should have.
		var radius;
		switch(scaleMethod) {
			case "linear" : radius = orbitalBody.physical.radius / 20000; break;
			case "realistic" : radius = orbitalBody.physical.radius / 1e6; break;
			default : radius = ISAAC.Math.sqr(Math.log(orbitalBody.physical.radius) / Math.log(10))/2; break;
		}

		// If this body is a star, use MeshBasicMaterial. If not, use MeshLambertMaterial (provided we have WebGL support).
		var materialType = (orbitalBody.isStar || !(ISAAC.Graphics.webGLEnabled)) ? THREE.MeshBasicMaterial : THREE.MeshLambertMaterial;
		
		// Check if we have a texture. If not, choose a random colour to apply to the model.
		// We use the random colour to draw acceleration and velocity lines, too.
		var objColor = Math.random() * 16777215;
		if(orbitalBody.texture) {
			material = new materialType( { map : THREE.ImageUtils.loadTexture(orbitalBody.texture), overdraw : true } );
		} else {
			material = new materialType( { color : objColor, overdraw : true })
		}

		// Create the model.
		var segmentAmount = ISAAC.Graphics.webGLEnabled ? 32 : 16;
		model = new THREE.Mesh(new THREE.SphereGeometry(radius, segmentAmount, segmentAmount), material);
		model.name = orbitalBody.name;
		model.number = ISAAC.Graphics.models.length; // Used for shifting camera focus.
		model.colour = objColor;
		model.radius = radius;

		// Used for motion trails. Keep track of the last 60 positions this model was at.
		model.prevPositions = new ISAAC.Queue(60);

		// If this body is a star (and we have WebGL support), create a point light at its position.
		if(orbitalBody.isStar && ISAAC.Graphics.webGLEnabled) {
			var light = new THREE.PointLight(0xFFFFFF, 1.5);
			light.position.x = orbitalBody.motion.position[0];
			light.position.y = orbitalBody.motion.position[2];
			light.position.z = orbitalBody.motion.position[1];
			light.name = model.name;
			light.number = model.number;
			ISAAC.Graphics.lights.push(light);
		}

		// Add the model to our collection.
		ISAAC.Graphics.models.push(model);
	} catch(x) {
		console.log("Unable to create model for " + orbitalBody.name);
	}
}

ISAAC.Graphics.init = function() {
	var gui = new dat.GUI( { width : 500 } );
	ISAAC.Graphics.guiDOMElement = gui.domElement;

	// Create the Camera settings.
	gui.add(window, 'cameraDist', 5, 2000).name("Camera Distance").listen();
	
	// Camera Focus drop-down.
	var camFocusObject = {};
	for(var i = 0; i < ISAAC.Graphics.models.length; i++) {
		camFocusObject[ISAAC.Graphics.models[i].name] = ISAAC.Graphics.models[i].number;
	}
	camFocusGUI = gui.add(ISAAC.Config, 'cameraFocus', camFocusObject).name("Camera Focus");
	camFocusGUI.onChange(function(value) { ISAAC.Graphics.camera.transitioning = true;});
	gui.add(ISAAC.Config, 'cameraTransitions').name("Camera Transitions");

	// Create the Graphics Settings folder.
	var graphicSettings = gui.addFolder("Graphics Settings");
	graphicSettings.add(ISAAC.Config, 'showVectors').name("Show Velocity and Acceleration");
	// graphicSettings.add(ISAAC.Config, 'showTrails').name("Show Motion Trails");
	
	// Create the Simulation Settings folder.
	var simSettings = gui.addFolder("Simulation Settings");
	simSettings.add(ISAAC.Simulation, 'restart').name("Reset Simulation");

	var upstepDOM = simSettings.add(ISAAC.Config, 'updateStep', 1, 90).step(1).name("Days Per Second").domElement;
	upstepDOM.onmouseover = timestepShow;
	upstepDOM.onmouseout = timestepHide;

	var gcmDOM = simSettings.add(ISAAC.Config, "gravConstMult", 0.1, 10).name("Gravitational Constant Multiplier").domElement;
	gcmDOM.onmouseover = gcmShow;
	gcmDOM.onmouseout = gcmHide;
	
	// Create the Orbital Bodies folder.
	var planetsFolder = gui.addFolder("Orbital Bodies");

	// Create folders for each body.
	for(var i = 0; i < ISAAC.Simulation.bodies.length; i++) {
		var curr = ISAAC.Simulation.bodies[i];
		var folder = planetsFolder.addFolder(curr.name);
		var controller = folder.add(curr.config, "massMult", 0.1, 100).name("Mass Multiplier");
		var bodyDOM = controller.domElement;
		bodyDOM.onmouseover = massMultShow;
		bodyDOM.onmouseout = massMultHide;
	}

	// Add everything to the scene.
	for(var i = 0; i < ISAAC.Graphics.models.length; i++) {
		ISAAC.Graphics.THREE.scene.add(ISAAC.Graphics.models[i]);
	}

	if(ISAAC.Graphics.webGLEnabled) {
		for(var i = 0; i < ISAAC.Graphics.lights.length; i++) {
			ISAAC.Graphics.THREE.scene.add(ISAAC.Graphics.lights[i]);
		}
	}

	// Render.
	ISAAC.Graphics.THREE.renderer.render(ISAAC.Graphics.THREE.scene, ISAAC.Graphics.THREE.camera);
}

ISAAC.Graphics.reset = function() {
	ISAAC.Graphics.models = [];
	ISAAC.Graphics.lights = [];
	ISAAC.Graphics.velLines = [];
	ISAAC.Graphics.accelLines = [];
	ISAAC.Graphics.trails = [];

	// Setup the camera and scene.
	cameraAngleY = 10;
	cameraDist = 200;
	ISAAC.Graphics.THREE.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 10000);
	ISAAC.Graphics.THREE.camera.position.x = cameraDist;
	ISAAC.Graphics.THREE.camera.lookAt(origin);
	ISAAC.Graphics.THREE.scene = new THREE.Scene();
	ISAAC.Graphics.THREE.scene.add(ISAAC.Graphics.THREE.camera);

	// Swoosh. Fly the camera in (if we have WebGL support.)
	if(ISAAC.Graphics.webGLEnabled) {
		cameraDist *= 10;
		ISAAC.Graphics.freeCamera = false;
	}
}
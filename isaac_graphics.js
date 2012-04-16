// Graphics module for ISAAC. Requires Three.js.

ISAAC.Graphics = ISAAC.Graphics || {};
ISAAC.Graphics.models = [];
ISAAC.Graphics.lights = [];
ISAAC.Graphics.webGLEnabled = false;

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
		if(orbitalBody.texture) {
			material = new materialType( { map : THREE.ImageUtils.loadTexture(orbitalBody.texture), overdraw : true } );
		} else {
			material = new materialType( { color : Math.random() * 0x808008 + 0x808080, overdraw : true })
		}

		// Create the model.
		var segmentAmount = ISAAC.Graphics.webGLEnabled ? 16 : 32;
		model = new THREE.Mesh(new THREE.SphereGeometry(radius, segmentAmount, segmentAmount), material);
		model.name = orbitalBody.name;
		model.number = ISAAC.Graphics.models.length; // Used for shifting camera focus.

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
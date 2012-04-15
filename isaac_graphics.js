// Graphics module for ISAAC. Requires Three.js.

ISAAC.Graphics = ISAAC.Graphics || {};
ISAAC.Graphics.models = [];
ISAAC.Graphics.webGLEnabled = false;

ISAAC.Graphics.objUpdate = function (object, model) {
	model.position.x = object.motion.position[0];
	model.position.y = object.motion.position[2];
	model.position.z = object.motion.position[1];
}

ISAAC.Graphics.createModel = function(orbitalBody, scaleMethod) {
	// Check for a texture.
	if(orbitalBody.texture) {
		var material, model;
		// Calculate the radius the object's model should have.
		var radius;
		switch(scaleMethod) {
			default : radius = ISAAC.Math.sqr(Math.log(orbitalBody.physical.radius) / Math.log(10))/2;
		}

		// If this planet is a star, use MeshBasicMaterial. If not, use MeshLambertMaterial (provided we have WebGL support).
		var materialType = (orbitalBody.isStar && ISAAC.Graphics.webGLEnabled) ? THREE.MeshBasicMaterial : THREE.MeshLambertMaterial;
		material = new materialType( { map : THREE.ImageUtils.loadTexture(orbitalBody.texture), overdraw : true } );

		// Create the model.
		model = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), material);
		model.name = orbitalBody.name;
		model.number = ISAAC.Graphics.models.length; // Used for shifting camera focus.

		// Add the model to our collection.
		ISAAC.Graphics.models.push(model);
	} else {
		console.log("Unable to create model for " + orbitalBody.name);
	}
}
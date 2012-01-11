// Class to define a camera object that can be used in an O3D rendering area.

// Function to round a number. Takes in the item to be rounded and the amount of decimal places,
// returns the item rounded to that amount of decimal places.
// If the item is an array/vector, every element will be rounded. This function will break if an object
// that isn't an array/vector is passed to it.
function round(x, dp) {
	var power = Math.pow(10, dp);
	if(typeof(x) === "object") {
		for(i = 0; i < x.length; i++) {
			x[i] = round(x[i], dp);
		}
		return x;
	}
	
	return (Math.round(x * power) / power);
}

var Camera = {
	upArray : [0, 0, 1],
	eyeX : 0,
	eyeY : 0,
	eyeZ : 0,
	
	targetX : 0,
	targetY : 1,
	targetZ : 0,
	
	lastXAngle: 90,
	lastYAngle: 90,
	lastZAngle: 0,
	
	maxVerticalAngle: 60,
	
	// Camera Initialise Method
	initialise: function() {
		this.update({"eyeX" : this.eyeX, "eyeY" : this.eyeY, "eyeZ" : this.eyeZ,
		"targetX" : this.targetX, "targetY" : this.targetY, "targetZ" : this.targetZ});
	},
	
	
	// Camera Update Method
	update: function(newParams) {
		var eyeX, eyeY, eyeZ, targetX, targetY, targetZ, eyeVector, targetVector;
		for(name in newParams) {
			// Round everything off to five decimal places.
			newParams[name] = round(newParams[name], 5);
			
			switch(name) {
				case "eyeX": 
					eyeX = newParams["eyeX"];
					break;
				case "eyeY": 
					eyeY = newParams["eyeY"];
					break;
				case "eyeZ": 
					eyeZ = newParams["eyeZ"];
					break;
				case "targetX": 
					targetX = newParams["targetX"];
					break;
				case "targetY": 
					targetY = newParams["targetY"];
					break;
				case "targetZ": 
					targetZ = newParams["targetZ"];
					break;
				case "eyeVector":
					eyeVector = newParams["eyeVector"];
					break;
				case "targetVector":
					targetVector = newParams["targetVector"];
					break;
			}
		}
		
		if(typeof(eyeVector) != "undefined") {
			this.eyeX = eyeVector[0];
			this.eyeY = eyeVector[1];
			this.eyeZ = eyeVector[2];
		}
		
		if(typeof(targetVector) != "undefined") {
			this.targetX = targetVector[0];
			this.targetY = targetVector[1];
			this.targetZ = targetVector[2];
		}
		
		// Uses the || operator's handling of falsy values.
		g_viewInfo.drawContext.view = g_math.matrix4.lookAt(
		eyeVector || [eyeX || this.eyeX, eyeY || this.eyeY, eyeZ || this.eyeZ],
		targetVector || [targetX || this.targetX, targetY || this.targetY, targetZ || this.targetZ], 
		this.upArray);
	},
	
	
	// Camera Movement Methods
	move: function(amount, direction) {
		var posArray = [this.eyeX, this.eyeY, this.eyeZ];
		var targetArray = [this.targetX, this.targetY, this.targetZ];
		
		var diffVector = g_math.subVector(posArray, targetArray);
		var adjustmentVector = g_math.mulVectorScalar(diffVector, amount);
		var newPos, newTarget;
		
		switch(direction) {
			case "forward":
				newPos = g_math.subVector(posArray, adjustmentVector);
				newTarget = g_math.subVector(targetArray, adjustmentVector);
				break;
			case "back":
				newPos = g_math.addVector(posArray, adjustmentVector);
				newTarget = g_math.addVector(targetArray, adjustmentVector);
				break;
		}
		this.update( {"eyeVector" : newPos, "targetVector" : newTarget});
	},
	
	// Right-handed coordinate system.
	// X is to the right (because we start 90 degrees facing right.)
	// Y is forward (only because we're looking right.)
	// Z is up.
	strafe: function(amount, direction) {
		var posArray = [this.eyeX, this.eyeY, this.eyeZ];
		
		// We want the target point "normalised" to the same height level as our current position.
		var normalisedTarget = [this.targetX, this.targetY, this.eyeZ];
		
		// Get the vector from our current position to the normalised target.
		var posVector = g_math.subVector(posArray, normalisedTarget);
		
		var shiftVector, adjustmentVector, newPos, newTarget;
		
		switch(direction) {
			case "left":
				shiftVector = g_math.cross(posVector, this.upArray);
				break;
			case "right":
				shiftVector = g_math.cross(posVector, g_math.mulVectorScalar(this.upArray, -1));
				break;
		}
		adjustmentVector = g_math.mulVectorScalar(shiftVector, amount);
		
		newPos = g_math.addVector(posArray, adjustmentVector);
		
		//console.log("Added: " + newPos);
		newTarget = g_math.addVector([this.targetX, this.targetY, this.targetZ], adjustmentVector);
		
		this.update( {"eyeVector" : newPos, "targetVector" : newTarget});
	},
	
	moveUp: function(amount) {
		// Calculate the new position and target values.
		this.eyeZ = this.eyeZ + amount;
		this.targetZ = this.targetZ + amount;
		
		// Update the camera position.
		this.update({ "eyeZ" : this.eyeZ, "targetZ" : this.targetZ });
	},
	moveDown: function(amount) {
		// Calculate the new position and target values.
		this.eyeZ = this.eyeZ - amount;
		this.targetZ = this.targetZ - amount;
		
		// Update the camera position.
		this.update({ "eyeZ" : this.eyeZ, "targetZ" : this.targetZ });
	},
	
	// Camera Rotation Methods
	rotate: function(amount, direction){
		// Reset the camera angle if it goes beyond +-180. This is to ensure
		// we don't end up with massive camera angles after a while.
		if(this.lastXAngle >= 180) {
			this.lastXAngle = -180;
			} else if(this.lastXAngle <= -180) {
			this.lastXAngle = 180;
		}
		
		if(this.lastYAngle >= 180) {
			this.lastYAngle = -180;
			} else if(this.lastYAngle <= -180) {
			this.lastYAngle = 180;
		}
		
		var distance = 1;
		var newAngle, cosAmount, sinAmount, newX, newY;
		
		switch(direction){
			case "left": 
				this.lastXAngle += amount;
				this.lastYAngle += amount;
				cosAmount = Math.cos(g_math.degToRad(this.lastXAngle));
				sinAmount = Math.sin(g_math.degToRad(this.lastYAngle));
				newX = this.eyeX + cosAmount;
				newY = this.eyeY + sinAmount;
				break;
			case "right": 
				this.lastXAngle -= amount;
				this.lastYAngle -= amount;
				cosAmount = Math.cos(g_math.degToRad(this.lastXAngle));
				sinAmount = Math.sin(g_math.degToRad(this.lastYAngle));
				newX = this.eyeX + cosAmount;
				newY = this.eyeY + sinAmount;
				break;
		}
		
		this.update({ "targetVector" : [newX, newY, this.targetZ] });
	},
	
	tilt: function(amount, direction) {
		var cosAmount, sinAmount, newX, newY, newZ;
		
		switch(direction){
			case "up":
				if(this.lastZAngle >= this.maxVerticalAngle) {
					this.lastZAngle = this.maxVerticalAngle;
					} else {
					this.lastZAngle += amount;
					
					cosAmount = Math.cos(g_math.degToRad(amount));
					sinAmount = Math.sin(g_math.degToRad(this.lastZAngle));
					newZ = this.eyeZ + sinAmount;
					newX = this.targetX * cosAmount;
					newY = this.targetY * cosAmount;
				}
				break;
			case "down":
				if(this.lastZAngle <= -this.maxVerticalAngle) {
					this.lastZAngle = -this.maxVerticalAngle;
					} else {
					this.lastZAngle -= amount;
					
					cosAmount = Math.cos(g_math.degToRad(-amount));
					sinAmount = Math.sin(g_math.degToRad(this.lastZAngle));
					newZ = this.eyeZ + sinAmount;
					newX = this.targetX * cosAmount;
					newY = this.targetY * cosAmount;
				}
				break;
		}
		// Need to use the falsy-handling system to avoid Undefined being passed to the update method.
		// Any of the new<axis> variables could be undefined if the camera angle is more than 60 up or down.
		this.update( {"targetVector" : [newX || this.targetX, newY || this.targetY, newZ || this.targetZ]});
	}
};
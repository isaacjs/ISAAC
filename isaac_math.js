// Math Library for ISAAC Physics.
// We assume 3D vectors in all cases.

ISAAC.Math = ISAAC.Math || {};

ISAAC.Math.sqr = function (number) {
	return number * number;
}

//PS (Thu 19 Jan 2012 08:34:21 PM SGT) - I'm not sure, but I think this MIGHT be a faster alternative to vectorLength
// J - Agreed.
ISAAC.Math.sqrNormVector = function (vector) {
	return sqr(vector[0]) + sqr(vector[1]) + sqr(vector[2]);
}

// addVector function.
// Takes in two vectors, returns a new vector made by adding
// the inputs together.
ISAAC.Math.addVector = function (vectorA, vectorB) {
	// if(vectorA.length === vectorB.length) {
	// 	var newVector = new Array();
	// 	for(var i = 0; i < vectorA.length; i++) {
	// 		newVector[i] = vectorA[i] + vectorB[i];
	// 	}
	// 	return newVector;
	// } else {
	// 	return vectorA;
	// }
	return [vectorA[0] + vectorB[0], vectorA[1] + vectorB[1], vectorA[2] + vectorB[2]];
}

// scaleVector function.
// Takes in a vector and a scalar, returns a new vector made by
// multiplying the scalar through the vector.
ISAAC.Math.scaleVector = function (vector, scalar) {
	// var newVector = new Array();
	// for(var i = 0; i < vector.length; i++) {
	// 	newVector[i] = vector[i] * scalar;
	// }
	// return newVector;
	return [vector[0] * scalar, vector[1] * scalar, vector[2] * scalar];
}

// subtractVector function.
// Takes in two vectors, returns a new vector made by subtracting the
// second vector from the first.
ISAAC.Math.subtractVector = function (vectorA, vectorB) {
	// return addVector(vectorA, scaleVector(vectorB, -1));
	return [vectorA[0] - vectorB[0], vectorA[1] - vectorB[1], vectorA[2] - vectorB[2]];
}

// dotProduct function.
// Takes in two vectors, returns the dot product of the two. If the two input vectors
// don't have the same length, -1 will be returned.
ISAAC.Math.dotProduct = function (vectorA, vectorB) {
	if(vectorA.length === vectorB.length) {
		var sum = 0;
		for (var i = 0; i < vectorA.length; i++) {
			sum += vectorA[i] * vectorB[i];
		}
		return sum;
	} else {
		return -1;
	}
}

// vectorLength function.
// Given a 3D vector, returns the length of it based on the Euclidean norm.
ISAAC.Math.vectorLength = function (vector) {
	// var squares = 0;

	// for (var i = 0; i < vector.length; i++) {
	// 	squares += sqr(vector[i]);
	// }
	// return squares;
	return Math.sqrt(ISAAC.Math.sqr(vector[0]) + ISAAC.Math.sqr(vector[1]) + ISAAC.Math.sqr(vector[2]));
}

// vectorNormalise function.
// Given a 3D vector, returns a unit vector in the same direction.
ISAAC.Math.vectorNormalise = function (vector) {
	var length = ISAAC.Math.vectorLength(vector);
	// var normal = [];
	
	// for (var i = 0; i < vector.length; i++) {
	// 	normal[i] = vector[i] / length;
	// }
	// return normal;
	return [vector[0] / length, vector[1] / length, vector[2] / length];
}

// vectorFitToLength function.
// Given a 3D vector and a scalar, returns a vector in the same direction whose
// length is the scalar.
ISAAC.Math.vectorFitToLength = function (vector, scalar) {
	var scaled = ISAAC.Math.vectorNormalise(vector);
	
	// for (var i = 0; i < scaled.length; i++) {
	// 	scaled[i] *= scalar;
	// }
	// return scaled;
	return [scaled[0] * scalar, scaled[1] * scalar, scaled[2] * scalar];
}
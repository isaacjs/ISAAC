// Math Library for ISAAC Physics.
// We assume 3D vectors in all cases.

function sqr (number) {
	return number * number;
}

//PS (Thu 19 Jan 2012 08:34:21 PM SGT) - I'm not sure, but I think this MIGHT be a faster alternative to vectorLength
//Also, I'm not sure if using sqrt is a good idea. Comparison between floats is inaccurate.
function sqrNormVector (vector) { //ONLY for 3-dimensional vectors
	return sqr(vector[0]) + sqr(vector[1]) + sqr(vector[2]);
}

// addVector function.
// Takes in two vectors, returns a new vector made by adding
// the inputs together.
function addVector (vectorA, vectorB) {
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
function scaleVector (vector, scalar) {
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
function subtractVector (vectorA, vectorB) {
	// return addVector(vectorA, scaleVector(vectorB, -1));
	return [vectorA[0] - vectorB[0], vectorA[1] - vectorB[1], vectorA[2] - vectorB[2]];
}

// dotProduct function.
// Takes in two vectors, returns the dot product of the two. If the two input vectors
// don't have the same length, -1 will be returned.
function dotProduct (vectorA, vectorB) {
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
function vectorLength (vector) {
	// var squares = 0;

	// for (var i = 0; i < vector.length; i++) {
	// 	squares += sqr(vector[i]);
	// }
	// return squares;
	return Math.sqrt(sqr(vector[0]) + sqr(vector[1]) + sqr(vector[2]));
}

// vectorNormalise function.
// Given a 3D vector, returns a unit vector in the same direction.
function vectorNormalise (vector) {
	var length = vectorLength(vector);
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
function vectorFitToLength (vector, scalar) {
	var scaled = vectorNormalise(vector);
	
	for (var i = 0; i < scaled.length; i++) {
		scaled[i] *= scalar;
	}
	return scaled;
	// return scaleVector(vectorNormalise(vector), scalar);
}
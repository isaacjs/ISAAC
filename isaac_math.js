// Math Library for ISAAC Physics.

// addVector function.
// Takes in two vectors, returns a new vector made by adding
// the inputs together. If the two input vectors don't have the same
// length, the first input vector will be returned.
function addVector (vectorA, vectorB) {
	if(vectorA.length === vectorB.length) {
		var newVector = new Array();
		for(position in vectorA) {
			newVector[position] = vectorA[position] + vectorB[position];
		}
		return newVector;
	} else {
		return vectorA;
	}
}

// scaleVector function.
// Takes in a vector and a scalar, returns a new vector made by
// multiplying the scalar through the vector.
function scaleVector (vector, scalar) {
	var newVector = new Array();
	for(position in vector) {
		newVector[position] = vector[position] * scalar;
	}
	return newVector;
}

// subtractVector function.
// Takes in two vectors, returns a new vector made by subtracting the
// second vector from the first. If the two input vectors don't have the same
// length, the first input vector will be returned.
function subtractVector (vectorA, vectorB) {
	return addVector(vectorA, scaleVector(vectorB, -1));
}

// dotProduct function.
// Takes in two vectors, returns the dot product of the two. If the two input vectors
// don't have the same length, -1 will be returned.
function dotProduct (vectorA, vectorB) {
	if(vectorA.length === vectorB.length) {
		var sum = 0;
		for (position in vectorA) {
			sum += vectorA[position] * vectorB[position];
		}
		return sum;
	} else {
		return -1;
	}
}
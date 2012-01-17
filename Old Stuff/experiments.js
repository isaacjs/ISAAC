// Experimenting with JavaScript: quick and dirty recursive factorial.
function factorial(i) {
	if( typeof(i) !== "number" || i === 1){
		return 1;
	} 
	else {
		return i * factorial(i - 1);
	}
}

// Experimenting with JavaScript: quick and dirty iterative factorial.
function iterFact(a) {
	if(typeof(a) !== "number") {
		return 1;
	} 
	else {
		var result = a;
		for(var i = a-1; i > 0; i--){
			result *= i;
		}
		return result;
	}
}

// Experimenting with JavaScript: Celsius to Fahrenheit converter.
function celsiusToFahrenheit(celsius) {
	if(typeof(celsius) !== "number") {
		return "" + celsius + " is not a number.";
	} else {
		return celsius * (9/5) + 32;
	}
}

// Experimenting with JavaScript: Fahrenheit to Celsius converter.
function fahrenheitToCelsius(fahrenheit) {
	if(typeof(fahrenheit) !== "number") {
		return "" + fahrenheit + " is not a number.";
	} else {
		return (fahrenheit - 32) * (5/9);
	}
}
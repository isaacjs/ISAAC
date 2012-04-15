ISAAC.Queue = function (size) {
	this.size = size;
	this.contents = new Array();
	this.enqueue =  function(element) {
		if(this.contents.length === this.size) {
			this.contents.shift();
		}
		this.contents.push(element);
	};
	this.dequeue = function() {
		var first = this.contents.shift();
		return first;
	};
};
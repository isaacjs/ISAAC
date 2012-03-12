function Queue (size) {
	return {
		"size" : size,
		"contents" : new Array(),
		"enqueue" : function(element) {
			if(this.contents.length === this.size) {
				this.contents.shift();
			}
			this.contents.push(element);
		},
		"dequeue" : function() {
			var first = this.contents.shift();
			return first;
		}
	}
}
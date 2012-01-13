var Queue = {
	"internal":[],
	"size":0,
	"offset":-1
};

Queue.add = function (item) {
	Queue.internal[Queue.size]=item;
	Queue.size++;
}

Queue.next = function () {
	if (Queue.size>0){
		Queue.offset++;
		Queue.offset %= Queue.size;
		return Queue.internal[Queue.offset];
	}
	else
		console.log("Empty Queue!");
}

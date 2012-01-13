var Queue = {
	"internal":[],
	"size":0,
	"offset":0
};

function Queue.add(item){
	internal[size]=item;
}

function Queue.next(){
	if (size>0){
		offset++;
		offset %= size;
		return internal[offset - 1]
	}
	else
		Console.log("Empty Queue!");
}

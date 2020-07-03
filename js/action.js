class Action {
	constructor(name, duration){
		this.name = name;
		this.duration = duration;
	}
	
	onStart(actor, target){
		
	}
	
	onFinish(actor, target){
		
	}
}

ACTION_OPEN_DOOR  = new Action("Open Door", 10);
ACTION_OPEN_DOOR.onStart = function(a, t){ t.open() };  

ACTION_CLOSE_DOOR = new Action("Close Door", 10);
ACTION_CLOSE_DOOR.onStart = function(a, t){ t.close() };  
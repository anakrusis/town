class Entity {
	constructor(x, y){
		this.name = "Entity";
		this.x = x;
		this.y = y;
		
		this.color = "#ffffff";
		this.height = 8; this.width = 8;
		this.renderHeight = 8; this.renderWidth = 8;
		this.texture = [ 0x18, 0x24, 0x42, 0x81, 0x81, 0x42, 0x24, 0x18 ];
		this.flip = false;
		this.collide = false;
		
		this.actions = []; // all the actions associated with this entity on click
		
		this.actionQueue = []; // the actions to be performed by this entity
		this.currentActionTime = 0; // how far along with the action are it
		
		this.uuid = newID();
	}
	
	update() {
		this.calcTilePos();
	}
	
	calcTilePos(){
				// top left corner, useful for msot stuff
		this.tileX = Math.floor( this.x / 8 ) - currentLot.x;
		this.tileY = Math.floor( this.y / 8 ) - currentLot.y;
		
		// bottom right corner, the other stuff
		this.tileX2 = Math.floor( (this.x + this.width) / 8 ) - currentLot.x;
		this.tileY2 = Math.floor( (this.y + this.height) / 8 ) - currentLot.y;
	}
}

class EntityPlayer extends Entity {
	constructor(x, y){
		super(x, y);
		this.width = 8; this.height = 8;
		this.color = "#00ffff";
		this.texture = [ 0x3c, 0x42, 0x6a, 0x42, 0x10, 0x3c, 0x18, 0x24 ];
	}
	
	update(){
		super.update();
		var UboundX = currentLot.width - 1;
		var UboundY = currentLot.height - 1;
		var LboundX = 0; var LboundY = 0;
		if ( !( LboundX <= this.tileX && this.tileX <= UboundX && 
			 LboundY <= this.tileY && this.tileY <= UboundY ) ){

			//currentLot = undefined;
			for (key in lots){
				lot = lots[key];
				var absTileX = Math.floor( this.x / 8 );
				var absTileY = Math.floor( this.y / 8 );
				
				var UboundX = lot.x + lot.width - 1;
				var UboundY = lot.y + lot.height - 1;
				var LboundX = lot.x; var LboundY = lot.y;
				
				if ( ( LboundX <= absTileX && absTileX <= UboundX && 
					LboundY <= absTileY && absTileY <= UboundY ) ){
					currentLot = lot;
					console.log(lot);
					this.calcTilePos();
					break;
				}
			}
		}
	}
}

class EntityDoor extends Entity {
	constructor(x, y){
		super(x, y);
		this.color = "#ffff80";
		this.texture = [ 0xff, 0x81, 0x81, 0x81, 0x85, 0x81, 0x81, 0x81 ];
		this.actions = [ ACTION_OPEN_DOOR ];
		this.collide = true;
	}
	
	open(){
		this.texture = [ 0xf0, 0x90, 0x90, 0x90, 0xb0, 0x90, 0x90, 0x90 ];
		this.actions = [ ACTION_CLOSE_DOOR ];
		this.collide = false;
	}
	
	close(){
		this.texture = [ 0xff, 0x81, 0x81, 0x81, 0x85, 0x81, 0x81, 0x81 ];
		this.actions = [ ACTION_OPEN_DOOR ];
		this.collide = true;
	}
}

var newID = function(){
	return Math.round(Math.random() * 100000);
}
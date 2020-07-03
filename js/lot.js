class Lot {
	constructor(x, y, w, h){
		this.name = "Lot";
		this.tiles = [];
		
		// in coarse tile positions not fine x/y
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		
		this.entityUUIDs = [];
		this.uuid = newID();
	}
	
	initLot( tilemap ){
		var data = tilemap.layers[0].data;
		this.tiles = [];
		var count = 0;
		
		for (var i = 0; i < this.height; i++){
			this.tiles[i] = [];
			
			for (var j = 0; j < this.width; j++){
				var index = data[count] - 1;
				this.tiles[i][j] = tiles[index];
				count++;
			}
			
		}
		this.width = tilemap.width; this.height = tilemap.height;
	}
}
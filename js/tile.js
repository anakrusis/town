tiles = [];

class Tile {
	constructor(){
		this.name = "Tile";
		this.texture = [];
		this.color = "#ffffff";
		this.collide = false;
		this.width = 8; this.height = 8;
		
		tiles.push(this);
	}
}

class TileWallBrick extends Tile{
	constructor(){
		super();
		this.name = "Brick Wall";
		this.texture = [ 0xff, 0x11, 0xff, 0x44, 0xff, 0x11, 0xff, 0x44 ];
		this.color = "#db8067";
		this.collide = true;
	}
}

class TileFloorWood extends Tile{
	constructor(){
		super();
		this.name = "Wood Floor";
		this.texture = [ 0x00, 0x00, 0x00, 0xff, 0x00, 0x02, 0x00, 0xff ];
		this.color = "#604000";
	}
}

class TileFloorGrass extends Tile{
	constructor(){
		super();
		this.name = "Grass";
		this.texture = [ 0x01, 0x20, 0x04, 0x10, 0x00, 0x81, 0x00, 0x12 ];
		this.color = "#173d1b";
	}
}

class TileFloorStone extends Tile{
	constructor(){
		super();
		this.name = "Stone Path";
		this.texture = [ 0xc1, 0x99, 0x3c, 0x7c, 0x3d, 0x18, 0x81, 0xc3 ];
		this.color = "#404040";
	}
}

class TileFloorRoad extends Tile{
	constructor(){
		super();
		this.name = "Road Line";
		this.texture = [ 0x00, 0x00, 0x00, 0xe7, 0xe7, 0x00, 0x00, 0x00 ];
		this.color = "#ffff00";
	}
}

// register tiles below...

TILE_AIR            = new Tile();
TILE_WALL_BRICK     = new TileWallBrick();
TILE_FLOOR_WOOD     = new TileFloorWood();
TILE_FLOOR_GRASS    = new TileFloorGrass();
TILE_FLOOR_STONE    = new TileFloorStone();
TILE_FLOOR_ROAD     = new TileFloorRoad();
TILE_FLOOR_SIDEWALK = new TileFloorStone();
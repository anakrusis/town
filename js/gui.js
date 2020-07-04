class TextBox {
	constructor ( x, y, text, width, height ){
		this.x = x;
		this.y = y;
		if (width) { this.width = width } else { this.width = 512 };
		if (height) { this.height = height } else { this.height = 64 };
		this.text = text;
	}

	onClick(){
	
	}
	update(){
	
	}
}

var initGUI = function(){
	
	// LIVE MODE SCREEN
	
	screen_MAIN = {
		elements: []
	}
	b = new TextBox(500, 500, []);
	b.update = function(){
		this.text = [];
		if (currentLot.tiles[cursorY]){
			if (currentLot.tiles[cursorY][cursorX]){
				tile = currentLot.tiles[cursorY][cursorX];
				this.text = [tile.name];
				this.text[0] += " (" + cursorX + " , " + cursorY + ")";
			}
		}
		this.width = 500;
		this.x = canvas.width - this.width;
		this.y = canvas.height - 64;
	}
	screen_MAIN.elements.push(b);
	
/* 	b = new TextBox(0,0, []);
	b.update = function(){
		this.text[0] = "tileX: " + player.tileX + " tileY: " + player.tileY + " tileY2: " + player.tileY2
	} */
	b = new TextBox(0,0, ["Build"]);
	b.update = function(){
		this.width = 200;
		this.x = canvas.width - this.width;
		this.y = 64;
	}
	b.onClick = function(){
		screen = screen_BUILD;
	}
	
	screen_MAIN.elements.push(b);
	
	// BUILD MODE SCREEN
	
	screen_BUILD = {
		elements: []
	}
	b = new TextBox(0,0, ["Live"]);
	b.update = function(){
		this.width = 200;
		this.x = canvas.width - this.width;
		this.y = 64;
	}
	b.onClick = function(){
		screen = screen_MAIN;
	}
	screen_BUILD.elements.push(b);
	
	for (var i = 0; i < 4; i++){
		buton = new TextBox(32, (i * 96), [], 256, 64);
		buton.offset = i;
		buton.update = function(){
			this.text = [ tiles[buildModeCursorPos + this.offset].name ]
			this.onClick = function(){
				buildModeTile = tiles[buildModeCursorPos + this.offset];
			}
			this.y = canvas.height - 384 + (this.offset * 96);
		}
		
		screen_BUILD.elements.push(buton);
	}
	
	up = new TextBox(320,0, ["⯅"], 48, 48);
	up.update = function(){ this.y = canvas.height - 384; }
	up.onClick = function(){ buildModeCursorPos = Math.max( 0, buildModeCursorPos - 1 ); }
	
	down = new TextBox(320,0, ["⯆"], 48, 48);
	down.update = function(){ this.y = canvas.height - 96; }
	down.onClick = function(){ buildModeCursorPos = Math.min( tiles.length - 4, buildModeCursorPos + 1 ); }
	
	screen_BUILD.elements.push(up, down);
	
	screen_ACTION = {
		elements: []
	}
	
}
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

var init = function(){
	canvas = document.getElementById("Canvas");
	canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto;"
	ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	
	cursorX = 0;
	cursorY = 0;
	keysDown = [];
	addEventListener("keydown", function (e) { // when a key is pressed
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) { // when a key is unpressed
		delete keysDown[e.keyCode];
	}, false);
	
	addEventListener("mousemove", function(e){
		const rect = canvas.getBoundingClientRect()
		const mouseX = e.clientX - rect.left
		const mouseY = e.clientY - rect.top
		cursorX = Math.floor (untra_x( mouseX  ) / 8) - currentLot.x; //- (l.x*8*cam_zoom)
		cursorY = Math.floor (untra_y( mouseY  ) / 8) - currentLot.y; // - (l.y*8*cam_zoom)
		
		cursorFineX = untra_x(mouseX);
		cursorFineY = untra_y(mouseY);
	});
	
	canvas.addEventListener('click', function (e) {
		const rect = canvas.getBoundingClientRect()
		const mouseX = event.clientX - rect.left
		const mouseY = event.clientY - rect.top
		for (i = 0; i < screen.elements.length; i++){
			
			btn = screen.elements[i];
			if ( btn.x <= mouseX && mouseX <= btn.x + btn.width && 
				 btn.y <= mouseY && mouseY <= btn.y + btn.height ){

				btn.onClick();
				return;
			}				
		}
		
		if (screen == screen_BUILD){
			if (currentLot.tiles[cursorY]){
				if (currentLot.tiles[cursorY][cursorX]){
					currentLot.tiles[cursorY][cursorX] = TILE_WALL_BRICK;
				}
			}
		} else if (screen == screen_MAIN){
			for (key in entities){
				e = entities[key];
				
				// clicked on an entity
				if ( ( e.x <= cursorFineX && cursorFineX <= e.x + e.width && 
					e.y <= cursorFineY && cursorFineY <= e.y + e.height ) ){
					//console.log(e);
					
					screen_ACTION.elements = [];
					
					for (var a = 0; a < e.actions.length; a++){
						var im_like_tt_ooo = new TextBox( mouseX, mouseY + (a * 96), [e.actions[a].name] )
						im_like_tt_ooo.action = e.actions[a];
						im_like_tt_ooo.onClick = function(){
							//console.log(e);
							this.action.onStart( player, e );
							screen = screen_MAIN;
						}
						screen_ACTION.elements.push( im_like_tt_ooo )
					}
					
					screen = screen_ACTION;
					break;
				}
			}
		}
	});
	
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
	
	b = new TextBox(0,0, []);
	b.update = function(){
		this.text[0] = "tileX: " + player.tileX + " tileY: " + player.tileY + " tileY2: " + player.tileY2
	}
	screen_MAIN.elements.push(b);
	
	screen_BUILD = {
		elements: []
	}
	
	screen_ACTION = {
		elements: []
	}
	
	screen = screen_MAIN;
	
	lots = {};
	entities = {};
	
	l = new Lot( -32, 17, 64, 9 );
	l.initLot( TileMaps.road );
	lots[l.uuid] = l;
	
	l = new Lot( 1, 1, 16, 16 );
	l.initLot( TileMaps.house );
	lots[l.uuid] = l;
	
	e = new EntityDoor(8*8, 11*8);
	entities[e.uuid] = e;
	e = new EntityDoor(9*8, 11*8); e.flip = true;
	entities[e.uuid] = e;
	
	player = new EntityPlayer(64, 64);
	entities[player.uuid] = player;
	
	currentLot = l;
}

var playerTileCol = function ( dir ){
	if (currentLot){
		
		// This first part ignores collision outside of the Lot boundaries (its fine.)
		
		var UboundX = currentLot.width - 1;
		var UboundY = currentLot.height - 1;
		if ( player.tileX < 0 || player.tileX2 < 0 || player.tileY < 0 || player.tileY2 < 0 ||

			player.tileX > UboundX || player.tileX2 > UboundX || player.tileY > UboundY || player.tileY2 > UboundY	){
			return false;
		}
		
		// Unfortunately each direction handles this differently, using the different sides of the quad
		
		switch (dir) {
		
			case "up":
				
				if (currentLot.tiles[player.tileY][player.tileX2].collide ||
					currentLot.tiles[player.tileY][player.tileX].collide){
					return true;
				}
				break;
			
			case "down":
			
				if ( currentLot.tiles[player.tileY2][player.tileX].collide ||
					 currentLot.tiles[player.tileY2][player.tileX2].collide){
					return true;
				}
				break;
				
			case "left":
				
				if ( currentLot.tiles[player.tileY][player.tileX].collide ||
					 currentLot.tiles[player.tileY2][player.tileX].collide){
					return true;
				}
				break;
				
			case "right":
			
				if ( currentLot.tiles[player.tileY][player.tileX2].collide ||
					 currentLot.tiles[player.tileY2][player.tileX2].collide){
					return true;
				}
				break;
		}
	}
	return false;
}

var update = function(){

	for (key in entities){
		entities[key].update();
	}

	if (87 in keysDown) { // up
		if (!playerTileCol("up")){
			player.y--;
		}
	}
	
	if (83 in keysDown) { // down
		if (!playerTileCol("down")){
			player.y++;
		}
	}
	
	if (65 in keysDown) { // left
		
		if (!playerTileCol("left")){
			player.x--;
		}
		player.flip = false;
	}
	if (68 in keysDown) { // right
		
		if (!playerTileCol("right")){
			player.x++;
		}
		player.flip = true;
	}
	
	cam_x = player.x;
	cam_y = player.y;
	
	for (i = 0; i < screen.elements.length; i++){
		screen.elements[i].update();
	}
}

var render = function(){

	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight
	
	originx = Math.floor(canvas.width / 2);
	originy = Math.floor(canvas.height / 2);

	ctx.fillStyle = "#110011";
	//ctx.fillStyle = "#FF00FF"; // deastl mode
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	for (key in lots){
		lot = lots[key];
		
		for (var i = 0; i < lot.height; i++){
			
			for (var j = 0; j < lot.width; j++){
				
				drawObject( lot.tiles[i][j], (j + lot.x ) * 8 , (i + lot.y) * 8 ); 
				
			}
			
			
		}
	
	}
	
	for (key in entities){
		entity = entities[key];
		drawObject(entity, entity.x, entity.y);
	}
	
	ctx.strokeStyle = "#ffffff";
	ctx.strokeRect( tra_x( (cursorX + currentLot.x) * 8 ), tra_y( (cursorY + currentLot.y) * 8 ), 8 * cam_zoom, 8 * cam_zoom );
	
		// buttons and stuff
	
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.font = "bold 32px Courier New";
	for (i = 0; i < screen.elements.length; i++){
		btn = screen.elements[i];

		ctx.fillStyle = "#110011";
		ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
		for (s = 0; s < btn.text.length; s++){
			var txt = btn.text[s];
			ctx.fillStyle = "#eeffff";
			ctx.fillText(txt, btn.x+8, btn.y+40);
		}
		
	}
	
}

// main loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta);
	render();
	
	then = now;
	requestAnimationFrame(main);
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = performance.now();

document.addEventListener('DOMContentLoaded', function(e) {
	init();
	main();
});
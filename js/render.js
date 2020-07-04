// note: does not have to be an entity, can be a tile too.

function drawObject( entity, drawX, drawY ){
	ctx.fillStyle = entity.color;
	var pxcount = 0;
	for (i = 0; i < entity.texture.length; i++){
		bitmask = 0x80;
		cbyte = entity.texture[i];
		
		for (q = 0; q < 8; q++){
		
			pixel = cbyte & bitmask;
			px = (pxcount % entity.renderWidth);
			py = Math.floor(pxcount / entity.renderWidth);
			
			if (entity.flip){ px = entity.renderWidth - px - 1 }
		
			if (pixel > 0){ 
			
				dx = tra_x( drawX + px );
				dy = tra_y( drawY + py );
			
				ctx.fillRect(dx,dy,cam_zoom,cam_zoom) 
				
			}
		
			bitmask /= 2; bitmask = Math.floor(bitmask);
			pxcount++;
		}
	}
}
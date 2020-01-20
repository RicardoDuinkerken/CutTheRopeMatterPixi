function Ball(x, y, r, color){
	var options = {
		friction: 0,
		restitution: 0.2,
		density: 0.01
	}
		
	this.body = Bodies.circle(x, y, r, options);
	this.body.label = 'ball';
	this.r = r;
	this.color = color
	World.add(engine.world, this.body);
	
	this.show = function(){
		var pos = this.body.position;
		var angle = this.body.angle;
		
		graphics.beginFill(color);
		graphics.lineStyle(1 ,  0x000000, 1);
		graphics.drawCircle(pos.x, pos.y, this.r );
		graphics.endFill();
	}
}
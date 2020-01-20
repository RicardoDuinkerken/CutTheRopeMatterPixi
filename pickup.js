function PickUp(x, y, p, r, color){

		
	this.body = Bodies.circle(x, y, r, {isStatic: true});
	this.body.label = 'pickUp';
	this.r = r;
	this.p = p;
	this.rot = 0;
	this.color = color;
	World.add(engine.world, this.body);
	
	this.show = function(){
		var pos = this.body.position;
	
		graphics.beginFill(color);
		graphics.lineStyle(1 ,  0x000000, 1);
		graphics.drawStar(pos.x, pos.y,this.p, this.r, this.rot);
		graphics.endFill();
	}
	
	this.removePickup = function(){
		World.remove(engine.world, this.body);
	}
}

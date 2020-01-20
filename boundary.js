function Boundary(x, y, w, h, a){
	var options = {
		isStatic: true,
		friction: 0.3,
		restitution: 1,
		angle: a
	}
	
	this.body = Bodies.rectangle(x, y, w, h, options);
	this.body.friction = 0;
	this.body.restitution = 0.1;
	this.w = w;
	this.h = h;
	this.a = a;
	World.add(engine.world, this.body);
	
	this.show = function(){
		var pos = this.body.position;
		var angle = this.body.angle;
		var vertices = this.body.vertices;
		
		// draw a shape
		graphics.beginFill(0xffd900);
		graphics.lineStyle(1 ,  0xFFFFFF, 1);
		graphics.moveTo(vertices[0].x, vertices[0].y);
		graphics.lineTo(vertices[1].x, vertices[1].y);
		graphics.lineTo(vertices[2].x, vertices[2].y);
		graphics.lineTo(vertices[3].x, vertices[3].y);
		graphics.lineTo(vertices[0].x, vertices[0].y);
		graphics.closePath();
		graphics.endFill();
	}
}
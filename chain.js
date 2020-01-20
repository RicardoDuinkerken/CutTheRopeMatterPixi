function Chain(x, y, links, linkWidth, linkHeight, density, stiffness){
	this.bodies = [];
	this.constraints = [];
	this.density = density;
	this.stiffness = stiffness;
	var options = {
		isStatic: true,
	}
	this.base = Bodies.rectangle(x, y, linkWidth, linkHeight, options);
	this.bodies.push(this.base);

	
	this.links = links - 1;
	
	for(var i = 0; i < this.links; i++ ){
		var body = Bodies.rectangle(x, this.bodies[i].position.y + linkHeight + linkHeight, linkWidth, linkHeight);
		var options ={
			bodyA: this.bodies[i],
			bodyB: body,
			length: linkHeight+2,
			stiffness:stiffness,
			density: density
		} 
		var constraint = Matter.Constraint.create(options);
		this.bodies.push(body);
		this.constraints.push(constraint);

		World.add(engine.world, constraint);
	}
	World.add(engine.world, this.bodies);
	this.bodies[this.links].label = 'lastLink';
	
	
		this.show = function(){
		var pos = this.base.position;
		var angle = this.base.angle;

		 
		for(var j = 0; j < this.bodies.length; j++){
		// draw a shape
		graphics.beginFill(0xffd900);
		graphics.lineStyle(1 ,  0xFFFFFF, 1);
		graphics.moveTo(this.bodies[j].vertices[0].x, this.bodies[j].vertices[0].y);
		graphics.lineTo(this.bodies[j].vertices[1].x, this.bodies[j].vertices[1].y);
		graphics.lineTo(this.bodies[j].vertices[2].x, this.bodies[j].vertices[2].y);
		graphics.lineTo(this.bodies[j].vertices[3].x, this.bodies[j].vertices[3].y);
		graphics.lineTo(this.bodies[j].vertices[0].x, this.bodies[j].vertices[0].y);
		graphics.closePath();
		graphics.endFill();
		}
	}
	
	this.addConstraint = function(body){
		if(body != null){
			this.base.position.y -= 42;
			var options ={
			bodyA: this.bodies[this.bodies.length-1],
			bodyB: body,
			length: linkHeight*3,
			stiffness:this.stiffness
			} 
			this.bodies.push(body);
			var constraint = Matter.Constraint.create(options);
			this.constraints.push(constraint);
			World.add(engine.world, constraint);
			
			for( var i = 0; i<this.constraints.length; i++){
				this.constraints[i].length -=2
			}
		}
	}
	
	this.removeConstraint = function(){

		if(this.bodies[this.links+1] != undefined){
			this.bodies.splice(this.links+1, 1);
			Matter.Composite.remove(engine.world, this.constraints[this.links], true);
			this.base.position.y += 42;
						for( var i = 0; i<this.constraints.length; i++){
				this.constraints[i].length +=2
			}
		}
			
	}
	
}
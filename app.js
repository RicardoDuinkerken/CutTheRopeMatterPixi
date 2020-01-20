 // Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
	Events = Matter.Events;
	
	const screenWidth = 800;
	const screenHeight = 600;
	const boxThickness = 20;
	var engine;
	var ball;
	var score = 0;
	var chains = [];
	var pickups = [];
	var boundaries = [];
	var balls = [];
	var graphics;
	
	const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#9C3737'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
	});

	const richText = new PIXI.Text('score = ' + score, style);
	
	const app = new PIXI.Application({width: screenWidth, screenHeight, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,});
	
	function setup()
	{
		app.stage.interactive = true;
		document.getElementById("display").appendChild(app.view);

		graphics = new PIXI.Graphics();
		app.stage.addChild(graphics);
		
		richText.x = 550;
		richText.y = 500;

		app.stage.addChild(richText);
		
		window.app = app;
		app.renderer.plugins.interaction.on('pointerdown', onPointerDown);
		
		engine = Engine.create();


		
		//Engine.run(engine);
		
		function collision(event){
			var pairs = event.pairs;
			for(var i = 0; i < pairs.length; i++){
				var bodyA = pairs[i].bodyA;
				var bodyB = pairs[i].bodyB;
				
				if(bodyA.label == 'pickUp' && bodyB.label == 'ball'){
					for(var i = 0; i < pickups.length; i++){
						if(pickups[i].body.id == bodyA.id ){
						pickups[i].removePickup();
					    pickups.splice(i,1);
						score+= 1;
						}
					}
				}
				if(bodyB.label == 'pickUp' && bodyA.label == 'ball'){
					for(var i = 0; i < pickups.length; i++){
						if(pickups[i].body.id == bodyB.id ){
						pickups[i].removePickup();
						pickups.splice(i,1);
						score += 1;
						}
					}
					
				}
				if(bodyA.label == 'ball' && bodyB.label == 'lastLink'){
					for(var i = 0; i < chains.length; i++){
						if(chains[i].bodies[chains[i].links].id == bodyB.id )
						chains[i].addConstraint(bodyA);
					}
				}
				if(bodyB.label == 'ball' && bodyA.label == 'lastLink'){
					for(var i = 0; i < chains.length; i++){
						if(chains[i].bodies[chains[i].links].id == bodyA.id )
						chains[i].addConstraint(bodyB);
					}
				}
			}
		}
		Events.on(engine, 'collisionStart', collision)
	}
	
	function createWorld(){
		ball = new Ball(50, 50, 20, 0x9C3737)
		
		chains.push(new Chain(400, 67, 7, 10, 10, 0.001, 0.9));
		chains.push(new Chain(620, 69, 8, 10, 10, 0.001, 0.5));
		chains.push(new Chain(200, 400, 8, 10, 10, 0.001, 0.8));
		chains.push(new Chain(450, 220, 5, 10, 10, 0.001, 0.8));
		chains.push(new Chain(225, 222, 9, 10, 10, 0.001, 0.9));
		chains.push(new Chain(134, 260, 9, 10, 10, 0.001, 0.9));
		pickups.push(new PickUp(500,160,5,10, 0xffffff));
		pickups.push(new PickUp(560,260,5,10, 0xffffff));
		pickups.push(new PickUp(110,400,5,10, 0xffffff));
		pickups.push(new PickUp(110,550,5,10, 0xffffff));
		
		boundaries.push(new Boundary(400, 0, screenWidth, boxThickness, 0));
		boundaries.push(new Boundary(400, 600, screenWidth, boxThickness, 0));
		boundaries.push(new Boundary(0, 300, boxThickness, screenHeight, 0));
		boundaries.push(new Boundary(800, 300, boxThickness, screenHeight, 0));
		boundaries.push(new Boundary(100, 140, 200, boxThickness, 0.361799));
		boundaries.push(new Boundary(250, 187, 100, boxThickness, 0.181799));
		boundaries.push(new Boundary(350, 193, 100, boxThickness, -0.1));
		boundaries.push(new Boundary(520, 195, 150, boxThickness, 0.1));
		boundaries.push(new Boundary(750, 200, 125, boxThickness, -0.283972));
		boundaries.push(new Boundary(530, 300, 150, boxThickness, -0.283972));
		boundaries.push(new Boundary(330, 350, 150, boxThickness, -0.203972));
		boundaries.push(new Boundary(500, 450, 800, boxThickness, -0.383972));
		boundaries.push(new Boundary(300, 525, 100, boxThickness, -0.283972));
		boundaries.push(new Boundary(278, 529, 100, boxThickness, -0.103972));
	}
	
	function gameLoop(timeStamp){
        draw();

        // Keep requesting new frames
        window.requestAnimationFrame(gameLoop);
    }
	
	function draw(){
		Engine.update(engine);
		graphics.clear();
		for(var i = 0; i < boundaries.length; i++){
			boundaries[i].show();
		}
		for(var i = 0; i <balls.length; i++){
			balls[i].show();
		}
		for(var i = 0; i <chains.length; i++){
			chains[i].show();
		}
		for(var i = 0; i <pickups.length; i++){
			pickups[i].show();
		}
		ball.show();	
		richText.text = "score = " + score;
	}
	
	function onPointerDown(event){
		//const newPosition = event.data.global;
		//balls.push(new Ball(newPosition.x, newPosition.y, 20, 0x9C3737));
		//chain.addConstraint(ball.body);
		for(var i = 0; i <chains.length; i++){
			chains[i].removeConstraint();
		}
	}

setup();
createWorld();

window.requestAnimationFrame(gameLoop);




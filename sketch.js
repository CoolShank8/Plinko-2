var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = []

var divisionHeight=300;
var score =0;

var turn = 0;

var count = 0

var GameState = "Start"

var particle;

var TakingTurn = false

var DivisionScores = []

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
    d = (new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
    divisions.push(d)
   }

   for (var k = 0; k < divisions.length; k++)
   {
     var RandNum = round(random(1,6))
      DivisionScores[k] = RandNum * 50
    }

    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    textSize(20)
    stroke("red")
    
}
 

function draw() {
  background("black");
  text("Score: " + score, 75,150)

  text("You have " + (5 - count) + " turns left!", 200, 150)

 //text("Score : "+score,20,30);
  Engine.update(engine);
 
  for (var i = 0; i < DivisionScores.length; i++) 
  {
    var XPosition = divisions[i].body.position.x
    var OffSet = 20

    var CalculatedX = XPosition + OffSet

    text(DivisionScores[i], CalculatedX, 600)
  }


   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   
   if (particle != null)
   {
     particle.display()

     if (particle.body.position.y >760)
     {
       TakingTurn = false
       console.log ("hello")

       console.log(DivisionScores.length)

      for (var i = 0; i < DivisionScores.length; i ++)
      {

        var currentDivision = divisions[i]
        var nextDivision = divisions[i + 1]

        var MinX = currentDivision.x
        var MaxX = nextDivision.x 

        console.log("MINIMUMX is :" + MinX)
        console.log("MAX x is " + MaxX)


        if (particle.body.position.x > MinX && particle.body.position.x < MaxX)
        {
          console.log("made the particle null")
          GivePoints(DivisionScores[i])
          break;
        }
      }
     }
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
}

function mousePressed()
{
  console.log("mouse pressed")
 if (GameState !== "End" && TakingTurn ===false)
 {
   console.log(mouseX)
  count++;
  particle =  new Particle(mouseX, 20 , 10)
  console.log(particle)
  TakingTurn = true
  
 }

}

function GivePoints(PointsToGive)
{
  score = score + PointsToGive;
  particle = null
  if (count >= 5)
  {
    GameState = "End"
  }
}
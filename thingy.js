//Initialisation

//Object to rotate is called CamTarget

var CamTarget = PhysicalObject();
CamTarget.motion.position = [0, 0, 0];
//Maybe change this to actual starting position (at time 0)?
CamTarget.Name = "CamTarget";

CamTarget.switches.motionEnabled = false;
CamTarget.switches.accelerationEnabled = false;


var currTime = 0;

var cos23dot5 = Math.cos((23.5 / 360) * 2 * Math.PI);
//About 0.91706007438512404 (for testing)
var twoPiOver21900 = 2 * Math.PI / 21900; //Assuming 21900 is the number of times update() is called per year
//About 0.00028690343868399 (for testing)

//Inside update()

currTime++;

//Distance of the object is targetDistance (may have to be greater than radius of the earth)


//Currently rotates around origin
var targetPos[3];
targetPos[0] = targetDistance * cos23dot5 * Math.sin(currTime * twoPiOver21900);
targetPos[1] = targetDistance * Math.cos(currTime * twoPiOver21900);
targetPos[2] = Math.sqrt(sqr(targetDistance) - sqr(targetPos[0]));

//Now translate to earth
CamTarget.motion.position = addVector(targetPos, Earth.motion.position);

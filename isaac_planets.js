// Planet positions and velocities taken from JPL's HORIZONS system,
// for April 09, 2012, 00:00:00.0000CT.
// Note that X, Y, Z in Three.js correspond to Y, X, Z in HORIZONS.
// The Sun.
var Sun = new ISAAC.OrbitalBody(
	{
		name : "Sun", 
		position : [0, 0, 0], 
		mass : 1.988435e24, 
		isStar : true, 
		motionEnabled : true, 
		accelerationEnabled : true
	});

// The Earth.
var Earth = new ISAAC.OrbitalBody(
	{
		name : "Earth",
		position : [-49.70175623515072, -141.3464397912099, 1.845629910630098e-3],
		mass : 5.9721986e18,
		velocity : [-2.820546804750964e-5, 9.387467194099132e-6, -3.335489234220996e-10],
		motionEnabled : true, 
		accelerationEnabled : true
	});

// Mars.
var Mars = new ISAAC.OrbitalBody(
	{

	});
Mars.motion.position = [2.607918972403293, -247.0577964253138, 6.120960274943644];
Mars.physical.mass = 6.5185e17;
Mars.motion.velocity = [-2.216028295316947e-5, 6.507888620275963e-7, -4.802973165012580e-7];
Mars.Name = "Mars";

Mars.switches.motionEnabled = true;
Mars.switches.accelerationEnabled = true;

// Mercury.
var Mercury = new ISAAC.OrbitalBody(
	{
		name : "Mercury",
		position : [-59.83881593, -34.34126305, -1.738227286],
		mass : 3.3022e17,
		velocity : [-2.190935367e-5, 3.242607698e-5, -4.765349366e-6],
		motionEnabled : true,
		accelerationEnabled : true
	});

// Jupiter.
var Jupiter = new ISAAC.OrbitalBody(
	{
		name : "Jupiter",
		position : [571.0765569421500, 480.9176848793924, -13.13349118484296],
		mass : 1.8988e21,
		velocity : [9.045517267735690e-6, -1.016103900367553e-5, 1.897925792649849e-7],
		motionEnabled : true,
		accelerationEnabled : true
	});

// Neptune.
var Neptune = new ISAAC.OrbitalBody(
	{
		name : "Neptune",
		position : [-2193.945531342488, 3914.732947116928, -45.02107870865629],
		mass : 1.0278e20,
		velocity : [4.780319271610741e-6, 2.613881670696835e-6, -1.586835000701678e-7],
		motionEnabled : true,
		accelerationEnabled : true
	});

// Venus.
var Venus = new ISAAC.OrbitalBody(
	{
		name : "Venus",
		position : [32.62303974857563, -102.3178380016565, 6.352081275507866],
		mass : 4.869e18,
		velocity : [-3.352572735644723e-5, -1.080589728829473e-5, 1.643058486842552e-7],
		motionEnabled : true,
		accelerationEnabled : true
	});

// Uranus.
var Uranus = new ISAAC.OrbitalBody(
	{
		name : "Uranus",
		position : [235.9479785280531, 2993.163750777438, -37.89556426125482],
		mass : 8.6625e19,
		velocity : [6.477979332815045e-6, -5.930129454709614e-7, 3.178365529507968e-8],
		motionEnabled : true,
		accelerationEnabled : true
	});

// Saturn.
var Saturn = new ISAAC.OrbitalBody(
	{
		name : "Saturn",
		position : [-631.8980859148376, -1308.125257452327, 63.06897677571023],
		mass : 5.685e20,
		velocity : [-8.711916465865464e-6, 3.671844960056266e-6, 4.785296340228841e-9],
		motionEnabled : true,
		accelerationEnabled : true
	});

// Pluto.
var Pluto = new ISAAC.OrbitalBody(
	{
		name : "Pluto",
		position : [-4764.888577948751, 638.1080671989861, 325.4419510356392],
		mass : 1.314e16,
		velocity : [-3.403729996552767e-7, 5.476987352349563e-6, -1.528481974366561e-6],
		motionEnabled : true,
		accelerationEnabled : true
	});
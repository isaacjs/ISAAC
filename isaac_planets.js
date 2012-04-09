// Planet positions and velocities taken from JPL's HORIZONS system,
// for April 09, 2012, 00:00:00.0000CT.
// Note that X, Y, Z in Three.js correspond to Y, X, Z in HORIZONS.
// The Sun.
var Sun = PhysicalObject();
Sun.motion.position = [0, 0, 0];
Sun.physical.mass = 1.988435e24;
Sun.Name = "Sun";

Sun.switches.motionEnabled = true;
Sun.switches.accelerationEnabled = true;

// The Earth.
var Earth = PhysicalObject();
Earth.physical.mass = 5.9721986e18;
Earth.motion.position = [-49.70175623515072, -141.3464397912099, 1.845629910630098e-3];
Earth.motion.velocity = [-2.820546804750964e-5, 9.387467194099132e-6, -3.335489234220996e-10];
Earth.Name = "Earth";

Earth.switches.motionEnabled = true;
Earth.switches.accelerationEnabled = true;

// Mars.
var Mars = PhysicalObject();
Mars.motion.position = [2.607918972403293, -247.0577964253138, 6.120960274943644];
Mars.physical.mass = 6.5185e17;
Mars.motion.velocity = [-2.216028295316947e-5, 6.507888620275963e-7, -4.802973165012580e-7];
Mars.Name = "Mars";

Mars.switches.motionEnabled = true;
Mars.switches.accelerationEnabled = true;

// Mercury.
var Mercury = PhysicalObject();
Mercury.motion.position = [-59.83881593, -34.34126305, -1.738227286];
Mercury.physical.mass = 3.3022e17;
Mercury.motion.velocity = [-2.190935367e-5, 3.242607698e-5, -4.765349366e-6];
Mercury.Name = "Mercury";

Mercury.switches.motionEnabled = true;
Mercury.switches.accelerationEnabled = true;

// Jupiter.
var Jupiter = PhysicalObject();
Jupiter.motion.position = [571.0765569421500, 480.9176848793924, -13.13349118484296];
Jupiter.physical.mass = 1.8988e21;
Jupiter.motion.velocity = [9.045517267735690e-6, -1.016103900367553e-5, 1.897925792649849e-7];
Jupiter.Name = "Jupiter";

Jupiter.switches.motionEnabled = true;
Jupiter.switches.accelerationEnabled = true;

// Neptune.
var Neptune = PhysicalObject();
Neptune.motion.position = [-2193.945531342488, 3914.732947116928, -45.02107870865629];
Neptune.physical.mass = 1.0278e20;
Neptune.motion.velocity = [4.780319271610741e-6, 2.613881670696835e-6, -1.586835000701678e-7];
Neptune.Name = "Neptune";

Neptune.switches.motionEnabled = true;
Neptune.switches.accelerationEnabled = true;

// Venus.
var Venus = PhysicalObject();
Venus.motion.position = [32.62303974857563, -102.3178380016565, 6.352081275507866];
Venus.physical.mass = 4.869e18;
Venus.motion.velocity = [-3.352572735644723e-5, -1.080589728829473e-5, 1.643058486842552e-7];
Venus.Name = "Venus";

Venus.switches.motionEnabled = true;
Venus.switches.accelerationEnabled = true;

// Uranus.
var Uranus = PhysicalObject();
Uranus.motion.position = [235.9479785280531, 2993.163750777438, -37.89556426125482];
Uranus.physical.mass = 8.6625e19;
Uranus.motion.velocity = [6.477979332815045e-6, -5.930129454709614e-7, 3.178365529507968e-8];
Uranus.Name = "Uranus";

Uranus.switches.motionEnabled = true;
Uranus.switches.accelerationEnabled = true;

// Saturn.
var Saturn = PhysicalObject();
Saturn.motion.position = [-631.8980859148376, -1308.125257452327, 63.06897677571023];
Saturn.physical.mass = 5.685e20;
Saturn.motion.velocity = [-8.711916465865464e-6, 3.671844960056266e-6, 4.785296340228841e-9];
Saturn.Name = "Saturn";

Saturn.switches.motionEnabled = true;
Saturn.switches.accelerationEnabled = true;

// Pluto.
var Pluto = PhysicalObject();
Pluto.motion.position = [-4764.888577948751, 638.1080671989861, 325.4419510356392];
Pluto.physical.mass = 1.314e16;
Pluto.motion.velocity = [-3.403729996552767e-7, 5.476987352349563e-6, -1.528481974366561e-6];
Pluto.Name = "Pluto";

Pluto.switches.motionEnabled = true;
Pluto.switches.accelerationEnabled = true;
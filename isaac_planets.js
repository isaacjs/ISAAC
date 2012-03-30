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
Earth.motion.position = [149.598261, 0, 0];
Earth.motion.velocity = [0, 2.929e-5, 0];
Earth.Name = "Earth";

Earth.switches.motionEnabled = true;
Earth.switches.accelerationEnabled = true;

// Mars.
var Mars = PhysicalObject();
Mars.motion.position = [277.939100, 0, 0];
Mars.physical.mass = 6.5185e17;
Mars.motion.velocity = [0, 2.408e-5, 0];
Mars.Name = "Mars";

Mars.switches.motionEnabled = true;
Mars.switches.accelerationEnabled = true;

// Mercury.
var Mercury = PhysicalObject();
Mercury.motion.position = [-57.90918, 0, 0];
Mercury.physical.mass = 3.3022e17;
Mercury.motion.velocity = [0, -4.74e-5, 0];
Mercury.Name = "Mercury";

Mercury.switches.motionEnabled = true;
Mercury.switches.accelerationEnabled = true;

// Jupiter.
var Jupiter = PhysicalObject();
Jupiter.motion.position = [-778.41203, 0, 0];
Jupiter.physical.mass = 1.8988e21;
Jupiter.motion.velocity = [0, -1.3e-5, 0];
Jupiter.Name = "Jupiter";

Jupiter.switches.motionEnabled = true;
Jupiter.switches.accelerationEnabled = true;

// Neptune.
var Neptune = PhysicalObject();
Neptune.motion.position = [4503.443661, 0, 0];
Neptune.physical.mass = 1.0278e20;
Neptune.motion.velocity = [0, 5.43e-6, 0];
Neptune.Name = "Neptune";

Neptune.switches.motionEnabled = true;
Neptune.switches.accelerationEnabled = true;

// Venus.
var Venus = PhysicalObject();
Venus.motion.position = [-108.20893, 0, 0];
Venus.physical.mass = 4.869e18;
Venus.motion.velocity = [0, -3.5e-5, 0];
Venus.Name = "Venus";

Venus.switches.motionEnabled = true;
Venus.switches.accelerationEnabled = true;

// Uranus.
var Uranus = PhysicalObject();
Uranus.motion.position = [-2870.97222, 0, 0];
Uranus.physical.mass = 8.6625e19;
Uranus.motion.velocity = [0, -6.8e-6, 0];
Uranus.Name = "Uranus";

Uranus.switches.motionEnabled = true;
Uranus.switches.accelerationEnabled = true;

// Saturn.
var Saturn = PhysicalObject();
Saturn.motion.position = [1426.72541, 0, 0];
Saturn.physical.mass = 5.685e20;
Saturn.motion.velocity = [0, 9.64e-6, 0];
Saturn.Name = "Saturn";

Saturn.switches.motionEnabled = true;
Saturn.switches.accelerationEnabled = true;

// Pluto.
var Pluto = PhysicalObject();
Pluto.motion.position = [5906.37627, 0, 0];
Pluto.physical.mass = 1.314e16;
Pluto.motion.velocity = [0, 4.67e-6, 0];
Pluto.Name = "Pluto";

Pluto.switches.motionEnabled = true;
Pluto.switches.accelerationEnabled = true;
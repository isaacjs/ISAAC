// The Sun.
var Sun = PhysicalObject();
Sun.motion.position = [0, 0, 0];
Sun.physical.mass = 1.988435e24;
Sun.Name = "Sun";
Sun.config['Mass Multiplier'] = 1;

Sun.switches.motionEnabled = true;
Sun.switches.accelerationEnabled = true;

// The Earth.
var Earth = PhysicalObject();
Earth.physical.mass = 5.9721986e18;
Earth.motion.position = [149.598261, 0, 0];
Earth.motion.velocity = [0, 2.929e-5, 0];
Earth.Name = "Earth";
Earth.config['Mass Multiplier'] = 1;

Earth.switches.motionEnabled = true;
Earth.switches.accelerationEnabled = true;

// Mars.
var Mars = PhysicalObject();
Mars.motion.position = [277.939100, 0, 0];
Mars.physical.mass = 6.5185e17;
Mars.motion.velocity = [0, 2.408e-5, 0];
Mars.Name = "Mars";
Mars.config['Mass Multiplier'] = 1;

Mars.switches.motionEnabled = true;
Mars.switches.accelerationEnabled = true;

// Mercury.
var Mercury = PhysicalObject();
Mercury.motion.position = [-57.90918, 0, 0];
Mercury.physical.mass = 3.3022e17;
Mercury.motion.velocity = [0, -4.74e-5, 0];
Mercury.Name = "Mercury";
Mercury.config['Mass Multiplier'] = 1;

Mercury.switches.motionEnabled = true;
Mercury.switches.accelerationEnabled = true;

// Jupiter.
var Jupiter = PhysicalObject();
Jupiter.motion.position = [-778.41203, 0, 0];
Jupiter.physical.mass = 1.8988e21;
Jupiter.motion.velocity = [0, -1.3e-5, 0];
Jupiter.Name = "Jupiter";
Jupiter.config['Mass Multiplier'] = 1;

Jupiter.switches.motionEnabled = true;
Jupiter.switches.accelerationEnabled = true;

// Neptune.
var Neptune = PhysicalObject();
Neptune.motion.position = [4503.443661, 0, 0];
Neptune.physical.mass = 1.0278e20;
Neptune.motion.velocity = [0, 5.43e-6, 0];
Neptune.Name = "Neptune";
Neptune.config['Mass Multiplier'] = 1;

Neptune.switches.motionEnabled = true;
Neptune.switches.accelerationEnabled = true;
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

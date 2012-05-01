The stable ('master') release of ISAAC can be found [here](http://isaac.ayulin.net).

## What is ISAAC?
ISAAC is a star system simulator, with full n-body gravity calculations between orbital bodies. Star systems are defined through a set of specifications given as JSON.

Users can adjust values such as the Gravitational Constant and the masses of each individual body to see how their orbits are affected.

## What exactly does ISAAC do?
ISAAC takes in a JSON object specifying the star system to simulate, creates the orbital bodies laid out in that specification, and simulates the way in which they interact with one another. ISAAC also creates a graphical representation of the star system (powered by [Three.js](http://mrdoob.github.com/three.js/)), and provides a UI through which objects can be manipulated (using [dat.GUI](http://code.google.com/p/dat-gui/)).

## How are star systems specified?
Full details can be found in `isaac_simulation`.
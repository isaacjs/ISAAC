The stable (`master`) release of ISAAC can be found [here](http://isaac.ayulin.net).  
The latest functional `development` branch version can be found [here](http://isaac.ayulin.net/edge.html).

## What is ISAAC?
ISAAC is a star system simulator, with full n-body gravity calculations between orbital bodies. Star systems are defined through a set of specifications given as JSON.

Users can adjust values such as the Gravitational Constant and the masses of each individual body to see how their orbits are affected.

## What exactly does ISAAC do?
ISAAC takes in a JSON object specifying the star system to simulate, creates the orbital bodies laid out in that specification, and simulates the way in which they interact with one another. ISAAC also creates a graphical representation of the star system (powered by [Three.js](http://mrdoob.github.com/three.js/)), and provides a UI through which objects can be manipulated (using [dat.GUI](http://code.google.com/p/dat-gui/)).

## How are star systems specified?
Full details can be found in `isaac_simulation`.

## What can I do with ISAAC?
In order of increasing difficulty (and coding required):

1. Simulate a star system from a basic set of information, specified in JSON.
2. Create a new sandbox tool powered by ISAAC's simulation and graphics, with minor changes to the UI.
3. Completely rip out the graphical layer (replacing it with another solution), while keeping the same underlying simulation systems and UI.
4. Create an entirely new application altogether, with a custom UI and new graphics, using the same underlying simulation systems.

## New in Release 2
* Back-end: Updated to Three.js r49.
* Back-end: Support for scenario reset.
* Camera: Added inertia. Possibly inspired by EVE Online ship spinning.
* Camera: "Fly-by" animation on initialisation.
* Camera: Smooth transitions between planets. Old "teleporting" behaviour can be toggled in the UI.
* Graphics: Added ability to display Velocity and Acceleration vectors.
* UI: Added elements to toggle camera transitions, Velocity/Acceleration vectors, and to reset the simulation.
* UI: Changed default font to Open Sans.
* UI: Moving the mouse over a body now displays a label containing that body's name.
* UI: Switching tabs would pause the simulation (as it isn't visible). The document title now updates to reflect this.
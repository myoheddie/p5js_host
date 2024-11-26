let angle = 0;
let speedFactors = [1, 1.5, 2]; // Different speeds for each electron

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();

 // Attach this canvas to the div with ID "p5-container-1"
    canvas.parent('p5-container-1');
}

function draw() {
  background(0, 0); // Transparent background

  // Rotate the entire atomic structure in 3D space
  rotateX(angle * 0.3);
  rotateY(angle * 0.3);

  // Draw the solid green nucleus at the center
  push();
  fill(77, 237, 184); // Solid green color #4DEDB8 for the nucleus
  sphere(45); // Nucleus size
  pop();

  // Draw electron orbits and electrons with tapered stroke trail
  for (let i = 0; i < 3; i++) { // Increased to 3 electrons
    push();
    rotateY(TWO_PI * i / 3); // Uniform distribution of the orbits
    let orbitRadius = 100 + i * 40; // Increasing orbit radius
    let electronSize = 10 + i * 10; // Increasing electron size
    drawOrbitAndElectron(orbitRadius, electronSize, speedFactors[i]); // Pass speed factor
    pop();
  }

  angle += 0.01 * 2.5; // Base speed for structure rotation
}

function drawOrbitAndElectron(orbitRadius, electronSize, speedFactor) {
  // Draw the orbit as a smooth, low-poly path
  push();
  rotateZ(angle); // Rotate to create the orbital motion
  stroke(77, 237, 184, 150); // Green with transparency for orbit
  noFill();

  // Use less polygons by creating a simple circular path with lower resolution
  let resolution = 100; // Reduced the resolution for a smoother path with fewer points
  beginShape();
  for (let i = 0; i < resolution; i++) {
    let theta = map(i, 0, resolution, 0, TWO_PI); // Evenly distribute points around the circle
    let x = orbitRadius * cos(theta);
    let y = orbitRadius * sin(theta);
    vertex(x, y);
  }
  endShape(CLOSE); // Close the path for the orbit
  drawElectronWithTrail(orbitRadius, electronSize, speedFactor); // Draw electron with tapered trail
  pop();
}

function drawElectronWithTrail(orbitRadius, electronSize, speedFactor) {
  let trailLength = 195; // Reduced trail length for smoother motion
  let trailStep = 0.02; // Larger step size for smoother trail

  // Draw the trail by creating fewer, more spaced-out copies of the electron
  for (let i = 0; i < trailLength; i++) {
    push();
    let currentAngle = angle * speedFactor - (i * trailStep); // Offset for smooth trail with speed factor
    rotateZ(currentAngle); // Rotate to create the orbital motion
    translate(orbitRadius, 0, 0); // Position electron on circular orbit

    // Calculate the stroke weight based on the trail index (tapering effect)
    let trailWeight = lerp(electronSize, 0, i / trailLength);
    strokeWeight(trailWeight); // Apply tapering stroke width
    stroke(77, 237, 184, map(i, 0, trailLength, 255, 0)); // Fade the trail as it moves
    point(0, 0); // Draw a point at each trail position
    pop();
  }

  // Draw the main electron
  push();
  rotateZ(angle * speedFactor); // Electron rotates with orbit at its speed
  translate(orbitRadius, 0, 0); // Position electron on circular orbit
  fill(77, 237, 184); // Green electron
  sphere(electronSize); // Electron size
  pop();
}

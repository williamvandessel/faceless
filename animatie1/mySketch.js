// Digitale Ouroborossen — sneller zelf-uitwissen + meer grote ∞-vormen

let ouroborossen = [];
let totalOuro = 180;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('monospace');
  textAlign(CENTER, CENTER);
  textSize(16);
  noStroke();
  fill(255);
  background(0);

  for (let i = 0; i < totalOuro; i++) {
    ouroborossen.push(new Ouroboros());
  }
}

function draw() {
  background(0, 65); // meer fade → minder langdurige sporen
  for (let o of ouroborossen) {
    o.update();
    o.display();
  }
}

class Ouroboros {
  constructor() {
    this.t = random(TWO_PI);
    this.speed = random(0.05, 0.09);

    // 🔥 kortere trails → sneller zelf-uitwissen
    this.trail = [];
    this.trailLength = int(random(50, 120)); // was 120–240 → veel korter

    this.fadeCycle = random(TWO_PI);

    // 🔥 sneller fading → sporen verdwijnen sneller
    this.fadeSpeed = random(0.015, 0.025); // was 0.006–0.012

    this.spacing = int(random(1, 3));

    // --------------------------------------------------------
    // 🔥 NIEUWE GROOTTEVERDELING
    // 35% klein, 45% medium, 20% groot
    // --------------------------------------------------------
    const r = random();
    let scaleFactor;

    if (r < 0.35) scaleFactor = random(0.04, 0.07);       // klein → duidelijk zichtbaar
    else if (r < 0.80) scaleFactor = random(0.07, 0.12);  // medium → groter dan vroeger
    else scaleFactor = random(0.12, 0.22);                // groot → tot 22% van schermhoogte

    this.scale = scaleFactor * min(width, height);

    // transparantie hoger → veel minder overlappen
    this.baseAlpha = random(60, 120);

    // marge per grootte
    const margin = this.scale * 1.5;

    // veilige startpositie
    this.cx = random(margin, width - margin);
    this.cy = random(margin, height - margin);

    // zachte drift
    this.vx = random(-0.08, 0.08);
    this.vy = random(-0.06, 0.06);

    this.phase = random(TWO_PI);
  }

  update() {
    const a = this.scale;
    const x = a * sin(this.t + this.phase) + this.cx;
    const y = (a / 2) * sin(2 * (this.t + this.phase)) + this.cy;

    // spoor genereren
    if (frameCount % this.spacing === 0) {
      this.trail.push({ x, y, bit: random() > 0.5 ? "1" : "0" });
      if (this.trail.length > this.trailLength) this.trail.shift();
    }

    // drift
    this.cx += this.vx;
    this.cy += this.vy;

    // reflectie met marge
    const margin = this.scale * 1.5;
    if (this.cx < margin || this.cx > width - margin) this.vx *= -1;
    if (this.cy < margin || this.cy > height - margin) this.vy *= -1;

    this.t += this.speed;
    this.fadeCycle += this.fadeSpeed;
  }

  display() {
    // fade-out wordt sterker door snelle fadeCycle
    const fadeFactor = map(sin(this.fadeCycle), -1, 1, 0.15, 1.0);

    for (let i = 0; i < this.trail.length; i++) {
      const c = this.trail[i];
      let alpha = map(i, 0, this.trail.length - 1, 0, this.baseAlpha);

      alpha *= fadeFactor;
      fill(255, alpha);
      text(c.bit, c.x, c.y);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

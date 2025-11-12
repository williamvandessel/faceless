// Digitale Ouroborossen — 100 vrij zwevende ∞-vormen van 1'en en 0'en
// Nu met snellere rotatie per lus en snellere vulling

let ouroborossen = [];
let totalOuro = 100;

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
  background(0, 85);
  for (let o of ouroborossen) {
    o.update();
    o.display();
  }
}

// ----------------------------
// Ouroboros Class
// ----------------------------
class Ouroboros {
  constructor() {
    this.t = random(TWO_PI);
    this.speed = random(0.04, 0.08); // 🔥 veel sneller: hele lus in enkele seconden
    this.trail = [];
    this.trailLength = int(random(100, 200));
    this.fadeCycle = random(TWO_PI);
    this.fadeSpeed = random(0.004, 0.008);
    this.spacing = int(random(1, 3)); // 🔥 sneller vullen

    this.cx = random(width);
    this.cy = random(height);
    this.vx = random(-0.2, 0.2);
    this.vy = random(-0.15, 0.15);
    this.scale = random(0.05, 0.12) * min(width, height);
    this.baseAlpha = random(140, 255);
    this.phase = random(TWO_PI);
  }

  update() {
    // echte ∞-vorm (lemniscate)
    const a = this.scale;
    const x = a * sin(this.t + this.phase) + this.cx;
    const y = (a / 2) * sin(2 * (this.t + this.phase)) + this.cy;

    if (frameCount % this.spacing === 0) {
      const bit = random() > 0.5 ? '1' : '0';
      this.trail.push({ x, y, bit });
      if (this.trail.length > this.trailLength) this.trail.shift();
    }

    // driftbeweging
    this.cx += this.vx;
    this.cy += this.vy;
    if (this.cx < 0 || this.cx > width) this.vx *= -1;
    if (this.cy < 0 || this.cy > height) this.vy *= -1;

    this.t += this.speed;
    this.fadeCycle += this.fadeSpeed;
  }

  display() {
    for (let i = 0; i < this.trail.length; i++) {
      const c = this.trail[i];
      const alpha = map(i, 0, this.trail.length - 1, 0, this.baseAlpha);
      const fadeAlpha = map(sin(this.fadeCycle), -1, 1, 0.6, 1);
      fill(255, alpha * fadeAlpha);
      text(c.bit, c.x, c.y);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

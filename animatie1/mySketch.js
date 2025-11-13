// Digitale Ouroborossen — Balanced Safe Margin Edition

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
  background(0, 65);
  for (let o of ouroborossen) {
    o.update();
    o.display();
  }
}

class Ouroboros {
  constructor() {
    this.t = random(TWO_PI);
    this.speed = random(0.05, 0.09);

    this.trail = [];
    this.trailLength = int(random(50, 120));

    this.fadeCycle = random(TWO_PI);
    this.fadeSpeed = random(0.015, 0.025);

    this.spacing = int(random(1, 3));

    // size categories
    const r = random();
    if (r < 0.35) {
      this.scale = random(0.04, 0.07) * min(width, height); // small
      this.marginMultiplier = 1.2;
    } else if (r < 0.80) {
      this.scale = random(0.07, 0.12) * min(width, height); // medium
      this.marginMultiplier = 1.7;
    } else {
      this.scale = random(0.12, 0.22) * min(width, height); // large
      this.marginMultiplier = 2.2;
    }

    this.baseAlpha = random(60, 120);

    // balanced margin
    this.margin = this.scale * this.marginMultiplier;

    this.cx = random(this.margin, width - this.margin);
    this.cy = random(this.margin, height - this.margin);

    this.vx = random(-0.08, 0.08);
    this.vy = random(-0.06, 0.06);

    this.phase = random(TWO_PI);
  }

  update() {
    const a = this.scale;

    const x = a * sin(this.t + this.phase) + this.cx;
    const y = (a / 2) * sin(2 * (this.t + this.phase)) + this.cy;

    if (frameCount % this.spacing === 0) {
      this.trail.push({ x, y, bit: random() > 0.5 ? "1" : "0" });
      if (this.trail.length > this.trailLength) this.trail.shift();
    }

    this.cx += this.vx;
    this.cy += this.vy;

    // margin bounce
    if (this.cx < this.margin) {
      this.cx = this.margin;
      this.vx *= -1;
    }
    if (this.cx > width - this.margin) {
      this.cx = width - this.margin;
      this.vx *= -1;
    }

    if (this.cy < this.margin) {
      this.cy = this.margin;
      this.vy *= -1;
    }
    if (this.cy > height - this.margin) {
      this.cy = height - this.margin;
      this.vy *= -1;
    }

    this.t += this.speed;
    this.fadeCycle += this.fadeSpeed;
  }

  display() {
    const fadeFactor = map(sin(this.fadeCycle), -1, 1, 0.2, 1);

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

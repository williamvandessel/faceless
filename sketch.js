let menuItems = [
  { label: "Animatie 1", link: "animatie1/" },
  { label: "Animatie 2", link: "animatie2/" },
  { label: "Animatie 3", link: "animatie3/" },
  { label: "Animatie 4", link: "animatie4/" },
  { label: "Animatie 5", link: "animatie5/" },
  { label: "Animatie 6", link: "animatie6/" },
  { label: "Animatie 7", link: "animatie7/" },
  { label: "Animatie 8", link: "animatie8/" },
  { label: "Animatie 9", link: "animatie9/" },
  { label: "Animatie 10", link: "animatie10/" }
];

let regions = [];
let sizeUnit;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont("monospace");
  sizeUnit = height * 0.08;
}

function draw() {
  background(0);
  regions = [];

  let startY = height * 0.25;
  let lineH = sizeUnit * 1.4;

  // Glow layer
  for (let g = 15; g > 0; g--) {
    fill(255, 80 / g);
    noStroke();
    for (let i = 0; i < menuItems.length; i++) {
      textSize(sizeUnit * 1.2 + g * 0.8);
      text(menuItems[i].label, width / 2, startY + i * lineH);
    }
  }

  // Main text
  fill(255);
  noStroke();
  textSize(sizeUnit * 1.2);

  for (let i = 0; i < menuItems.length; i++) {
    let txt = menuItems[i].label;
    let x = width / 2;
    let y = startY + i * lineH;

    text(txt, x, y);

    let w = textWidth(txt);
    regions.push({
      link: menuItems[i].link,
      x1: x - w / 2,
      x2: x + w / 2,
      y1: y - sizeUnit * 0.6,
      y2: y + sizeUnit * 0.6
    });
  }
}

function mousePressed() {
  for (let r of regions) {
    if (mouseX > r.x1 && mouseX < r.x2 && mouseY > r.y1 && mouseY < r.y2) {
      window.open(r.link, "_self");
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sizeUnit = height * 0.08;
}

class moving_point {
  constructor(x, y, dest_x, dest_y, color) {
    this.x = x;
    this.y = y;
    this.dest_x = dest_x;
    this.dest_y = dest_y;
    this.color = color;
    this.size = 1;
  }
}

class color {
	constructor(r, g, b){
		this.r = r;
		this.g = g;
		this.b = b;
	}
}

const screen_width = 600;
const screen_height = 600;
var plateau = [];
const n = 500;
const size = 7;
const maximum_size = 2.5;
const minimum_size = 2;
var offsetX;
var offsetY;
var newpoint;
var x = 0;
var y = 0;
var img;


function preload() {
	img = loadImage('https://source.unsplash.com/random');
	let app = document.getElementById("app");
	app.style.display = "none";
}

function init(){
	clear();
	plateau = [];
	for (var i = 0; i < n; i++){
		let startX = Math.floor(Math.random() * screen_width);
		let startY = Math.floor(Math.random() * screen_height);
		let posX = Math.floor(Math.random() * screen_width);
		let posY = Math.floor(Math.random() * screen_height);
		newPoint = new moving_point(
			startX,
			startY,
			posX,
			posY,
			img.get(posX+offsetX,posY+offsetY)
		);
		plateau.push(newPoint)
	}
}

function average_color_as_background(){
	let totalR = 0;
	let totalG = 0;
	let totalB = 0;
	let n = 25;

	for (let i = 0; i < n; i++){
	    let x = random(screen_width);
	    let y = random(screen_height);
	    let c = img.get(x,y);
	    totalR += c[0];
	    totalG += c[1];
	    totalB += c[2];
	}
	
	totalR = Math.floor(totalR/n)
	totalG = Math.floor(totalG/n)
	totalB = Math.floor(totalB/n)
	return new color(totalR,totalG,totalB)

}

function componentToHex(c) {
	let hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return '#' + componentToHex(r)+componentToHex(g)+componentToHex(b);
}

function reset() {
	for (var i = 0; i < n; i++) {
		var dest_x = Math.floor(Math.random() * screen_width);
		var dest_y = Math.floor(Math.random() * screen_height);
		plateau[i].dest_x = dest_x;
		plateau[i].dest_y = dest_y;
		plateau[i].color = img.get(dest_x+offsetX,dest_y+offsetY);
	}
}


function setup() {

  if (img.width > img.height){
    img.resize(0,screen_height);
  } else {
    img.resize(screen_width,0);
  }
  offsetX = (img.width-screen_width)/2;
  offsetY = (img.height-screen_height)/2;
  let y = img.height/screen_height;
  let x = img.width/screen_width;
  let color1;
  let color2;
  let color3;
  img.loadPixels();

  color1 = average_color_as_background()
  color2 = average_color_as_background()
  color3 = average_color_as_background()

  let c1 = rgbToHex(color1.r,color1.g,color1.b)
  let c2 = rgbToHex(color2.r,color2.g,color2.b)
  let c3 = rgbToHex(color3.r,color3.g,color3.b)
  document.body.style.background = "linear-gradient(145deg, "+c1+" 0%, "+c2+" 75%, "+c3+" 100%)";

  let app = document.getElementById("app");
  app.style.display = "block";

  createCanvas(screen_width,screen_height);
  init();
  reset();
  background(c1);

}


function draw() {
  strokeWeight(size);
  for (var i = 0; i <plateau.length; i++) {
    
    let size = (maximum_size/abs(plateau[i].dest_x-plateau[i].x))
    if (size > minimum_size)
    		plateau[i].size = size
	  else
		plateau[i].size = minimum_size
    strokeWeight(plateau[i].size)
    stroke(plateau[i].color);
    circle(plateau[i].x, plateau[i].y,size);
    plateau[i].x += (plateau[i].dest_x-plateau[i].x)*0.2;
    plateau[i].y += (plateau[i].dest_y-plateau[i].y)*0.2;

	if (abs(plateau[i].dest_x - plateau[i].x) <= 0.3){
		let posX = Math.floor(Math.random() * screen_width);
		let posY = Math.floor(Math.random() * screen_height);
		plateau[i].dest_x = posX
		plateau[i].dest_y = posY
		plateau[i].x = posX -2
		plateau[i].y = posY -2
		plateau[i].color = img.get(plateau[i].dest_x + offsetX, plateau[i].dest_y+offsetY)
	}
  }
}

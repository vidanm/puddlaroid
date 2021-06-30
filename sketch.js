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

const screen_width = 400;
const screen_height = 810;
var plateau = [];
const n = 500;
const size = 7;
const maximum_size = 4;
const minimum_size = 2;
var newpoint;
var x = 0;
var y = 0;
var img;

function preload() {
	img = loadImage('https://source.unsplash.com/random');
}

function init(){
	clear();
	plateau = [];
	for (var i = 0; i < n; i++){
		let startX = Math.floor(Math.random() * img.width);
		let startY = Math.floor(Math.random() * img.height);
		let posX = Math.floor(Math.random() * img.width);
		let posY = Math.floor(Math.random() * img.height);
		newPoint = new moving_point(
			startX,
			startY,
			posX,
			posY,
			img.get(posX,posY)
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
	    let x = random(img.width);
	    let y = random(img.height);
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
		var dest_x = Math.floor(Math.random() * img.width);
		var dest_y = Math.floor(Math.random() * img.height);
		plateau[i].dest_x = dest_x;
		plateau[i].dest_y = dest_y;
		plateau[i].color = img.get(dest_x,dest_y);
	}
}


function setup() {
  let x = img.height/810;
  let y = img.width/400;
  let color1;
  let color2;
  let color3;
  img.resize(img.width/y,img.height/x);

  createCanvas(400,810);
  img.loadPixels();
  
  color1 = average_color_as_background()
  color2 = average_color_as_background()
  color3 = average_color_as_background()

  let c1 = rgbToHex(color1.r,color1.g,color1.b)
  let c2 = rgbToHex(color2.r,color2.g,color2.b)
  let c3 = rgbToHex(color3.r,color3.g,color3.b)

  document.body.style.background = "linear-gradient(145deg, "+c1+" 0%, "+c2+" 75%, "+c3+" 100%)";
  init();
  reset();
  background(c1);
  console.log("Hello");
  /*drawingContext.shadowOffsetX  = 1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = 'black';*/

}

function get_average_color(){
	let colors = []
	let moyenne = 0
	for (var j = 0; j < n; j+=10){
		for (var i = j; i < j+10; i++){
					
		}
	}
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
    plateau[i].x += (plateau[i].dest_x-plateau[i].x)*0.1;
    plateau[i].y += (plateau[i].dest_y-plateau[i].y)*0.1;

	if (abs(plateau[i].dest_x - plateau[i].x) <= 0.25){
		let posX = Math.floor(Math.random() * img.width);
		let posY = Math.floor(Math.random() * img.height);
		plateau[i].dest_x = posX
		plateau[i].dest_y = posY
		plateau[i].x = posX -2
		plateau[i].y = posY -2
		plateau[i].color = img.get(plateau[i].dest_x,plateau[i].dest_y)
	}
  }
}

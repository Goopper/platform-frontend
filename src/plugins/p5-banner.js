import p5 from 'p5';

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function sketch(p) {
    const sketchHolder = document.getElementById('banner');
    const w = sketchHolder.offsetWidth;
    const h = sketchHolder.offsetHeight;
    let g;
    let bg;
    let sum;
    let bigParticles = [];
    let smallParticles = [];

    class Particle {
        constructor(x, y) {
            this.loc = new p5.Vector(x, y);
            this.vel = new p5.Vector(0, 0);
            this.dir = new p5.Vector(0, 0);
            this.speed = p.random(0.5, 1);
            this.alpha = -10;
            this.randomColor = p.random(1);

            this.move = function () {
            let angle = p.noise(
                this.loc.x / 1000,
                this.loc.y / 1000,
                p.frameCount / 1000
            ) * p.TWO_PI;
            this.dir.x = p.cos(angle); 
            this.dir.y = p.sin(angle); 
            this.vel = this.dir.copy(); 
            this.vel.mult(this.speed); 
            this.loc.add(this.vel); 
            };

            this.checkBigEdges = function () {
            if (
                g.pixels[p.int((this.loc.x + this.loc.y * g.width)) * 4 + 3] == 0 &&
                p.dist(this.loc.x, this.loc.y, x, y) > 35
            ) {
                this.loc.x = x + p.random(-2, 2);
                this.loc.y = y + p.random(-2, 2);
                this.alpha = 0;
            }
            };

            this.checkSmallEdges = function () {
            if (
                this.loc.x > w &&
                this.loc.x < p.width - w &&
                this.loc.y > h &&
                this.loc.y < height - h
            ) {
                this.loc.x = p.random(p.width);
                this.loc.y = p.random(p.height);
            } else if (
                this.loc.x < 0 ||
                this.loc.x > p.width ||
                this.loc.y < 0 ||
                this.loc.y > p.height
            ) {
                this.loc.x = p.random(p.width);
                this.loc.y = p.random(p.height);
            }
            };

            this.display = function (r, i) {
                this.alpha += (255 - this.alpha) * 0.05;

                if (this.randomColor > 0.55) {
                    let color1 = hexToRgb('#00c2ff');
                    p.fill(color1.r, color1.g, color1.b, this.alpha);
                } else if (this.randomColor <= 0.55 && this.randomColor >= 0.2) {
                    let color2 = hexToRgb('#094293');
                    p.fill(color2.r, color2.g, color2.b, this.alpha);
                } else {
                    let color3 = hexToRgb('#eefdff');
                    p.fill(color3.r, color3.g, color3.b, this.alpha);
                }
                p.noStroke();

                p.ellipse(this.loc.x, this.loc.y, r, r);
            };
        }
    }

    p.setup = function () {
        p.createCanvas(w, h);
        p.pixelDensity(1);
        g = p.createGraphics(w,h);
        g.textSize(500);
        g.textAlign(p.CENTER,p.CENTER);
        g.text('G',w/2, h/2);
        g.loadPixels();
        sum = 0;

        for(let i = 0 ; i < 1000; i++){
            smallParticles[i] = new Particle(
                p.random(p.width),
                p.random(p.height),
            );
        }

        for(let y = 0; y < g.height; y+=4){
            for(let x = 0 ; x < g.width; x+=4){
            let index = p.int((y*g.width+x))*4;
            if( g.pixels[index+3] != 0 ){
                bigParticles[sum] = new Particle(
                    x + p.random(-5, 5),
                    y + p.random(-5, 5),
                );
                sum ++;
            }  
            }
        }
        g.updatePixels();

        bg = hexToRgb('#0a0a0a');
    };

    p.draw = function() {
        p.background(bg.r, bg.g, bg.b, 30);
        for (let i = 0; i < sum; i+=12) { 
            bigParticles[i].move();
            bigParticles[i].checkBigEdges();
            bigParticles[i].display(12,i);
        }
        for (let i = 0; i < 300; i++) {
            smallParticles[i].move();
            smallParticles[i].checkSmallEdges();
            smallParticles[i].display(5,i);
        }
    };
};

export const drawBanner = (id) => {
    new p5(sketch, id);
};
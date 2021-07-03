import inputInit from "../input.js";   
let canvas;
const bgColor= 'rgb(255,255,255)'
const freeze = f =>{
    
    let freezeRange = document.querySelector('#input');
    inputInit(freezeRange,2,8,6,2);
    let shiver = Math.floor(24/parseInt(freezeRange.value));
    let mainObj;

    f.setup = function(){
        canvas = f.createCanvas(120, 120);
        canvas.parent('container');
        f.noStroke();
        mainObj= new MainObj()
    }

    f.draw = function() {
        f.background(bgColor);
        mainObj.display();
        mainObj.move();
    }

    class MainObj{
        constructor(){
            this.direction = 0.5;
            this.count = 0;
            this.x1 =0;
            this.x2 =0;
        }
        move(){
            if(this.count=== shiver){
                this.direction = -this.direction;
                this.count = 0;
            }
            this.x1 += this.direction;
            this.x2 -= this.direction;
            this.count++;
        }
        display(){
            f.translate(f.width/2+16,f.height/2+10)
            f.fill(50,160,255,100)
            f.push();
            f.translate(this.x1,0)
            polygon(0,0,42,6)
            f.pop();
            f.translate(-40,-25)
            f.push();
            f.translate(this.x2,0)
            polygon(0,0,30,6)
            f.pop();
        }
    }

    function polygon(x, y, radius, npoints) {
        let angle = f.TWO_PI / npoints;
        f.beginShape();
        for (let a = 0; a < f.TWO_PI; a += angle) {
            let sx = x + f.cos(a) * radius;
            let sy = y + f.sin(a) * radius;
            f.vertex(sx, sy);
        }
        f.endShape(f.CLOSE);
    }

    freezeRange.addEventListener('change',freezeChanged)
    function freezeChanged(){
        freezeRange = document.querySelector('#input');
        shiver = Math.floor(24/parseInt(freezeRange.value));
    }
}

export default freeze;
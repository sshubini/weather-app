import inputInit from "../input.js";   
let canvas;
const bgColor= 'rgb(255,255,255)'
const thunder = t => {
let mainobj;
t.setup = function(){
    canvas = t.createCanvas(120, 120);
    canvas.parent('container');
    t.noStroke();
    mainobj= new MainObj();
}

t.draw = function(){
    t.background(bgColor);
    mainobj.display();
    mainobj.move();
}

class MainObj{
    constructor(){
        this.opacity = 100;
        this.sec = 0;
    }
    move(){
        this.sec++;
        this.range = t.random(3,20)
        if(this.sec> this.range){
            this.opacity?
                this.opacity = 0
                : this.opacity= 100 ;
            this.sec=0;
        }
    }
    display(){
        t.translate(54,20);
        t.fill(245, 221, 66,this.opacity);
        t.triangle(0,0,0, 50, 50, 50);
        t.translate(15,-15);
        t.triangle(-50,50,0,100,0,50);
    }
}
}

export default thunder;
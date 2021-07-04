
let canvas;
const bgColor= 'rgb(255,255,255)';

const thunder = t => {
    let cont = document.querySelector('#container');
    let mainobj;

    t.setup = function(){
        canvas = t.createCanvas(cont.clientWidth,cont.clientWidth);
        canvas.parent('container');
        t.noStroke();
        mainobj= new MainObj(t.width/2,t.height/2);
    }

    t.windowResized = () => {
        t.resizeCanvas(cont.clientWidth,cont.clientWidth);
    }

    t.draw = function(){
        if(!cont.classList.contains('cvs6')) t.noLoop();  
        t.background(bgColor);
        mainobj.display();
        mainobj.move();
    }

    class MainObj{
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.opacity = 100;
            this.sec = 0;
        }
        move(){
            this.sec++;
            this.range = t.random(3,20);
            if(this.sec> this.range){
                this.opacity?
                    this.opacity = 0
                  : this.opacity= 100 ;
                this.sec=0;
            }
        }
        display(){
            t.translate(this.x,this.y-40);
            t.fill(245, 221, 66,this.opacity);
            t.triangle(0,0,0, 50, 50, 50);
            t.translate(15,-15);
            t.triangle(-50,50,0,100,0,50);
        }
    }
}

export default thunder;
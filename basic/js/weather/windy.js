import inputInit from "../input.js";

let canvas;
const bgColor= 'rgb(255,255,255)';

const windy = w => {
    let cont = document.querySelector('#container');
    let windRange = document.querySelector('#input');
    inputInit(windRange,1,6,2,1)
    let windSpeed = parseInt(windRange.value);
    let windPower = parseInt(windRange.value*2);
    let winds =[];

    w.setup = function(){
        canvas = w.createCanvas(cont.clientWidth, cont.clientWidth);
        canvas.parent('container');
        createWinds();
    }

    w.windowResized = () => {
        w.resizeCanvas(cont.clientWidth,cont.clientWidth);
    }

    function createWinds(){
        for(let i =1;i < windPower+1;i++){
            let randomX = Math.floor(Math.random()*50);
            let x1 = randomX;
            let x2 = randomX+30+(windPower*4);
            let y = (w.height/2)-(18-windPower)*(windPower/2)-(13-windPower);
            winds.push(new Wind(x1,x2,y+i*(18-windPower)));
        }
    }

    w.draw = function(){
        w.background(bgColor);
        for(let i=0; i<winds.length ;i++){
            winds[i].display();
            winds[i].move();
        }
    }

    class Wind{
        constructor(x1,x2,y){
            this.x1 = x1;
            this.x2 = x2;
            this.y = y;
            this.length = x2-x1;
        }
        move(){
            this.x1 += windSpeed;
            this.x2 += windSpeed;
            if(this.x1>w.width){
                this.x1 = -this.length;
                this.x2 = 0;
            }
        }
        display(){
            w.stroke(206,230,227,255);
            w.strokeWeight(13-windPower);
            w.line(this.x1,this.y,this.x2,this.y);
        }
    }

    function windChanged(){
        windSpeed = parseInt(this.value);
        windPower = parseInt(this.value*2);
        winds =[];
        createWinds();
    }

// event listeners
    windRange.addEventListener('change',windChanged);

}

export default windy;
import inputInit from "../input.js";

let canvas;
const bgColor= 'rgb(255,255,255)'

const sunny = s => {
    let cont = document.querySelector('#container');
    let sunRange = document.querySelector('#input');
    inputInit(sunRange,1,9,3,2);
    let G = 220-parseInt(sunRange.value)*10;
    let B = 80-parseInt(sunRange.value)*10;
    let sunScale = 60;
    let maxScale =100;
    let shineOpacity = 140;
    let sun1,sun2;

    s.setup = function(){
        canvas = s.createCanvas(cont.clientWidth, cont.clientWidth);
        canvas.parent('container');
        s.noStroke();
        sun1 = new Sun(s.width/2,s.height/2,sunScale,shineOpacity);
        sun2 = new Sun(s.width/2,s.height/2,sunScale,255)
    }

    s.windowResized = () => {
        s.resizeCanvas(cont.clientWidth,cont.clientWidth);
    }
    
    s.draw = function(){
        if(!cont.classList.contains('cvs0')) s.noLoop();  
        s.background(bgColor);
        sun1.display();
        sun1.move();
        sun2.display();
    }

    class Sun{
        constructor(x,y,scale,opacity){
            this.x = x;
            this.y = y;
            this.scale = scale;
            this.opacity=opacity;
        }
        move(){
            if(this.scale < maxScale){
                this.scale +=1;
                this.opacity -= 3;
            }else{
                this.scale = sunScale;
                this.opacity = shineOpacity;
            }
        }
        display(){
            s.fill(255,G,B,this.opacity);
            s.ellipse(this.x,this.x,this.scale,this.scale);
        }
    }
    
    function sunChanged(){
        G = 220-parseInt(sunRange.value)*10;
        B = 80-parseInt(sunRange.value)*10;
    }
    
    sunRange.addEventListener('change',sunChanged)

}

export default sunny;
import inputInit from "../input.js";  

let canvas;
const bgColor= 'rgb(255,255,255)'

const rainy = r => {

    let rainRange = document.querySelector('#input');
    inputInit(rainRange,2,8,3,1)
    let rainStrength = rainRange.value;
    let rains=[];
    let drops=[];
    let weight = 10*(2/rainStrength);
   

    r.setup = function(){
        canvas = r.createCanvas(120, 120);
        canvas.parent('container');
        for(let i = 0 ; i < rainStrength*3; i++){
            let x1= i*weight*2+weight/2;
            let y1= r.random(0,r.height);
            let length = r.random(15,40);
            let speed = r.random(0,1)+rainStrength/2;
            rains.push(new Rain(x1,y1,x1,y1+length+rainStrength,speed))
            drops.push(new Rain(x1,y1,x1,y1,speed+0.5))
        }
        // r.noLoop();
    }

    r.draw = function(){
        r.background(bgColor);
        // console.log(rains)
        for(let i = 0 ; i < rainStrength*3; i++){
            rains[i].display();
            rains[i].move();
            drops[i].display();
            drops[i].move();
        }
    }

    class Rain{
        constructor(x1,y1,x2,y2,speed){
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.speed = speed;
            this.length = y2-y1;
        }
        move(){
            this.y1 += this.speed;
            this.y2 += this.speed;

            if(this.y1 > r.height){
                this.y1=-this.length;
                this.y2=0;
            }
        }
        display(){
            r.stroke(64,175,216,100);
            r.strokeWeight(weight);
            r.line(this.x1,this.y1,this.x2,this.y2);
        }
    }

    rainRange.addEventListener('change',rainChanged)

    function rainChanged(){
        rainStrength = rainRange.value;
        rains=[];
        drops=[];
        weight = 10*(2/rainStrength);
        let objW = (rainStrength-1)*weight*(1/rainStrength);
        for(let i = 0 ; i < rainStrength*3; i++){
            let x1= i*weight*2+weight/2;
            let y1= r.random(0,r.height);
            let length = r.random(10,40);
            let speed = r.random(0,1)+rainStrength/2;
            rains.push(new Rain(x1,y1,x1,y1+length+rainStrength,speed));
            drops.push(new Rain(x1,y1,x1,y1,speed+1));
        }
    }

}

export default rainy;
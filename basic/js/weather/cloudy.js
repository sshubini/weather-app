import inputInit from "../input.js";   
let canvas;
const bgColor= 'rgb(255,255,255)'

const cloudy = u => {
let cont = document.querySelector('#container');
let cloudRange = document.querySelector('#input');
inputInit(cloudRange,1,7,3,1)
let c;
let clouds=[];
let cloudAmount = parseInt(cloudRange.value);
let weight = 28;
let y;

u.setup = ()=>{
    canvas = u.createCanvas(cont.clientWidth,cont.clientWidth);
    // canvas.parent('container');
    c = {
        x:u.width/2,
        y:u.height/2
    }
    y = u.height/2-((cloudAmount-1)*(weight/2))+(cloudAmount-1)*5;
    for(let i =0;i<cloudAmount;i++){
        let randomSpeed=(Math.random()/5)+0.1;
        let randomDirection= Math.round(Math.random()*1);
        let randomX = c.x + Math.round(Math.random()*40)-40;
        clouds.push(new Cloud(randomX,randomX+36,y+i*(weight-10),randomSpeed,randomDirection));
    }
}

u.windowResized = () => {
    u.resizeCanvas(cont.clientWidth,cont.clientWidth);
}

u.draw = ()=>{
    if(!cont.classList.contains('cvs1')) u.noLoop(); 
    u.background(bgColor);
    for(let i =0;i<clouds.length;i++){
        clouds[i].display();
        clouds[i].move();
    }
     
}

class Cloud{
    constructor(x1,x2,y,speed,direction){
        this.x1 = x1;
        this.x2 = x2;
        this.y = y;
        this.speed = speed;
        this.direction=direction;
    }
    move(){

        if(this.x1-weight/2 <= 0 || this.x2+weight/2 >= u.width){
            this.speed = -this.speed;
        }
        if(this.direction){
            this.x1 += this.speed;
            this.x2 += this.speed;
        }else{
            this.x1 -= this.speed;
            this.x2 -= this.speed;
        }
    }

    display(){
        u.stroke(219,225,228,180);
        u.strokeWeight(weight);
        u.line(this.x1,this.y,this.x2,this.y);
    }
}

const amountChanged = () =>{
    clouds=[];
    cloudAmount = parseInt(cloudRange.value);
    y = c.y-((cloudAmount-1)*(weight/2))+(cloudAmount-1)*5;
    for(let i =0;i<cloudAmount;i++){
        let randomSpeed=(Math.random()/5)+0.1;
        let randomDirection= Math.round(Math.random()*1);
        let randomX = c.x + Math.round(Math.random()*40)-40;
        clouds.push(new Cloud(randomX,randomX+36,y+i*(weight-10),randomSpeed,randomDirection));
    }
}

cloudRange.addEventListener('change',amountChanged);


}


export default cloudy;
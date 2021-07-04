import inputInit from "../input.js";
let canvas;
const bgColor= 'rgb(255,255,255)'
const snowy = c => {
    let cont = document.querySelector('#container');
    let snow = document.querySelector('#input');
    inputInit(snow,1,7,3,2)
    let snowAmount = parseInt(snow.value);
    let snows = [];
    // console.log(idx)
    c.setup = function(){
        canvas = c.createCanvas(cont.clientWidth,cont.clientWidth);
        switch(snowAmount){
            case 1:
                snows.push(new Snowflake(c.width/2,c.height/2))
                break;
            case 3:
                snows.push(new Snowflake(c.width/4+4,c.height*5/16))
                snows.push(new Snowflake(c.width*3/4-4,c.height*5/16))
                snows.push(new Snowflake(c.width/2,c.height*11/16))
                break;
            case 5:
                snows.push(new Snowflake(c.width*3/8-4,c.height*3/8-4))
                snows.push(new Snowflake(c.width*5/8+4,c.height*3/8-4))
                snows.push(new Snowflake(c.width/4-4,c.height*5/8+4))
                snows.push(new Snowflake(c.width/2,c.height*5/8+4))
                snows.push(new Snowflake(c.width*3/4+4,c.height*5/8+4))
                break;
            case 7:
                snows.push(new Snowflake(c.width*3/8,c.height/4))
                snows.push(new Snowflake(c.width*5/8,c.height/4))
                snows.push(new Snowflake(c.width/4,c.height/2))
                snows.push(new Snowflake(c.width/2,c.height/2))
                snows.push(new Snowflake(c.width*3/4,c.height/2))
                snows.push(new Snowflake(c.width*3/8,c.height*3/4))
                snows.push(new Snowflake(c.width*5/8,c.height*3/4))
                break;
        }
    }
    c.windowResized = () => {
        c.resizeCanvas(cont.clientWidth,cont.clientWidth);
    }
    c.draw = function(){
        if(!cont.classList.contains('cvs3')) c.noLoop();  
        c.background(bgColor);

        for(let i =0;i<snowAmount;i++){
            snows[i].display();
            snows[i].move();
        }

    }

    class Snowflake{
        constructor(x,y){
            this.x=x;
            this.y=y;
            this.scale=c.scale;
            this.angle = 0;
        }
        move(){
            this.angle+=0.5;
            if(this.angle > 360){
                this.angle = 0;
            }
        }

        display(){
            c.push();
            c.translate(this.x,this.y);
            switch(snowAmount){
                case 3:
                    c.scale(0.7)
                    break;
                case 5:
                    c.scale(0.5)
                    break;
                case 7:
                    c.scale(0.4)
                    break;
            }
            c.stroke(57,157,255,100);
            c.strokeWeight(20);
            c.angleMode(c.DEGREES)
            c.rotate(this.angle);
            c.line(-35,0,35,0);
            c.rotate(60);
            c.line(-35,0,35,0);
            c.rotate(60);
            c.line(-35,0,35,0);
            c.pop();
        }
    }

    snow.addEventListener('change',snowChanged);
    function snowChanged(){
        snows=[];
        snowAmount = parseInt(snow.value);
        switch(snowAmount){
            case 1:
                snows.push(new Snowflake(c.width/2,c.height/2))
                break;
            case 3:
                snows.push(new Snowflake(c.width/4+4,c.height*5/16))
                snows.push(new Snowflake(c.width*3/4-4,c.height*5/16))
                snows.push(new Snowflake(c.width/2,c.height*11/16))
                break;
            case 5:
                snows.push(new Snowflake(c.width*3/8-4,c.height*3/8-4))
                snows.push(new Snowflake(c.width*5/8+4,c.height*3/8-4))
                snows.push(new Snowflake(c.width/4-4,c.height*5/8+4))
                snows.push(new Snowflake(c.width/2,c.height*5/8+4))
                snows.push(new Snowflake(c.width*3/4+4,c.height*5/8+4))
                break;
            case 7:
                snows.push(new Snowflake(c.width*3/8,c.height/4))
                snows.push(new Snowflake(c.width*5/8,c.height/4))
                snows.push(new Snowflake(c.width/4,c.height/2))
                snows.push(new Snowflake(c.width/2,c.height/2))
                snows.push(new Snowflake(c.width*3/4,c.height/2))
                snows.push(new Snowflake(c.width*3/8,c.height*3/4))
                snows.push(new Snowflake(c.width*5/8,c.height*3/4))
                break;
        }
    }
}

export default snowy;
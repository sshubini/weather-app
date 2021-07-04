import inputInit from "../input.js";   

let canvas;
const bgColor= 'rgb(255,255,255)'

const dusty = d => {
    let cont = document.querySelector('#container');
    let dustRange = document.querySelector('#input');
    inputInit(dustRange,1,5,2,1)
    let dusts=[];
    let dustW = 4;
    let dustCol= dustRange.value*3;
    let dustRow= dustRange.value*3;
    let dustsW = dustRow * dustW * 2;

    d.setup = function(){
      canvas = d.createCanvas(cont.clientWidth, cont.clientWidth);
        // canvas.parent('container');
        for(let i =0;i<dustCol;i++){
            dusts.push([])
            for(let j =0;j<dustRow;j++){
                dusts[i].push(new Dust(j*dustW*2,i*dustW*2,dustW,dustW))
            }
        }
    }

    d.windowResized = () => {
      d.resizeCanvas(cont.clientWidth,cont.clientWidth);
   }

    d.draw = function(){
      
      if(!cont.classList.contains('cvs5')) d.noLoop();  
        d.background(bgColor);
        d.translate(d.width/2 -dustsW/2 +dustW,d.height/2 -dustsW/2+dustW);
        d.noStroke();
        for(let i =0;i<dustCol;i++){
            dusts.push([])
            for(let j =0;j<dustRow;j++){
                dusts[i][j].display();
                dusts[i][j].move();
            }
        }
    }
    class Dust{
        constructor(x,y,w,h){
          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;
          this.direction = Math.floor(Math.random()*2) ? 1: -1;
         this.bool = true;
        }
        move(){
          if(this.bool){
            if(Math.abs(this.x+(d.width/2-dustsW/2)-d.mouseX)<10&& Math.abs(this.y+(d.height/2-dustsW/2+dustW)-d.mouseY)<10){
              this.x += 5;
              this.y += 5;
            }
            this.bool = false;
          }else{
            if(Math.abs(this.x+(d.width/2-dustsW/2)-d.mouseX)<10&& Math.abs(this.y+(d.height/2-dustsW/2+dustW)-d.mouseY)<10){
              this.x -= 5;
              this.y -= 5;
            }
            this.bool = true;
          }
        }
        display(){
            d.push();
            d.fill(217,154,94,160);
            d.rectMode(d.CENTER);
            d.rect(this.x,this.y,this.w,this.h);
            d.pop();
        }
      }

      function dustChanged(){
        dustCol= dustRange.value*3;
        dustRow= dustRange.value*3;
        dustsW = dustRow * dustW * 2;
        dusts=[];
        for(let i =0;i<dustCol;i++){
            dusts.push([])
            for(let j =0;j<dustRow;j++){
                dusts[i].push(new Dust(j*dustW*2,i*dustW*2,dustW,dustW))
            }
        }
      }

    dustRange.addEventListener('change',dustChanged);

}

export default dusty;
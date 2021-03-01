        


function rain(){
  let rainRange = document.querySelector('#input');
  let rainStrength = rainRange.value;
  let rains=[];
  let drops=[];
  let weight = 10*(2/rainStrength);

    
  function setup() {
    createCanvas(100, 100);
    background(0,0,0)    
    rainRange.addEventListener('change',rainChanged)
    function rainChanged(){
      rainStrength = rainRange.value;
      rains=[];
      drops=[];
      weight = 10*(2/rainStrength);
      objW = (rainStrength-1)*weight*(1/rainStrength);
      for(let i = 0 ; i < rainStrength*3; i++){
        let x1= i*weight*2+weight/2;
        let y1= random(0,height);
        let length = random(10,40);
        let speed = random(0,1)+rainStrength/2;
        rains.push(new Rain(x1,y1,x1,y1+length+rainStrength,speed));
        drops.push(new Rain(x1,y1,x1,y1,speed+1));
      }
    }
    for(let i = 0 ; i < rainStrength*3; i++){
      let x1= i*weight*2+weight/2;
      let y1= random(0,height);
      let length = random(15,40);
      let speed = random(0,1)+rainStrength/2;
      rains.push(new Rain(x1,y1,x1,y1+length+rainStrength,speed))
      drops.push(new Rain(x1,y1,x1,y1,speed+0.5))
    }
  }
    
  function draw() {
    background(255);
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
      
      if(this.y1 > height){
          this.y1=-this.length;
          this.y2=0;
      }
    }
    display(){
      stroke(64,175,216,100);
      strokeWeight(weight);
      line(this.x1,this.y1,this.x2,this.y2);
    }
  }
}

rain()


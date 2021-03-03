const APIkey = 'd45d73bd9864b3ae2216f9a07f82a08d';


const weatherInfo = new Promise((resolve, reject) => {
    if('geolocation' in navigator) {
        /* 위치정보 사용 가능 */
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            getWeather(lat,lon)
            console.log('ha')
            //resolve(getWeather(lat,lon));
        });
    }
});


var canvas;
function centerCvs(a){
    var x = (a.windowWidth - a.width) / 2;
    var y = (a.windowHeight - a.height) / 2;
    canvas.position(x, y);
}

let rainy = function(r) {
    let rainRange = document.querySelector('#input');
    let rainStrength = rainRange.value;
    let rains=[];
    let drops=[];
    let weight = 10*(2/rainStrength);

    r.setup = function(){
        canvas = r.createCanvas(120, 120);
        centerCvs(r);
        r.background(0,0,0)
        rainRange.addEventListener('change',rainChanged)
        function rainChanged(){
            rainStrength = rainRange.value;
            rains=[];
            drops=[];
            weight = 10*(2/rainStrength);
            objW = (rainStrength-1)*weight*(1/rainStrength);
            for(let i = 0 ; i < rainStrength*3; i++){
                let x1= i*weight*2+weight/2;
                let y1= r.random(0,r.height);
                let length = r.random(10,40);
                let speed = r.random(0,1)+rainStrength/2;
                rains.push(new Rain(x1,y1,x1,y1+length+rainStrength,speed));
                drops.push(new Rain(x1,y1,x1,y1,speed+1));
            }
        }
        for(let i = 0 ; i < rainStrength*3; i++){
            let x1= i*weight*2+weight/2;
            let y1= r.random(0,r.height);
            let length = r.random(15,40);
            let speed = r.random(0,1)+rainStrength/2;
            rains.push(new Rain(x1,y1,x1,y1+length+rainStrength,speed))
            drops.push(new Rain(x1,y1,x1,y1,speed+0.5))
        }
    }

    r.draw = function(){
        r.background(255);
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

}

let sunny = function(s){
    let sunScale = 60;
    let maxScale =100;
    let shineOpacity = 140;

    s.setup = function(){
        canvas = s.createCanvas(120, 120);
        centerCvs(s);
        s.background(255);
        s.noStroke();
        sun1 = new Sun(s.width/2,s.height/2,sunScale,shineOpacity);
        sun2 = new Sun(s.width/2,s.height/2,sunScale,255)
    }
    s.draw = function(){
        s.background(255);
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
            s. fill(255,217,79,this.opacity);
            s.ellipse(this.x,this.x,this.scale,this.scale);
        }
    }
}

let thunder = function(t){

    t.setup = function(){
        canvas = t.createCanvas(120, 120);
        centerCvs(t);
        t.background(255);
        t.noStroke();
        mainobj= new MainObj();
    }

    t.draw = function(){
        t.background(255);
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
            this.range = t.random(1,10)
            if(this.sec> this.range){
                this.opacity?
                    this.opacity = 0
                    : this.opacity= 100 ;
                this.sec=0;
            }
        }
        display(){
            t.translate(35,0);
            t.fill(255,255,0,this.opacity);
            t.triangle(0,0,0, 50, 50, 50);
            t.translate(15,-15);
            t.triangle(-50,50,0,100,0,50);
        }
    }
}

let dusty = function(d){
    let dustRange = document.querySelector('#input');
    let dusts=[];
    let dustW = 4;
    let dustCol= dustRange.value*3;
    let dustRow= dustRange.value*3;
    let dustsW = dustRow * dustW * 2;

    d.setup = function(){
        canvas = d.createCanvas(120, 120);
        centerCvs(d);
        for(let i =0;i<dustCol;i++){
            dusts.push([])
            for(let j =0;j<dustRow;j++){
                dusts[i].push(new Dust(j*dustW*2,i*dustW*2,dustW,dustW))
            }
        }
    }

    d.draw = function(){
        d.background(255);
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
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.width = d.width;
            this.height = d.height;
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
            d.rect(this.x,this.y,this.width,this.height);
            d.pop();
        }
    }

    dustRange.addEventListener('change',dustChanged);
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

}

let snowy = function(c){
    let snow = document.querySelector('#input');
    let snowAmount = parseInt(snow.value);
    let snows =[];

    c.setup = function(){
        canvas = c.createCanvas(120, 120);
        centerCvs(c);
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

    c.draw = function(){
        c.background(255);
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

let cloudy = function(u){
    let amount = document.querySelector('#input');
    let c;
    let clouds=[];
    let cloudAmount = parseInt(amount.value);
    let weight = 28;
    let y;

    u.setup = function(){
        canvas = u.createCanvas(120, 120);
        centerCvs(u);
        c = {
            x:u.width/2,
            y:u.height/2
        }
        y = c.y-((cloudAmount-1)*(weight/2))+(cloudAmount-1)*5;

        for(let i =0;i<cloudAmount;i++){
            let randomSpeed=(Math.random()/5)+0.1;
            let randomDirection= Math.round(Math.random()*1);
            let randomX = c.x + Math.round(Math.random()*40)-40;
            clouds.push(new Cloud(randomX,randomX+36,y+i*(weight-10),randomSpeed,randomDirection));
        }
    }

    u.draw = function(){
        u.background(255);
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


    amount.addEventListener('change',amountChanged);

    function amountChanged(){
        clouds=[];
        cloudAmount = parseInt(amount.value);
        y = c.y-((cloudAmount-1)*(weight/2))+(cloudAmount-1)*5;
        for(let i =0;i<cloudAmount;i++){
            let randomSpeed=(Math.random()/5)+0.1;
            let randomDirection= Math.round(Math.random()*1);
            let randomX = c.x + Math.round(Math.random()*40)-40;
            clouds.push(new Cloud(randomX,randomX+36,y+i*(weight-10),randomSpeed,randomDirection));
        }
    }
}

let windy = function(w){

    let winds =[];
    let speed = document.querySelector('#input');
    let windSpeed = parseInt(speed.value);
    let windPower = parseInt(speed.value*2);


    w.setup = function(){
        canvas = w.createCanvas(120, 120);
        centerCvs(w);
        createWinds();
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
        w.background(255);
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


// event listeners
    speed.addEventListener('change',speedChanged)

    function speedChanged(){
        windSpeed = parseInt(this.value);
        windPower = parseInt(this.value*2);
        winds =[];
        createWinds();
    }
}

let freeze = function(f){

    f.setup = function(){
        canvas = f.createCanvas(120, 120);
        centerCvs(f);
        f.background(255)
        f.noStroke();
        mainobj= new MainObj()
    }

    f.draw = function() {
        f.background(255);
        mainobj.display();
        mainobj.move();
    }

    class MainObj{
        constructor(){
            this.direction = 0.5;
            this.count = 0;
            this.x1 =0;
            this.x2 =0;
        }
        move(){

            if(this.count===4){
                this.direction = -this.direction;
                this.count = 0;
            }
            this.x1 += this.direction;
            this.x2 -= this.direction;
            this.count++;
        }
        display(){
            f.translate(f.width/2+20,f.height/2+10)
            f.fill(50,160,255,100)

            f.push();
            f.translate(this.x1,0)
            polygon(0,0,50,6)
            f.pop();
            f.translate(-50,-30)
            f.push();
            f.translate(this.x2,0)
            polygon(0,0,38,6)
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



}



function getWeather(lat,lon){
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        return json.weather[0].main;
    }).then(function(weather){
        console.log(weather)
        switch(weather){
            case 'Clouds' :
                new p5(freeze)
                break;
            case 'Snow' :
                console.log('cloudy');
                break;
            case 'Rain' :
                console.log('cloudy');
                break;
            case '' :
                console.log('cloudy');
                break;
            case '' :
                console.log('cloudy');
                break;
            case '' :
                console.log('cloudy');
                break;
        }
    })
}


const btns = document.querySelector('#btns');
btns.addEventListener('click',(e)=>{
    let weather = e.target.innerText.toLowerCase();
    console.log(weather)
    switch(weather){
        case 'cloudy':
            new p5(cloudy);
            break;
        case 'rainy':
            new p5(rainy);
            break;
        case 'windy':
            new p5(windy);
            break;
        case 'freeze':
            new p5(freeze);
            break;
        case 'snowy':
            new p5(snowy);
            break;
        case 'dusty':
            new p5(dusty);
            break;
        case 'thunder':
            new p5(thunder);
            break;
        case 'sunny':
            new p5(sunny);
            break;
    }
})

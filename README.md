# Touchable Weather

### Weather API 에서 받아온 날씨 정보를 인터랙션 아이콘을 통해 표현

* 위치 기반 날씨 정보 활용
* 인터랙션 날씨 아이콘 제작 
* 반응형 사이트 

_Keyword : Vanilla JS(ES6) / P5 JS / CANVAS / SCSS_
   
<img src="https://img.shields.io/badge/-html5-E34F26?style=flat&logo=html5&logoColor=00c8ff"> <img src="https://img.shields.io/badge/-Sass-cc6699?style=flat&logo=sass&logoColor=ffffff"> <img src="https://img.shields.io/badge/-P5js-ED225D?style=flat&logo=p5dotjs&logoColor=ffffff"> <img src="https://img.shields.io/badge/-JavaScript-eed718?style=flat&logo=javascript&logoColor=ffffff">
  
> 조금 더 직관적인 날씨 어플을 만들어 보고 싶어 기획, 디자인, 개발
> 
> 캔버스를 효율적으로 사용하기 위해 P5.JS 사용   
> 
> 퍼센트, vw기준으로 브라우저 크기에 따라 반응 

---
<img width="19.5%" src="https://user-images.githubusercontent.com/66768245/126972173-ae064c04-f273-4599-b565-93b719733007.gif"/> <img width="19.5%" src="https://user-images.githubusercontent.com/66768245/126972859-faf91f52-b61b-4b52-90fe-d32d0203a93a.gif"/>  <img width="19.5%" src="https://user-images.githubusercontent.com/66768245/126973200-b91fc8ed-a981-4a92-9d15-d4f6c4f85630.gif"/> <img width="19.5%" src="https://user-images.githubusercontent.com/66768245/126973526-4dd77c17-9aba-4b29-8256-54befaf4f2f5.gif"/> <img width="19.5%" src="https://user-images.githubusercontent.com/66768245/126973821-d2200d22-dd67-4ed2-a822-f0263993ac63.gif"/>


## 🔳 코드구성  

### ✔️ 날씨 아이콘을 class 객체로 선언하고 원하는 갯수, 크기, 방향 등을 인자로 전달하여 캔버스 내에 생성

#### ✔️ 날씨별 구성 :  
- ☁️ Cloud 객체 ( randomX시작점, X끝점, Y좌표, random속도, random방향 )를 인자로 받아  
input value값만큼의 구름을 생성하고 움직임을 그려주는 방식

- 🌕 Dust 객체 ( X좌표, Y좌표, 먼지넓이값, 먼지높이값 )를 인자로 받아  
input value값만큼의 이차원 배열에 그려주는 방식

- ❄️ Freeze 객체 polygon 다각형 2개를 그리고  
input value값에 따라 좌우로 움직이는 속도를 다르게한 방식

- 💦 Rainy 객체 ( X좌표, Y좌표, X좌표, Y좌표+빗줄길이,속도 )를 인자로 받아  
input value값에 따라 굵기와 속도 양을 조절하는 방식

- ☃️ Snowy 객체 ( X좌표, Y좌표 )를 인자로 받아  
input value값에 따라 눈꽃모양을 그리고 x,y좌표 기준으로 회전시키는 방식

- 🌞 Sunny 객체 ( X좌표,Y좌표, 해의 반지름, 투명도 )를 인자로 받아  
input value값에 따라 rgba 의 r값을 변화시켜 붉게 만드는 방식

- ⚡️ Thunder 객체로  
input value값에 따라 깜빡이는 속도를 조절하는 방식 

- 💨 Windy 객체( X좌표, 바람의 길이, Y좌표 )를 인자로 받아  
input value값에 따라 속도와 양을 조절하는 방식


    
### ✔️ 주요 이벤트

1. 캔버스 생성 : 위치에 따른 날씨 정보를 얻고 그에 매칭된 캔버스 생성
2. 슬라이더 이동 : 드래그로 슬라이더를 이동해 그에 맞는 날씨 캔버스 생성
3. 인풋 값 변경 : input value 값에 따라 날씨 아이콘 객체 조작


### ✔️ 이벤트 조작 방법:

- 날씨 정보 저장 후 출력
  - navigator의 geolocation으로 현재 위치 파악 후 weather API에서 그 위치의 날씨 정보를 저장
    - setWeather : 날씨정보의 weather를 받아와 각 케이스별로 Index값과 이름을 설정해 캔버스 인자로 전달
    - setCity : 날씨정보의 city를 받아와 출력
    - setDate : new Date().getDay()를 받아와 출력
    - setTemp : 날씨정보의 temp를 받아와 출력
    
- 슬라이더
  - mousedown, mousemove, mouseup, mouseleave 이벤트로 X좌표값을 조절하여 드래그시 슬라이더 이동
  - snapX 호출시 index값 변경 & X좌표로 translate되고 index값에 매칭하여 캔버스 생성
  
- 인풋
  - input range value 값 변경에 따라 캔버스 내의 날씨 아이콘 객체를 조작

---


## 🔳 주요 이슈 사항

1. 날씨별 캔버스 생성 시
  - index 값으로 슬라이더와 캔버스를 매칭
    - 이전에 있던 캔버스가 계속 남아있어 현재의 캔버스와 input value가 엉킴
  - 문제 해결 방법
    - 새 캔버스 생성시 캔버스 태그의 부모에 클래스 `cvs${index}`을 부여하여
      그 클래스를 포함하지 않는 캔버스의 루핑을 중단
    - removeChild 로 이전 캔버스 삭제  
    ````js
       if(!cont.classList.contains('cvs1')) u.noLoop(); 
    ````
    ````js
       if(elCont.childElementCount >= 2){
           elCont.removeChild(elCont.firstChild);
       }
    ````
      
2. 날씨 중 snowy 아이콘
  - 객체 위치 좌표의 규칙이 없어 코드 고민 
  - 문제 해결 방법
    - input value별 좌표 정보를 저장 후 switch 문으로 케이스마다 다르게 구현  
    
    ````js
    
    
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
        
    ````

3. 슬라이더 이동시 
  - 트랜지션이 적용된 이동 과정이 보여 부자연스러움
  - 문제 해결 방법
    - setX 함수의 인자로 boolean 값을 전달해 트랜지션이 적용될 때와 아닐 때를 구분 
  ````js
     const setX = function(animation){
        if(movedX<0){
            movedX=0;
        }else if(movedX > maxW){
            movedX = maxW
        }
        
         el.style.transition =  animation? `transform 0.3s ease-in-out` 
                                         : `transform 0.0s ease-in-out`
                                         
        el.style.transform = `translate(-${movedX}px)`
    }
  ````
4. 크로스 브라우징 이슈
  - p5js가 인터넷 익스플로어에서 지원되지 않아 오작동
  - 문제 해결 방법
    - navigator로 이용자의 브라우저를 파악해 alert 메세지 전달
    ````js
        const agent = navigator.userAgent.toLowerCase();
        if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
            alert("Touchable weather는 인터넷 익스플로러에서 지원되지 않습니다.");
        }
    ````

 
  
---

## 🔳 프로젝트를 통해 배운점

> - 반응형에 대한 이해
> - 모듈화의 중요성 
> - 외부 API 사용법
> - 캔버스에 대한 이해
> - ES6의 이해와 적용

---
## 🔳 객체화

ES6의 class를 사용하여 낱개 아이콘을 객체화하고 필요에 의해 중복 사용  

예)
````js

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
````


## 🔳 모듈화

ES6의 import와 export를 사용하여 날씨별로 js파일을 정리 후 필요한 곳에서 사용  

예)
````js
   export default cloudy;
````
````js
   import cloudy from "./weather/cloudy.js";
````



---

## Getting Started

1.  Clone the repo:

        git clone https://github.com/sshusshu/weather-app.git

2.  Install dependencies:

        npm install


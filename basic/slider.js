// dom
const title = document.querySelector('.title');
for(let i = 0; i<title.childElementCount ;i++){
    title.children[i].style.left = `${i*100}%`
}

const cont = document.querySelector('#container');


// js
let isDrag = false;
let isLeaved = false;
let directX;
let lastX;
let movedX=0;
let elCount = title.childElementCount
let eachW = title.clientWidth;
let totalW = eachW * elCount;
let maxW = totalW-eachW;

//snapX()

function mouseDown(e){
    e.preventDefault();
    console.log('down')
    //last x값을 설정
    isDrag = true;
    isLeaved = false;
    lastX = e.clientX;
    directX = e.clientX;
    title.addEventListener('mouseleave',mouseLeave)

}
function mouseMove(e){
    e.preventDefault();
   // console.log('move')
    //last x와 현재x의 차이를 style에서 빼줌
    if(!isDrag) return;
      movedX += (lastX - e.clientX);
      lastX = e.clientX;
      setX(false);  
}
function mouseUp(e){
    e.preventDefault();
    console.log('up')
    //idx를 빼거나 더해서 스냅
    isDrag = false;
    snapX();
    title.removeEventListener('mouseleave',mouseLeave)
}

function mouseLeave(e){
    e.preventDefault();
    console.log('leave')
    //idx를 빼거나 더해서 스냅
    isDrag = false;
    snapX();
    isLeaved = true;
}

function snapX(){
    if(isLeaved) return;
    lastX-directX<=0?idx++:idx--;
    if(idx < 0){
       idx = 0;
    }else if(idx>elCount-1){
      idx = elCount-1
    }
    console.log(idx)
    movedX = idx * eachW;
    setX(true);
    setCvs(idx);
}

function setX(animation){
    if(movedX <0){
        movedX=0;
    }else if(movedX > maxW){
        movedX = maxW
    }
    if(animation){
        title.style.transition = `transform 0.3s ease-in-out`
    }else{
        title.style.transition = `transform 0.0s ease-in-out`
    }
    title.style.transform = `translate(-${movedX}px)`
}

function setCvs(idx){  
 switch (idx){
    case 0:
        new p5(sunny);
        break;
    case 1:
        new p5(cloudy);
        break;
    case 2:
        new p5(rainy);
        console.log('switch')
        break;
    case 3:
        new p5(snowy);
        break;
    case 4:
        new p5(windy);
        break;
    case 5:
        new p5(dusty);
        break;
    case 6:
        new p5(thunder);
        break;
    case 7:
        new p5(freeze);
        break;
 }
 if(cont.childElementCount >= 2){
    cont.removeChild(cont.firstChild);  
}
}
//event
title.addEventListener('mousedown',mouseDown)
title.addEventListener('mousemove',mouseMove)
title.addEventListener('mouseup',mouseUp)
title.addEventListener('mouseleave',mouseLeave)


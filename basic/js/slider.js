import rainy from "./weather/rainy.js";
import sunny from "./weather/sunny.js";
import thunder from "./weather/thunder.js";
import dusty from "./weather/dusty.js";
import snowy from "./weather/snowy.js";
import cloudy from "./weather/cloudy.js";
import windy from "./weather/windy.js";
import freeze from "./weather/freeze.js";

const Slider = ($el,$elCont,$idx) => {
    // let el,elCont;
    // let elCount,eachW,totalW,maxW;
    const el = $el;
    const elCont = $elCont;
    const elCount = el.childElementCount;
    const eachW = el.clientWidth;
    const totalW = eachW * elCount;
    const maxW = totalW-eachW;
    // let idx;
    let isDrag = false;
    let isLeaved = false;
    let directX;
    let lastX;
    // let movedX;
    let idx=$idx;
    let movedX = idx*eachW;
    const _load_init = () => {
        // const el = $el;
        // const elCont = $elCont;
        // const elCount = el.childElementCount;
        // const eachW = el.clientWidth;
        // const totalW = eachW * elCount;
        // const maxW = totalW-eachW;
        
        // console.log(el,elCont,elCount,eachW,totalW)
        for(let i = 0; i<elCount;i++){
            el.children[i].style.left = `${i*100}%`
        }
        // const idx=$idx;
        // const movedX = idx*eachW
        el.style.transform = `translate(-${movedX}px)`
        addEvent();
    }

    let mouseDown = function(e){
        e.preventDefault();
        //console.log('down')
        //last x값을 설정
        isDrag = true;
        isLeaved = false;
        lastX = getPosition(e).x;
        directX = getPosition(e).x;
        el.addEventListener('mouseleave',mouseLeave)

    }
    let mouseMove = function(e){
        e.preventDefault();
        // console.log('move')
        //last x와 현재x의 차이를 style에서 빼줌
        if(!isDrag) return;
        movedX += (lastX - getPosition(e).x);
        lastX = getPosition(e).x;
        setX(false);
    }
    let mouseUp = function(e){
        e.preventDefault();
       // console.log('up')
        //idx를 빼거나 더해서 스냅
        isDrag = false;
        snapX();
        el.removeEventListener('mouseleave',mouseLeave)
    }
    let mouseLeave = function(e){
        e.preventDefault();
      //  console.log('leave')
        //idx를 빼거나 더해서 스냅
        isDrag = false;
        snapX();
        isLeaved = true;
    }
    let snapX = function(){
        if(isLeaved) return;
        if(lastX-directX<0){
            idx++
        }else if(lastX-directX>0){
            idx--
        }
        if(idx < 0){
            idx = 0;
        }else if(idx>elCount-1){
            idx = elCount-1
        }
       // console.log(idx,lastX-directX)
        movedX = idx * eachW;
        setX(true);
        setCvs(idx);
    }
    let setX = function(animation){
        if(movedX<0){
            movedX=0;
        }else if(movedX > maxW){
            movedX = maxW
        }
        if(animation){
            el.style.transition = `transform 0.3s ease-in-out`
        }else{
            el.style.transition = `transform 0.0s ease-in-out`
        }
       // console.log(movedX)
        el.style.transform = `translate(-${movedX}px)`
    }
    let setCvs = function(idx){
        switch (idx){
            case 0:
                new p5(sunny);
                break;
            case 1:
                new p5(cloudy);
                break;
            case 2:
                new p5(rainy);
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
        if(elCont.childElementCount >= 2){
            elCont.removeChild(elCont.firstChild);
        }
    }
    let getPosition = function(e){
        if (e.type.split('touch').length > 1) {
            return {x:e.changedTouches[0].clientX, y:e.changedTouches[0].clientY}
        }
        return {x:e.clientX, y:e.clientY};
    }

    let addEvent =  function(){
        el.addEventListener('mousedown',mouseDown);
        el.addEventListener('mousemove',mouseMove);
        el.addEventListener('mouseup',mouseUp);
        el.addEventListener('mouseleave',mouseLeave);

        el.addEventListener('touchstart',mouseDown);
        el.addEventListener('touchmove',mouseMove);
        el.addEventListener('touchend',mouseUp);
        el.addEventListener('touchcancel',mouseLeave);
    }

    return _load_init
};

export default Slider;




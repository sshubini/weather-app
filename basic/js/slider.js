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
    let eachW = el.clientWidth;
    let totalW = eachW * elCount;
    let maxW = totalW-eachW;
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

    const mouseDown = function(e){
        e.preventDefault();
        //console.log('down')
        //last x값을 설정
        isDrag = true;
        isLeaved = false;
        lastX = getPosition(e).x;
        directX = getPosition(e).x;
        el.addEventListener('mouseleave',mouseLeave)

    }
    const mouseMove = function(e){
        e.preventDefault();
        // console.log('move')
        //last x와 현재x의 차이를 style에서 빼줌
        if(!isDrag) return;
        movedX += (lastX - getPosition(e).x);
        lastX = getPosition(e).x;
        setX(false);
    }
    const mouseUp = function(e){
        e.preventDefault();
       // console.log('up')
        //idx를 빼거나 더해서 스냅
        isDrag = false;
        snapX();
        el.removeEventListener('mouseleave',mouseLeave)
    }
    const mouseLeave = function(e){
        e.preventDefault();
      //  console.log('leave')
        //idx를 빼거나 더해서 스냅
        isDrag = false;
        snapX();
        isLeaved = true;
    }
    const snapX = function(){
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
    const setX = function(animation){
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
    const setCvs = function(idx){
        let weather;
        switch (idx){
            case 0:
                weather = sunny;
                break;
            case 1:
                weather = cloudy;
                break;
            case 2:
                weather = rainy;
                break;
            case 3:
                weather = snowy;
                break;
            case 4:
                weather = windy;
                break;
            case 5:
                weather = dusty;
                break;
            case 6:
                weather = thunder;
                break;
            case 7:
                weather = freeze;
                break;
        }
        new p5(weather,'container')
        
        elCont.className=`cvs${idx}`
        // console.log('elcont',elCont)
        if(elCont.childElementCount >= 2){
            elCont.removeChild(elCont.firstChild);
        }
    }
    const getPosition = function(e){
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

        el.addEventListener('touchstart',mouseDown,{passive: true});
        el.addEventListener('touchmove',mouseMove,{passive: true});
        el.addEventListener('touchend',mouseUp);
        el.addEventListener('touchcancel',mouseLeave);
        window.addEventListener('resize',()=>{
            eachW = el.clientWidth;
            totalW = eachW * elCount;
            maxW = totalW-eachW;
            idx=$idx;
            movedX = idx*eachW;
            
            el.style.transition = `transform 0.0s ease-in-out`
            el.style.transform = `translate(-${movedX}px)`;

            setCvs(idx)
        })
    }

    return _load_init
};

export default Slider;




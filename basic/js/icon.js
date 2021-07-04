

const inputEl = document.querySelector('#input');
const dragEl = document.querySelector('.title-box');

const inputIcon = document.querySelector('.input-btn');
const dragIcon = document.querySelector('.drag-btn');

let dragFlag = false;

const flash = (hideIcon) =>{
    hideIcon.classList.add('hide');
}

inputEl.addEventListener('change',()=>{
    flash(inputIcon)
    setTimeout(()=>{
        if(!dragFlag){
            dragIcon.classList.remove('hide');
        }
    dragFlag = true;
    },2000)

});


dragEl.addEventListener('click',()=>flash(dragIcon));
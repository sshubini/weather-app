
const inputInit = (name,min,max,value,step) => {
    name.setAttribute('min',min.toString());
    name.setAttribute('max',max.toString());
    name.setAttribute('value',value.toString());
    name.setAttribute('step',step.toString());
}

export default inputInit;
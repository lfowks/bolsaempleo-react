export const formToObject = (object:any, formElements:any) =>{
    Object.keys(object).forEach(function(key) {
        const control = formElements[key]
        if(control)
        object[key] = control.value
    });
    return object;
}


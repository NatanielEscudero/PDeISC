function calculadoraImpuestos(a){
    return(a+(a*0.4))
}
function esPar(a){
    if(a%2==0){
        return("es par")
    }
    else{
        return("es impar chaval")
    }
}
function tuNombre(a){
    return("tu nombre es: ",a)
}

export{ calculadoraImpuestos,esPar,tuNombre}
let capital = 1000
let juros = 13.65
let tempo = 1
let mensal = 100

console.log(jurosComposto( capital, (juros/100)/12 , tempo*12, mensal))

function jurosComposto (c, i,t, a){

    let Montante =  ((a*((1+i)**t-1) / i)*(1+i**1))
    
    //let Montante =  (a*((1+i)**t-1) / i)*(1+i**1)   aporte mensal
    //let Montante = (c*((1+i)**t))   capital inicial
   
          

    return Montante

}







/*
// RETORNA O VALOR DO IMPOSTO DE RENDA ESCOLHIDO
function impostoRenda(){
    let escolhido = ''
    for(let i = 0; i < imposto.length; i++){
        if(imposto[i].checked){
            escolhido = imposto[i].value
             
            return Number(escolhido)
        }       

    }*/


    /*function jurosComposto (i,t, r){  // VALOR, TAXA, TEMPO 

        let Montante = r*([Math.pow(1+i,t)-1]/i)

        return Montante
    
    }*/
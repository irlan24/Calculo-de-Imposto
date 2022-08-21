    let res = document.querySelector('#res')
    let selic = document.querySelector('#selic')
    let capInicial = document.querySelector('#capInicial')
    let capMensal = document.querySelector('#capMensal')
    let capTempo = document.querySelector('#capTempo')
    let imposto = document.getElementsByName ('txtradios')    
    let selctTempo = document.getElementsByName ('tempo')


// RETORNA O VALOR DO INPUT RADIOS
function seletorRadios(a){
    let escolhido = ''
    for(let i = 0; i < a.length; i++){
        if(a[i].checked){
            escolhido = a[i].value
             
            return escolhido
        }       

    }
}

// FUNÇÃO DE JUROS COMPOSTO 
function jurosComposto (c,i,t){    

    let Montante = (c*((1+i)**t))
    //let Montante = (c*(Math.pow(1+i,t)) + (a*((Math.pow(1+i,t)-1) / i)))

    return Montante

}


function jurosCompostoMes(c,i,t){
    let Montante = (c*((1+i)**(t/12)))
    //let Montante = (c*(Math.pow(1+i,t)) + (a*((Math.pow(1+i,t)-1) / i)))

    return Montante

}

function jurosAporteMes (a, i, t){

    let aporte = (a*((1+i)**t-1) / i) * (1+i**1)

    return aporte
}

    






// CÓDIGO PRINCIPAL, FUNCIONANDO A PARTIR DO CLICK IN VALIDADOR
function validador(){

    
    // VALIDAÇÕES E CHECAGENS

    if(capInicial.value.length == 0 || capMensal.value.length == 0 || capTempo.value.length == 0 ){
        alert('Valores invalidos, digite novamente!')
    }else if(selic.value.length == 0 || selic.value < 0){
        alert('Taxa CDI inválida. CDI atual considerado!')
        selic.value = 13.65       
        
        
    }else if(capInicial.value < 0){
        alert('capital inicial negativo. O valor será considerado 0')
        capInicial.value = 0

    }else if(capMensal.value < 0){
        alert('Investimento mensal negativo. O valor será considerado 0')
        capMensal.value = 0

    }else if (capTempo.value < 1){
        alert('Período de tempo inválido. O valor será considerado 1')
        capTempo.value = 1

         
    }else{      // CONVERSÕES E RESULTADOS
        let numSelic = (selic.value)
        let numCapInicial = (capInicial.value)
        let numCapMensal = (capMensal.value)
        let numCapTempo = (capTempo.value)
        /* 1° precisa-se do rendimento em cima do valor inicial.     ok
           
           2° Precisa-se subtrair o imposto de renda desse rendimento, antes de somar ao valor inicial (tentar criar uma função ImpostoDeRenda() )  OK

           3° Precisa-se somar o total (valor inicial + rendimento reduzido impostoDeRenda) acrescido do valor mensal para obter um novo rendimento
           */


           // Ramificação com seletor em ANO
            if(seletorRadios(selctTempo) == 'ano'){

                // RETORNA O VALOR BRUTO DA OPERAÇÃO
            let ValorBruto = jurosComposto(numCapInicial, numSelic/100, numCapTempo)
            
            // RETORNA O RENDIMENTO DESCONTADO DO IMPOSTO DE RENDA
            let descontoImposto = ((ValorBruto - numCapInicial)*(seletorRadios(imposto)/100))            

            // RETORNA O VALOR BRUTO COM DESCONTO DO IMPOSTO DE RENDA
            let resultadoFinal = ValorBruto - descontoImposto

            if(numCapMensal > 0){ // Atribui valores ao aporte e desconta imposto do mesmo

                let aporteBruto = jurosAporteMes(numCapMensal, (numSelic/100)/12, numCapTempo*12)
                let aporteImposto = ((aporteBruto - (numCapMensal*(numCapTempo*12)))*(seletorRadios(imposto)/100))
                let aporteFinal = aporteBruto - aporteImposto
                let resultado = resultadoFinal + aporteFinal
                res.innerHTML += `O saldo aporte mensal foi: R$ ${aporteFinal.toFixed(2)} reais <br>`
                res.innerHTML += `O saldo capital inicial foi: R$ ${resultadoFinal.toFixed(2)} reais <br>`
                res.innerHTML += `O saldo aporte mensal + capital inicial: R$ ${resultado.toFixed(2)} reais<br>`

            }else{
                res.innerHTML = `Ao longo de ${numCapTempo} ano(s) você terá o capital de R$ ${resultadoFinal.toFixed(2)} reais<br><br>`
                res.innerHTML += `Seu saldo Bruto renderá ${ValorBruto}<br>`
            }
            

            
            


            // Ramificação com seletor em MES
            }else{

                // RETORNA O VALOR BRUTO DA OPERAÇÃO
            let ValorBrutoMes = jurosCompostoMes(numCapInicial, numSelic/100, numCapTempo)
            
            // RETORNA O RENDIMENTO DESCONTADO DO IMPOSTO DE RENDA
            let descontoImposto = ((ValorBrutoMes - numCapInicial)*(seletorRadios(imposto)/100))            

            // RETORNA O VALOR BRUTO COM DESCONTO DO IMPOSTO DE RENDA
            let resultadoFinalMes = ValorBrutoMes - descontoImposto

                if(numCapMensal > 0){ // Atribui valores ao aporte e desconta imposto de renda

                    let aporteBrutoMes = jurosAporteMes(numCapMensal, (numSelic/100)/12, numCapTempo)
                    let aporteImpostoMes = ((aporteBrutoMes -(numCapMensal*numCapTempo))*(seletorRadios(imposto)/100))
                    let aporteFinalMes = aporteBrutoMes - aporteImpostoMes                    
                    let resultadoMes = aporteFinalMes + resultadoFinalMes
                    res.innerHTML += `O saldo aporte mensal foi: R$ ${aporteFinalMes.toFixed(2)} reais <br>`
                    res.innerHTML += `O saldo capital inicial foi: R$ ${resultadoFinalMes.toFixed(2)} reais <br>`
                    res.innerHTML += `O saldo aporte mensal + capital inicial: R$ ${resultadoMes.toFixed(2)} reais<br>`
                    

                }else{
                    res.innerHTML = `Ao longo de ${numCapTempo} mes(s) você terá o capital de R$ ${resultadoFinalMes.toFixed(2)} reais <br><br>`
                    res.innerHTML += `O saldo bruto foi: R$ ${ValorBrutoMes} reais<br><br>`
                }
                
                
                
            
            }
               
            
            
            

            

    }
       
    
        
}


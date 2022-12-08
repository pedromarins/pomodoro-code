const milissegundosPomodoro = 15000 // Estamos usando 4 segundos para testes. O tempo oficial de 25 minutos é 25*60*1000
const milissegundosIntervalo = 300000
const disparador = document.querySelector('#disparador')
const cronometro = document.querySelector('#cronometro')
let milissegundosRestantes = 0
let contador
let modo = ''

disparador.addEventListener('click', () => {
    console.log("Disparador ativado.")
    
    if(disparador.textContent=="Pausar") {
        clearInterval(contador)
        disparador.textContent="Retomar"
    } else {
        if(disparador.textContent=="Começar") {        
            modo = "pomodoro"
            milissegundosRestantes = milissegundosPomodoro - 1000
            
        } else if(disparador.textContent=="Intervalo") {
            modo = "intervalo"
            milissegundosRestantes = milissegundosIntervalo - 1000
        }

        disparador.textContent="Pausar"
        contador = setInterval('contadorDeSegundos()',1000);
    }

})

function contadorDeSegundos() {
    
    if (milissegundosRestantes == 0) {
        cronometro.textContent = "00:00"
        console.log("O seu tempo de produção do pomodoro acabou. Vá descansar!")
        
        if(modo=="pomodoro") {
            disparador.textContent="Intervalo"
            document.querySelector('body').style.background = "#287b7e"
            disparador.style.color = "#287b7e"
        } else if(modo=="intervalo"){
            disparador.textContent="Começar"
            document.querySelector('body').style.background = "#C84949"
            disparador.style.color = "#C84949"
        }

        clearInterval(contador)
    } else {
        cronometro.textContent = formatadorDoTempo(milissegundosRestantes/1000)
    }

    milissegundosRestantes -= 1000;    
}

function formatadorDoTempo(tempo) {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    return (minutos.toString().padStart(2, '0')+":"+segundos.toString().padStart(2, '0'))
}
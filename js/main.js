const milissegundosPomodoro = 3000 // Estamos usando 3 segundos para testes. O tempo oficial de 25 minutos é 25*60*1000
const milissegundosIntervaloCurto = 3000 // Intervalo de 5 minutos é de 300000 ms
const milissegundosIntervaloLongo = 9000 // Intervalo de 5 minutos é de 300000 ms
const disparador = document.querySelector('#disparador')
const cronometro = document.querySelector('#cronometro')
const historico = document.querySelector('#historico')
const auto = document.querySelector('#auto')
const tamanhoDoCiclo = 4
let milissegundosRestantes = 0
let contador
let modo = ''


const audioInicioPomodoro = new Audio("../audio/inicioPomodoro.ogg")
const audioFimPomodoro = new Audio("../audio/fimPomodoro.ogg")

const audioInicioIntervalo = new Audio("../audio/inicioIntervalo.ogg")
const audioFimIntervalo = new Audio("../audio/fimIntervalo.ogg")

disparador.addEventListener('click', disparaContador)

function disparaContador() {
    console.log("Disparador ativado.")
    
    if(disparador.textContent=="Pausar") {
        clearInterval(contador)
        disparador.textContent="Retomar"
    } else {
        if(disparador.textContent=="Começar") {        
            modo = "pomodoro"

            audioInicioPomodoro.play()

            milissegundosRestantes = milissegundosPomodoro - 1000
            historico.textContent = parseInt(historico.textContent) + 1
        } else if(disparador.textContent=="Intervalo") {
            modo = "intervalo"

            audioInicioIntervalo.play()

            if (historico.textContent % tamanhoDoCiclo == 0) {
                milissegundosRestantes = milissegundosIntervaloLongo 
            } else {
                milissegundosRestantes = milissegundosIntervaloCurto
            }
        }

        disparador.textContent="Pausar"
        contador = setInterval('contadorDeSegundos()',1000);
    }
}

function contadorDeSegundos() {
    
    if (milissegundosRestantes == 0) {
        cronometro.textContent = "00:00"
        console.log("O seu tempo de produção do pomodoro acabou. Vá descansar!")
        
        notificacao({
            title: 'Hora do descanso', 
            body: 'O seu tempo de produção do pomodoro acabou. Vá descansar!'
        })
        
        if(modo=="pomodoro") {
            audioFimPomodoro.play()

            disparador.textContent="Intervalo"
            if(historico.textContent % tamanhoDoCiclo == 0) {
                document.querySelector('body').style.background = "#29678a"
            disparador.style.color = "#29678a"
            } else {
                document.querySelector('body').style.background = "#287b7e"
                disparador.style.color = "#287b7e"
            }
        } else if(modo=="intervalo"){
            audioFimIntervalo.play()

            notificacao({
                title: 'Hora do Foco', 
                body: 'Booooora começar!'
            })

            disparador.textContent="Começar"
            document.querySelector('body').style.background = "#C84949"
            disparador.style.color = "#C84949"
        }

        if(auto.checked) {
            setTimeout(disparaContador, 3000)
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

// Função que cria a notificação
function notificacao({ title, body }) {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body
        });
    }  
}

// Primeira função que será executada no script
// Solicita permissão para mostrar notificações no navegador se a permissão ainda não tiver sido feita
(async () => {
    if (Notification.permission !== 'denied') {
        await Notification.requestPermission();
    }
 })();
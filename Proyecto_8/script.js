function obtenerTiempoFaltante(deadline) {
    let ahora = new Date();
    let tiempoFaltante = Math.max((new Date(deadline) - ahora + 1000) / 1000, 0);
    let segundosFaltantes = ('0' + Math.floor(tiempoFaltante % 60)).slice(-2);
    let minutosFaltantes = ('0' + Math.floor(tiempoFaltante / 60 % 60)).slice(-2);
    let horasFaltantes = ('0' + Math.floor(tiempoFaltante / 3600 % 24)).slice(-2);
    let diasFaltantes = ('0' + Math.floor(tiempoFaltante / (3600 * 24))).slice(-2);
    return {
      segundosFaltantes,
      minutosFaltantes,
      horasFaltantes,
      diasFaltantes,
      tiempoFaltante
    };
}

let santaStatus = "off";
let santaStill = document.getElementById("santaStill");
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let backgroundMusic = new Audio("./audio/allWant.mp3");

function startCountdown(deadline) {
    const diasElemento = document.getElementById("dias");
    const horasElemento = document.getElementById("horas");
    const minutosElemento = document.getElementById("minutos");
    const segundosElemento = document.getElementById("segundos");

    const tiempoActual = setInterval(() => {
        let t = obtenerTiempoFaltante(deadline);
        diasElemento.innerHTML = `${t.diasFaltantes}`;
        horasElemento.innerHTML = `${t.horasFaltantes}`;
        minutosElemento.innerHTML = `${t.minutosFaltantes}`;
        segundosElemento.innerHTML = `${t.segundosFaltantes}`;
        const e = document.getElementById("countdownMessage");
        mensaje = "Tiempo Restante Para Navidad:";
        e.innerHTML = mensaje;
        let sonido = new Audio("../audio/allWant.mp3");
        if (t.tiempoFaltante < 1) {
            clearInterval(tiempoActual);
            mensaje = "¡Feliz Navidad!";
            e.innerHTML = mensaje;
            santaStill.classList.add("on");
            startButton.classList.add("button");
            pauseButton.classList.add("button");

            if (santaStatus == "off") {
                startButton.addEventListener('click', () => {
                    santaStill.classList.add("on");
                    sonido.play();
                });
                pauseButton.addEventListener('click', () => {
                    sonido.pause();
                });
                console.log("on");
            }
        }
    }, 1000);
}

startCountdown('Dec 25 2023 00:00:00 GMT-0500');
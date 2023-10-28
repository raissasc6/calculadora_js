const testArea = document.querySelector("#test-area");
const gabaritoArea = document.querySelector("#origin-text")
const theTimer = document.querySelector(".timer");
const testWrapper = document.querySelector(".test-wrapper");
const resetButton = document.querySelector("#reset");

const GABARITOS = [
    "Aprender a digitar é uma habilidade valiosa.",
    "O treino constante aprimora sua velocidade e precisão.",
    "A paciência é a chave para aperfeiçoar sua digitação"
]

timer = [0,0,0,0];
var interval;
var timerRunning = false;

function spellCheck() {
    const textoInserido = testArea.value;
    const gabaritoText = gabaritoArea.innerHTML;

    if (textoInserido == gabaritoText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textoInserido == gabaritoText) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }

}

function leadingZero(time) {
    if(time <= 9){
        time = "0" + time;
    }
    return time;
}

function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function start(){
   let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

async function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";

    const gabaritoValue = await getGabarito()
    gabaritoArea.innerText = gabaritoValue;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function getGabarito()  {
    const defer = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(GABARITOS[getRandomInt(3)])
        }, 2000);
    });

    return defer
        .then((data) => {
            return data;
        })
}

window.addEventListener('load', async (event) => {
    const gabaritoValue = await getGabarito()
    gabaritoArea.innerText = gabaritoValue;
});

testArea.addEventListener("keyup", spellCheck, false);
testArea.addEventListener("keypress", start, false);
resetButton.addEventListener("click", reset, false);

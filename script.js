let timer;
let isRunning = false;
let lapCount = 1;

let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
stopBtn.addEventListener('click', stop);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', reset);

function start() {
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
    lapBtn.disabled = false;
    resetBtn.disabled = true;

    timer = setInterval(updateTime, 10);
    isRunning = true;
}

function pause() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = false;
}

function stop() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = false;
}

function updateTime() {
    milliseconds += 10;

    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;

        if (seconds == 60) {
            seconds = 0;
            minutes++;

            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    displayTime();
}

function displayTime() {
    const formattedTime = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + ':' + pad(Math.floor(milliseconds / 10));
    document.getElementById('display').innerText = formattedTime;
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.innerText = `Lap ${lapCount}: ${document.getElementById('display').innerText}`;
        document.getElementById('lapTimes').appendChild(lapTime);
        lapCount++;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapCount = 1;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    displayTime();
    document.getElementById('lapTimes').innerHTML = '';
}
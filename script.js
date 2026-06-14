let startTime = 0,
 elapsed = 0, 
 timerInterval = null;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');
const secHand = document.querySelector('.second');
const minHand = document.querySelector('.minute');
const hourHand = document.querySelector('.hour');

function formatTime(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join('.');
}

function update() {
    elapsed = Date.now() - startTime;
    display.textContent = formatTime(elapsed);

    // Second hand: full rotation every 60s
    const seconds = (elapsed % 60000) / 1000;
    secHand.style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;

    // Minute hand: full rotation every 60 min
    const minutes = (elapsed % 3600000) / 60000;
    minHand.style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;

    // Hour hand: full rotation every 12 hours
    const hours = (elapsed % 43200000) / 3600000;
    hourHand.style.transform = `translateX(-50%) rotate(${hours * 30}deg)`;
}

document.getElementById('start').onclick = () => {
    if (!timerInterval) {
        startTime = Date.now() - elapsed;
        timerInterval = setInterval(update, 50);
    }
};


document.getElementById('stop').onclick = () => {
    clearInterval(timerInterval);
    timerInterval = null;
};

document.getElementById('reset').onclick = () => {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsed = 0;
    display.textContent = '00.00.00';
    secHand.style.transform = 'translateX(-50%) rotate(0deg)';
    minHand.style.transform = 'translateX(-50%) rotate(0deg)';
    hourHand.style.transform = 'translateX(-50%) rotate(0deg)';
    lapsList.innerHTML = '';
};

document.getElementById('lap').onclick = () => {
    if (timerInterval) {
        const li = document.createElement('li');
        li.textContent = `Lap ${lapsList.children.length + 1} → ${formatTime(elapsed)}`;
        lapsList.appendChild(li);
    }
};
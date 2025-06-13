import "bootstrap/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

const timerDurations = [0.2, 0.4, 0.6, 0.1];
const headerMessages = [
    `今この瞬間に<br>集中してください。`,
    `やすらぎのときを少し、<br>過ごされますように。`,
];
const containerClassNames = [
    "container-fluid p-3 visible",
    "container-fluid p-3 bg-success text-white text-center",
    "bi bi-fullscreen-exit",
    "bi bi-arrows-fullscreen",
];
const timerButtons = [
    document.getElementById("btn12"),
    document.getElementById("btn24"),
    document.getElementById("btn36"),
    document.getElementById("btn5"),
    document.getElementById("btn_RST"),
];
const containerDivs = [
    document.getElementById("div1"),
    document.getElementById("div2"),
    document.getElementById("div3"),
];
const headerElements = [
    document.getElementById("hd1"),
    document.getElementById("hd2")
];

timerButtons.forEach((buttonElement, buttonIndex) => {
    if (buttonIndex < timerButtons.length - 2) {
        buttonElement.addEventListener("click", () => handleTimerButtonClick(buttonIndex), false);
    } else if (buttonIndex === timerButtons.length - 2) {
        buttonElement.addEventListener("click", handleSingleOffDutyClick, false);
    } else {
        buttonElement.addEventListener("click", handleResetClick, false);
    }
});

async function handleTimerButtonClick(timerIndex) {
    const { countDownTimer } = await import("./CountDownTimer.js");
    countDownTimer(timerDurations[timerIndex]);
    await disableTimerButtons();
    await updateDomForTimer();
    const { changeAfterTimerEnd } = await import("./ChangerAfterDue.js");
    changeAfterTimerEnd(timerDurations[timerIndex], timerButtons[3], containerDivs[0], containerClassNames[1]);
}

async function handleSingleOffDutyClick() {
    const { countDownTimer } = await import("./CountDownTimer.js");
    countDownTimer(timerDurations[3]);
    await disableTimerButtons();
    headerElements[1].innerHTML = headerMessages[1];
    const { changeAfterTimeOff } = await import("./ChangerAfterTimeoff.js");
    changeAfterTimeOff(timerDurations[3]);
}

async function handleResetClick() {
    location.reload();
}

async function disableTimerButtons() {
    for (let i = 0; i < timerButtons.length - 1; i++) timerButtons[i].disabled = true;
}

async function updateDomForTimer() {
    for (let i = 1; i < containerDivs.length; i++) {
        containerDivs[i].className = containerClassNames[0];
    }
    headerElements[0].innerHTML = headerMessages[0];
}

const fullscreenToggleButton = document.getElementById("toggleBtn");
fullscreenToggleButton.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenToggleButton.className = containerClassNames[2];
    } else {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            fullscreenToggleButton.className = containerClassNames[3];
        }
    }
});
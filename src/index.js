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
    document.getElementById("btn06"),
    document.getElementById("btn_RST"),
];
const contentDivs = [
    document.getElementById("div1"),
    document.getElementById("div2"),
    document.getElementById("div3"),
];
const headerElements = [
    document.getElementById("hd1"),
    document.getElementById("hd2")
];

timerButtons.slice(0, 3).forEach((button, i) => {
    button.addEventListener("click", async () => {
        await import("./CountDownTimer.js").then(module => {
            module.CountDownTimer(timerDurations[i]);
            disableTimerButtons().then(updateDomForTimerStart);
        });
        await import("./ChangerAfterDue.js").then(module => {
            module.ChangerAfterDue(timerDurations[i], timerButtons[3], contentDivs[0], containerClassNames[1]);
        });
    }, false);
});

timerButtons[3].addEventListener("click", async () => {
    await import("./CountDownTimer.js").then(module => {
        module.CountDownTimer(timerDurations[3]);
        disableTimerButtons();
        headerElements[1].innerHTML = headerMessages[1];
    });
    await import("./ChangerAfterTimeoff.js").then(module => {
        module.ChangerAfterTimeoff(timerDurations[3]);
    });
}, false);

timerButtons[4].addEventListener("click", async () => {
    location.reload();
}, false);

async function disableTimerButtons() {
    timerButtons.slice(0, -1).forEach(button => button.disabled = true);
}

async function updateDomForTimerStart() {
    contentDivs.slice(1).forEach(div => div.className = containerClassNames[0]);
    headerElements[0].innerHTML = headerMessages[0];
}

const fullscreenToggleButton = document.getElementById("toggleBtn");
fullscreenToggleButton.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        fullscreenToggleButton.className = containerClassNames[2];
    } else {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
            fullscreenToggleButton.className = containerClassNames[3];
        }
    }
});
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

// common constants
const due = [0.2, 0.4, 0.6, 0.1];
const hdText = [
    `今この瞬間に<br>集中してください。`,
    `やすらぎのときを少し、<br>過ごされますように。`,
];
const className = [
    "container-fluid p-3 visible",
    "container-fluid p-3 bg-success text-white text-center",
    "bi bi-fullscreen-exit",
    "bi bi-arrows-fullscreen",
];
const btn = [
    document.getElementById("btn12"),
    document.getElementById("btn24"),
    document.getElementById("btn36"),
    document.getElementById("btn06"),
    document.getElementById("btn_RST"),
];
const div = [
    document.getElementById("div1"),
    document.getElementById("div2"),
    document.getElementById("div3"),
];
const hd = [document.getElementById("hd1"), document.getElementById("hd2")];

// Add event listeners to buttons
btn.slice(0, 3).forEach((button, i) => {
    button.addEventListener("click", async () => {
        await import("./CountDownTimer.js").then(module => {
            module.CountDownTimer(due[i]);
            btnDisabler().then(domVisualizer);
        });
        await import("./ChangerAfterDue.js").then(module => {
            module.ChangerAfterDue(due[i], btn[3], div[0], className[1]);
        });
    }, false);
});

btn[3].addEventListener("click", async () => {
    await import("./CountDownTimer.js").then(module => {
        module.CountDownTimer(due[3]);
        btnDisabler();
        hd[1].innerHTML = hdText[1];
    });
    await import("./ChangerAfterTimeoff.js").then(module => {
        module.ChangerAfterTimeoff(due[3]);
    });
}, false);

btn[4].addEventListener("click", async () => {
    location.reload();
}, false);

// async functions commonly used above for each btn for duration, respectively.
async function btnDisabler() {
    btn.slice(0, -1).forEach(button => button.disabled = true);
}

async function domVisualizer() {
    div.slice(1).forEach(d => d.className = className[0]);
    hd[0].innerHTML = hdText[0];
}

// control fullscreen(enter/exit)
const toggleBtn = document.getElementById("toggleBtn");
toggleBtn.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        toggleBtn.className = className[2];
    } else {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
            toggleBtn.className = className[3];
        }
    }
});

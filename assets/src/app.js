// common constants
const due = [0.1, 30, 55, 0.1];
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
  document.getElementById("btn25"),
  document.getElementById("btn30"),
  document.getElementById("btn55"),
  document.getElementById("btn5"),
  document.getElementById("btn_RST"),
];
const div = [
  document.getElementById("div1"),
  document.getElementById("div2"),
  document.getElementById("div3"),
];
const hd = [document.getElementById("hd1"), document.getElementById("hd2")];

//initialize
btn[3].disabled = true;

//multiple_on_duty(25, 30, 55mins.)
for (let i = 0; i < btn.length - 2; i++) {
  btn[i].addEventListener(
    "click",
    () => {
      import("./CountDownTimer.js")
        .then((module) => {
          module.CountDownTimer(due[i]);
          btnDisabler().then(domVisualizer);
        })
        .then(
          import("./ChangerAfterDue.js").then((module) => {
            module.ChangerAfterDue(due[i], btn[3], div[0], className[1]);
          })
        );
    },
    false
  );
}

//single_off_duty(5mins.)
btn[3].addEventListener(
  "click",
  () => {
    import("./CountDownTimer.js")
      .then((module) => {
        module.CountDownTimer(due[3]);
        btnDisabler();
        hd[1].innerHTML = hdText[1];
      })
      .then(
        import("./ChangerAfterTimeoff.js").then((module) => {
          module.ChangerAfterTimeoff(due[3]);
        })
      );
  },
  false
);

//Reset.
btn[4].addEventListener(
  "click",
  () => {
    location.reload();
  },
  false
);

//async functions commonly used above for each btn for duration, respectively.
async function btnDisabler() {
  for (let i = 0; i < btn.length - 1; i++) btn[i].disabled = true;
}

async function domVisualizer() {
  for (let i = 1; i < div.length; i++) {
    div[i].className = className[0];
  }
  hd[0].innerHTML = hdText[0];
}

// control fullscreen(enter/exit)
const toggleBtn = document.getElementById("toggleBtn");
toggleBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    toggleBtn.className = className[2];
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      toggleBtn.className = className[3];
    }
  }
});

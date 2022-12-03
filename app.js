 // common constants
const due = [25, 30, 35, 5];
const hdText = [
  `Concentrate the mind <br> on the present moment!`,
  `Wish you a relaxing time <br> just for a short while.`,
];
const className = ["container-fluid p-3 bg-success text-white text-center"];
const btn = [
  document.getElementById("btn25"),
  document.getElementById("btn30"),
  document.getElementById("btn35"),
  document.getElementById("btn5"),
  document.getElementById("btn_RST"),
];
const modulePath = [
  "./CountDownTimer.js",
  "./ChangerAfterDue.js",
  "./ChangerAfterTimeoff.js",
];
const div = [document.getElementById("div1"), document.getElementById("div2")];
const hd = [document.getElementById("hd1"), document.getElementById("hd2")];

btn[3].disabled = true;

//multiple_on_duty(25, 30, 35mins.)
for (let i = 0; i < btn.length - 2; i++) {
  btn[i].addEventListener(
    "click",
    () => {
      import(modulePath[0])
        .then((module) => {
          module.CountDownTimer(due[i]);
          btnDisabler().then(domChanger);
        })
        .then(
          import(modulePath[1]).then((module) => {
            module.ChangerAfterDue(due[i], btn[3], div[0], className[0]);
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
    import(modulePath[0])
      .then((module) => {
        module.CountDownTimer(due[3]);
        btnDisabler();
        hd[1].innerHTML = hdText[1];
      })
      .then(
        import(modulePath[2]).then((module) => {
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
	for (let i = 0; i < btn.length - 1; i++)
  btn[i].disabled = true;
}

async function domChanger() {
  div[1].removeAttribute("hidden");
  hd[0].innerHTML = hdText[0];
}

// control fullscreen(enter/exit)
const toggleBtn = document.getElementById("toggleBtn");
toggleBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});

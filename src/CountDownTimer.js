export const countDownTimer = (durationMinutes) => {
  if (window.Worker) {
    const timerWorker = new Worker(new URL("./TimeCalc.js", import.meta.url));
    timerWorker.postMessage(durationMinutes);
    timerWorker.addEventListener("message", (event) => {
      const timerDisplayElement = document.getElementById("mins_secs");
      timerDisplayElement.textContent = event.data;
      if (event.data === "00:00") {
        timerWorker.terminate();
      }
    });
  } else {
    document.getElementById("mins_secs").textContent = `Web workerが利用可能か、ご確認ください。`;
  }
};
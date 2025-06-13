export const startCountDownTimer = (countDownMinutes) => {
  if (!window.Worker) {
    document.getElementById("mins_secs").textContent = `Web workerが利用可能か、ご確認ください。`;
    return;
  }

  const timerWorker = new Worker(new URL("./TimeCalc.js", import.meta.url));
  timerWorker.postMessage(countDownMinutes);
  timerWorker.addEventListener("message", event => handleTimerWorkerMessage(event, timerWorker));
};

const handleTimerWorkerMessage = (event, timerWorker) => {
  document.getElementById("mins_secs").textContent = event.data;
  if (event.data === "00:00") {
    timerWorker.terminate();
  }
};
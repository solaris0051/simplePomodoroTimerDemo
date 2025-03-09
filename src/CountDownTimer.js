export const CountDownTimer = cdt => {
  if (!window.Worker) {
    document.getElementById("mins_secs").textContent = `Web workerが利用可能か、ご確認ください。`;
    return;
  }

  const workerID0 = new Worker(new URL("./TimeCalc.js", import.meta.url));
  workerID0.postMessage(cdt);
  workerID0.addEventListener("message", event => handleWorkerMessage(event, workerID0));
};

const handleWorkerMessage = (event, worker) => {
  document.getElementById("mins_secs").textContent = event.data;
  if (event.data === "00:00") {
    worker.terminate();
  }
};
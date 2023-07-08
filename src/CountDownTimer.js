export const CountDownTimer = cdt => {
  if (window.Worker) {
    const workerID0 = new Worker(new URL("./TimeCalc.js", import.meta.url));
    workerID0.postMessage(cdt);
    workerID0.addEventListener("message", event => {
      document.getElementById("mins_secs").textContent = event.data;
      event.data === "00:00" ? workerID0.terminate() : true;
    });
  } else {
    document.getElementById("mins_secs").textContent = `Web workerが利用可能か、ご確認ください。`;
  }
};
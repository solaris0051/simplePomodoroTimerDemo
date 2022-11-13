export const CountDownTimer = (cdt) => {
  if (window.Worker) {
    const workerID0 = new Worker("./modules/TimeCalc.js", {
      type: "module",
    });
    workerID0.postMessage(cdt);
    workerID0.onmessage = function (event) {
      document.getElementById("mins_secs").textContent = event.data;
      event.data === "00:00" ? workerID0.terminate() : true;
    };
  } else {
    document.getElementById(
      "mins_secs"
    ).textContent = `Will you please make sure if worker was available?`;
  }
};
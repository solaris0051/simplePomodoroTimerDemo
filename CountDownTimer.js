export const CountDownTimer = (cdt) => {
  if (window.Worker) {
    const workerID0 = new Worker("./TimeCalc.js", {
      type: "module",
    });
    workerID0.postMessage(cdt);
    workerID0.addEventListener("message", (event) => {
      document.getElementById("mins_secs").textContent = event.data;
<<<<<<< HEAD
			event.data === "00:00" ? workerID0.terminate() : true;
=======
>>>>>>> 0b2e455d6b84c3311a9557e945fec4c42d744caf
    });
  } else {
    document.getElementById(
      "mins_secs"
    ).textContent = `Web workerが利用可能か、ご確認ください。`;
  }
};

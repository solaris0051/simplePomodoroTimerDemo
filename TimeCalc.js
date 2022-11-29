addEventListener("message", (event) => {
  let due = event.data * 60;
  let timerID0 = setInterval(() => {
    if (due >= 0) {
      const mins = `${0}${Math.floor((due % (60 * 60)) / 60)}`.slice(-2);
      const secs = `${0}${Math.floor(due % 60)}`.slice(-2);
      postMessage(mins + `:` + secs);
      due = --due;
    } else {
      clearInterval(timerID0);
    }
  }, 1000);
});

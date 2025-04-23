addEventListener("message", (event) => {
  const endTime = Date.now() + event.data * 60 * 1000;
  const timerID = setInterval(() => {
    const remainingTime = endTime - Date.now();
    if (remainingTime >= 0) {
      const mins = formatTime(Math.floor((remainingTime / 1000 / 60) % 60));
      const secs = formatTime(Math.floor((remainingTime / 1000) % 60));
      postMessage(`${mins}:${secs}`);
    } else {
      clearInterval(timerID);
    }
  }, 1000);
});

function formatTime(time) {
  return `0${time}`.slice(-2);
}
addEventListener("message", (event) => {
  const endTimestamp = Date.now() + event.data * 60 * 1000 + 2000;
  const intervalId = setInterval(() => {
    const timeLeft = endTimestamp - Date.now();
    if (timeLeft >= 0) {
      const minutes = formatTwoDigits(Math.floor((timeLeft / 1000 / 60) % 60));
      const seconds = formatTwoDigits(Math.floor((timeLeft / 1000) % 60));
      postMessage(`${minutes}:${seconds}`);
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
});

function formatTwoDigits(value) {
  return `0${value}`.slice(-2);
}
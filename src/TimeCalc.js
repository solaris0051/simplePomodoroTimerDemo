addEventListener("message", (event) => {
  const durationMinutes = event.data;
  const timerEndTimestamp = Date.now() + durationMinutes * 60 * 1000 + 2000;
  const intervalId = setInterval(() => {
    const timeLeftMs = timerEndTimestamp - Date.now();
    if (timeLeftMs >= 0) {
      const minutesLeft = formatToTwoDigits(Math.floor((timeLeftMs / 1000 / 60) % 60));
      const secondsLeft = formatToTwoDigits(Math.floor((timeLeftMs / 1000) % 60));
      postMessage(`${minutesLeft}:${secondsLeft}`);
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
});

function formatToTwoDigits(num) {
  return `0${num}`.slice(-2);
}
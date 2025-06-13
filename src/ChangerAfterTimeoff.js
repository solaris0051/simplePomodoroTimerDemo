const VIBRATION_DURATION_MS = 5000;
const RELOAD_DELAY_MS = 5000;

const vibrateAndReload = () => {
  navigator.vibrate(VIBRATION_DURATION_MS);
  setTimeout(() => {
    location.reload();
  }, RELOAD_DELAY_MS);
};

export const changeAfterTimeOff = (durationMinutes) => {
  const delayMs = durationMinutes * 60 * 1000 + 1000;
  setTimeout(vibrateAndReload, delayMs);
};
export const changeAfterTimeout = (timeoutMinutes) => {
  const vibrateAndReloadPage = () => {
    navigator.vibrate(5000);
    setTimeout(() => {
      location.reload();
    }, 5000);
  };

  setTimeout(vibrateAndReloadPage, timeoutMinutes * 60 * 1000);
};
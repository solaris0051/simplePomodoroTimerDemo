export const ChangerAfterTimeoff = (catt) => {
  const vibrateAndReload = () => {
    navigator.vibrate(5000);
    setTimeout(() => {
      location.reload();
    }, 5000);
  };

  setTimeout(vibrateAndReload, catt * 60 * 1000);
};

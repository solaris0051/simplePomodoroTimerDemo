export const ChangerAfterTimeoff = (catt) => {
  setTimeout(() => {
    navigator.vibrate(10000);
    setTimeout(() => {
      location.reload();
    }, 10000 + 5000);
  }, catt * 60 * 1000);
};

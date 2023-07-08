export const ChangerAfterTimeoff = (catt) => {
  setTimeout(() => {
    navigator.vibrate(5000);
    setTimeout(() => {
      location.reload();
    }, 5000);
  }, catt * 60 * 1000 + 1000);
};

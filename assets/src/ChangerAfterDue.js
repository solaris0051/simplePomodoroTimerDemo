export const ChangerAfterDue = (cadt, btn, id, className) => {
  setTimeout(() => {
    id.className = className;
    navigator.vibrate(5000);
    setTimeout(() => {
      btn.disabled = false;
    }, 5000);
  }, cadt * 60 * 1000 + 1000);
};

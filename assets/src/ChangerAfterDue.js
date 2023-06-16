export const ChangerAfterDue = (cadt, btn, id, className) => {
  setTimeout(() => {
    btn.disabled = false;
    id.className = className;
    navigator.vibrate(5000);
  }, cadt * 60 * 1000 + 1000);
};

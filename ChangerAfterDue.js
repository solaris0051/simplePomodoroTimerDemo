export const ChangerAfterDue = (cadt, btn, id, className) => {
  setTimeout(() => {
    btn.disabled = false;
    id.className = className;
    navigator.vibrate(10000);
		workerID0.terminate();
  }, cadt * 60 * 1000 + 1000);
};

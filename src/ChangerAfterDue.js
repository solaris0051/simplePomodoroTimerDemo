export const ChangerAfterDue = (cadt, btn, id, className) => {
  const changeClassNameAndVibrate = () => {
    id.className = className;
    navigator.vibrate(5000);
  };

  const enableButton = () => {
    btn.disabled = false;
  };

  setTimeout(() => {
    changeClassNameAndVibrate();
    setTimeout(enableButton, 5000);
  }, cadt * 60 * 1000);
};

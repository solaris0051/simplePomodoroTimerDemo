export const changeAfterTimerEnd = (durationMinutes, buttonElement, targetElement, newClassName) => {
  const applyClassAndVibrate = () => {
    targetElement.className = newClassName;
    navigator.vibrate(5000);
  };

  const enableButton = () => {
    buttonElement.disabled = false;
  };

  setTimeout(() => {
    applyClassAndVibrate();
    setTimeout(enableButton, 5000);
  }, durationMinutes * 60 * 1000 + 1000);
};
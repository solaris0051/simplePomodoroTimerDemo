export const changeElementAfterDue = (delayMinutes, targetButton, targetElement, newClassName) => {
  const applyClassNameAndVibrate = () => {
    targetElement.className = newClassName;
    navigator.vibrate(5000);
  };

  const enableTargetButton = () => {
    targetButton.disabled = false;
  };

  setTimeout(() => {
    applyClassNameAndVibrate();
    setTimeout(enableTargetButton, 5000);
  }, delayMinutes * 60 * 1000 + 1000);
};
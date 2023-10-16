export function debounceFunc(func: Function) {
  let clearValue;

  return function (...args) {
    if (clearValue) clearTimeout(clearValue);
    clearValue = setTimeout(() => {
      func.call(null, args);
    }, 2000);
  };
}

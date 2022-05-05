export function getTextSize(text, styles) {
  const span = document.createElement('span');
  span.innerText = text;
  span.style.position = 'absolute';
  span.style.opacity = '0';
  for (const name in styles) {
    console.log(name, styles[name]);
    span.style[name] = styles[name];
  }

  document.body.append(span);
  const { width } = span.getBoundingClientRect();

  return width;
}

export function $(selector) {
  return document.querySelector(selector);
}

export function debounce(fn, holdingTime) {
  let timerId = null;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), holdingTime);
  };
}

export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * 배열의 마지막 요소를 가져온다
 * @param {any[]} arr
 * @returns {any}
 */
export function last(arr) {
  return arr[arr.length - 1];
}

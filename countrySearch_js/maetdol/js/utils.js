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

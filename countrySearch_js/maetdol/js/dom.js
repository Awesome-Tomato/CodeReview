export function drawSearchResultWith(keyword) {
  return function (countries) {
    const $result = $('.result');
    countries
      .map(createResultItem)
      .map((li) => {
        const button = li.querySelector('button');
        highlightKeyword(button, keyword);
        return li;
      })
      .forEach((li) => $result.append(li));
  };
}

export function highlightKeyword(element, keyword) {
  const text = element.innerText;
  element.innerText = '';

  // 하이라이트 처리할때 대소문자 상관없이 처리 할 수 있게 하기위해
  // 소문자로 바꾼 후 검색합니다
  const lowerCaseText = text.toLowerCase();
  const lowerCaseKeyword = keyword.toLowerCase();
  let startIndex = 0;
  let nextIndexOfKeyword = () =>
    lowerCaseText.indexOf(lowerCaseKeyword, startIndex);

  while (nextIndexOfKeyword() !== -1) {
    const index = nextIndexOfKeyword();

    const token = text.slice(startIndex, index);
    const textNode = document.createTextNode(token);
    element.append(textNode);

    const mark = document.createElement('mark');
    mark.innerText = text.slice(index, index + keyword.length);
    element.append(mark);

    startIndex = index + 1;
  }

  const token = text.slice(startIndex + 1);
  const textNode = document.createTextNode(token);
  element.append(textNode);
}

export function createResultItem(country) {
  const li = document.createElement('li');
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.innerText = country;
  li.append(button);
  return li;
}

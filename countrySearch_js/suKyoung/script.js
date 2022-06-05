window.addEventListener("load", getDOMElement);

function getDOMElement() {
  const searchResult = document.querySelector(".searchResult");
  const searchInput = document.querySelector(".searchInput__text");
  searchInput.addEventListener("keyup", getKeyWord);

  return {
    searchInput, // input field
    searchResult, // result field
  };
}

function getKeyWord(e) {
  const inputValue = e.target.value;
  if (inputValue[0] === undefined) return;

  const keyWord = changeSmallLetter(inputValue);    
  getCountryNamesAndFlag(keyWord);

  const { searchInput } = getDOMElement();
  searchInput.value = changeCapitalLetter(keyWord);
}

function changeSmallLetter(string) {
  return string.toLowerCase();
}

function changeCapitalLetter(string) {
  const firstChar = string[0].toUpperCase();
  const result = string.replace(string[0], firstChar);

  return result;
}

// NOTE: codeReview 루트에서 live server를 실행해야 msw실행됨
const BASE_URL = "/api/search";
const options = { method: "GET" };
async function getCountryNamesAndFlag(keyWord) {
  const QUERY_PARAMS = `?keyword=${keyWord}`;
  
  try {
    await fetch(BASE_URL + QUERY_PARAMS, options)
      .then((res) => res.json())
      .then((res) => {
        const tempData = [...res];
        // 기존 ul요소 삭제
        const { searchResult } = getDOMElement();
        searchResult.children[0].remove(); 
        // 새로 작성한 ul요소에 받아온 data값을 넣어서 렌더링
        const newHTMLUlElement = createHTMLElementsWithHighlightKeyword(keyWord, tempData); 
        searchResult.append(newHTMLUlElement);
      });
  } catch (e) {
    console.error("Failed to get datas. Error Code : ", e);
  }
}

function createHTMLElementsWithHighlightKeyword(string, dataArray) {
  const newHTMLUlElement = document.createElement("ul");
  newHTMLUlElement.setAttribute('class', 'searchResult__ul');

  for (let i = 0; i < dataArray.length; i++) {
    const newHTMLLiElement = document.createElement("li");
    const newHTMLSpanElement = document.createElement("span");
    newHTMLSpanElement.setAttribute('class', 'highlight');
    newHTMLSpanElement.append(string);
    const highLight = newHTMLSpanElement.outerHTML; // html object -> string

    const replaceOriginToHighlight = changeSmallLetter(dataArray[i]).replace(string, highLight);
    newHTMLLiElement.innerHTML = changeCapitalLetter(replaceOriginToHighlight);
    newHTMLUlElement.append(newHTMLLiElement);

    const indexOfOriginString = changeSmallLetter(dataArray[i]).indexOf(string);
    const endOfOriginString = indexOfOriginString + string.length;
    const originString = dataArray[i].slice(indexOfOriginString, endOfOriginString);
    const highlightElement = newHTMLLiElement.querySelector('.highlight');
    highlightElement.innerText = originString;
  }

  return newHTMLUlElement;
}
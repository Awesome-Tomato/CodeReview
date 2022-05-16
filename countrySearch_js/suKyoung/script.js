window.addEventListener("load", getDOMElements);

function getDOMElements() {
  const searchInput = document.querySelector(".searchInput__text");
  searchInput.addEventListener("keyup", getKeyWord);
  const searchResult = document.querySelector(".searchResult");
  return {
    searchInput, // input field
    searchResult, // result field
  };
}

function getKeyWord(e) {
  const inputValue = e.target.value;
  if (inputValue[0] === undefined) return;

  const firstChar = inputValue[0].toUpperCase();
  const keyWord = inputValue.replace(inputValue[0], firstChar);

  const { searchInput } = getDOMElements();
  searchInput.value = keyWord;
  getCountryNamesAndFlag(keyWord);
}

const BASE_URL = "/api/search";
const options = { method: "GET" };
async function getCountryNamesAndFlag(keyWord) {
  const QUERY_PARAMS = `?keyword=${keyWord}`;
  try {
    await fetch(BASE_URL + QUERY_PARAMS, options)
      .then((res) => res.json())
      .then((res) => {
        const tempData = [...res];
        const { searchResult } = getDOMElements();
        searchResult.children[0].remove();
        const newHTMLUlElement = createHTMLElementsWithData(tempData);
        searchResult.append(newHTMLUlElement);
      });
  } catch (e) {
    console.error("Failed to get datas.", e);
  }
}

function createHTMLElementsWithData(dataArray) {
  const newHTMLUlElement = document.createElement("ul");
  for (let i = 0; i < dataArray.length; i++) {
    const newHTMLLiElement = document.createElement("li");
    newHTMLLiElement.append(dataArray[i]);
    newHTMLUlElement.append(newHTMLLiElement);
  }

  return newHTMLUlElement;
}

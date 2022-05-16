window.addEventListener("load", getDOMElement);

function getDOMElement() {
  const searchResult = document.querySelector(".searchResult");
  const searchInput = document.querySelector(".searchInput__text");
  searchInput.addEventListener("keydown", getKeyWord);

  return {
    searchInput, // input field
    searchResult, // result field
  };
}

function getKeyWord(e) {
  const inputValue = e.target.value;
  if (inputValue[0] === undefined) return;
  
  // keyword search해서 색상 바꿔주면 될거가튼데?
  console.log(inputValue);  

  const keyWord = changeCapitalLetter(inputValue);  
  const { searchInput } = getDOMElement();
  searchInput.value = keyWord;

  getCountryNamesAndFlag(keyWord);
}

function changeCapitalLetter(string) {
  const firstChar = string[0].toUpperCase();
  const result = string.replace(string[0], firstChar);

  return result;
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
        // 기존 ul요소 삭제
        const { searchResult } = getDOMElement();
        searchResult.children[0].remove(); 
        // 새로 작성한 ul요소에 받아온 data값을 넣어서 렌더링
        const newHTMLUlElement = createHTMLElementsWithData(tempData); 
        searchResult.append(newHTMLUlElement);
      });
  } catch (e) {
    console.error("Failed to get datas. Error Code : ", e);
  }
}

function createHTMLElementsWithData(dataArray) {
  const newHTMLUlElement = document.createElement("ul");
  newHTMLUlElement.setAttribute('class', 'searchResult__ul');

  for (let i = 0; i < dataArray.length; i++) {
    const newHTMLLiElement = document.createElement("li");
    newHTMLLiElement.append(dataArray[i]);
    newHTMLUlElement.append(newHTMLLiElement);
  }

  return newHTMLUlElement;
}

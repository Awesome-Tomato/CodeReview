window.addEventListener('load', init);

function init() {
  const searchInput = document.querySelector('.searchInput__text');
  searchInput.addEventListener('keyup', getKeyWord);

  // const searchResult = document.querySelector('.searchResult');
  // searchResult.children[0].remove();

  return {searchInput};
};

function getKeyWord(e) {
  const inputValue = e.target.value;
  const firstChar = inputValue[0].toUpperCase();
  const keyWord = inputValue.replace(inputValue[0], firstChar);

  const {searchInput} = init();
  searchInput.value = keyWord;

  console.log(keyWord);
};

async function getCountries(keyWord) {
  // keyWord를 토대로 국가정보를 받아옴
  const URL = `API주소${keyWord}`;
  const options = {
    request : GET,
  };
  // deleteSearchResult();
  try {
    await fetch(URL, options)
    .then(json => console.log(json))
    .then(response => {
      console.log(response.data);
    })
  } catch(e) {
    throw Error('oops error');
  }
};

function deleteSearchResult() {

};

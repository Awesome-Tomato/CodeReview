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

  getCountries(keyWord);
};

async function getCountries(keyWord) {
  const URL = `/api/search?keyword=${keyWord}`;
  const options = {
    request : 'GET',
  };
  // deleteSearchResult();
  try {
    await fetch(URL, options)
    .then(json => json.json())
    .then(res => {
      console.log(res); 
    })
  } catch(e) {
    throw Error('oops error');
  }
};

function deleteSearchResult() {

};

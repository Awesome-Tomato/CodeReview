import { searchCountry } from './api.js';
import { $, capitalize, debounce } from './utils.js';

init();

function init() {
  $('form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const debouncedSearchCountry = debounce((keyword) => {
    searchCountry(keyword).then(redrawSearchResult);
  }, 300);
  const $input = $('input');
  $input.addEventListener('input', (e) => {
    debouncedSearchCountry(e.target.value);
  });
}

function redrawSearchResult(countries) {
  const $result = $('.result');
  $result.innerHTML = '';
  countries.map(createResultItem).forEach((li) => $result.append(li));
}

function createResultItem(country) {
  const li = document.createElement('li');
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.innerText = country;
  li.append(button);
  return li;
}

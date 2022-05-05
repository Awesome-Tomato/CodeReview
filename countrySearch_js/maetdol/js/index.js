import { searchCountry } from './api.js';
import { $, capitalize, debounce } from './utils.js';

init();

function init() {
  $('form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const debouncedSearchCountry = debounce((keyword) => {
    searchCountry(keyword).then(drawSearchResult);
  }, 300);
  const $input = $('input');
  $input.addEventListener('input', (e) => {
    $('.result').innerHTML = '';
    if (!$input.value) return;

    $input.value = capitalize($input.value);
    debouncedSearchCountry($input.value);
  });
}

function drawSearchResult(countries) {
  const $result = $('.result');
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

import { searchCountry } from './api.js';
import { drawSearchResultWith } from './dom.js';
import { $, capitalize, debounce } from './utils.js';

init();

function init() {
  $('form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const debouncedSearchCountry = debounce((keyword) => {
    searchCountry(keyword).then(drawSearchResultWith(keyword));
  }, 300);

  const $result = $('.result');
  const $input = $('input');
  $input.addEventListener('input', (e) => {
    $result.innerHTML = '';
    if (!$input.value) return;

    $input.value = capitalize($input.value);
    debouncedSearchCountry($input.value);
  });
}
